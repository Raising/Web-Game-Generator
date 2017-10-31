var PYC = {Author : 'Ignacio Medina Castillo', mode:'Client',prefix:''};
PYC.Server = {};
PYC.Client = {};
PYC.classList = {};
PYC.stubList = {};

PYC.ID_COUNTER = 0;
//PYC.CREATED_OBJECTS = {};

//---------------------- PUBLIC METHODS ------------

PYC.Describe = function(className,classObject){
  if(!PYC.validateClass(className,classObject)) {return false};
  
  PYC.classList[className] = {
    publ :        PYC.createPublicPrototype(classObject),
    attributes :  PYC.createAttributesPrototype(classObject),
    builder :     PYC.createObjectBuilder(className,classObject),
    react :       classObject.react,
    DOC :         classObject
  };
};

PYC.Create = function(className,params = {}){
  if (PYC.isSettingContextObject(className)){ 
    return PYC.Create.bind(className);
  }

  let {targetClassName,dependencyTree} = PYC.proccessDependencyInjection(this,className);
  if (PYC.isStubed(targetClassName)) {
    return PYC.stubList[targetClassName](params)
  };
  
  return PYC.buildObject(targetClassName,params,dependencyTree);
};


PYC.Stub = function(className,response){
  if (typeof response === "function"){
    PYC.stubList[className] = response;
  }else{
    PYC.stubList[className] = () => response;
  }
};

PYC.UnStub = function(className,response){
  delete PYC.stubList[className];
};

PYC.Test = function(className){
  require(PYC.getClassFilePath(className)+"TEST_"+PYC.prefix+className);
};

PYC.React = function(className){
  return PYC.classList[className].react;
};

PYC.CreateDomNode = function(htmlEnTexto){
  var elemento = document.createElement("div");
  elemento.innerHTML = htmlEnTexto;
  return elemento.childNodes[0];
};

PYC.runGenerator = function(generator) {
    var iterator = generator(), currentNode;
        // asynchronously iterate over generator
        (function iterate(val){
            currentNode = iterator.next( val );

            if (!currentNode.done) {
                // poor man's "is it a promise?" test
                if (typeof currentNode.value === "Object" && "then" in currentNode.value) {
                    // wait on the promise
                    currentNode.value.then( iterate );
                }
                // immediate value: just send right back in
                else {
                    // avoid synchronous recursion
                    setTimeout( function(){
                        iterate( currentNode.value );
                    }, 0 );
                }
            }
        })();
    };


//------------------------- PRIVATE METHODS--------------------


PYC.proccessDependencyInjection = function(context, className){
  let dependencyTree = {}, injectedClassName = "";
  if (context.dependencyTree !== undefined && context.dependencyTree[className] !== undefined){
    dependencyTree = context.dependencyTree[className];
    if (context.dependencyTree[className].injectedClass !== undefined){
      injectedClassName = context.dependencyTree[className].injectedClass;
    }
  }
  return {
    targetClassName: injectedClassName === "" ? className : injectedClassName,
    dependencyTree: dependencyTree 
  };
}

PYC.createPublicPrototype = function(classObject){
  let publ = {};

  if (classObject.Extends !== undefined){
    publ = Object.create(PYC.classList[classObject.Extends].publ); 
    Object.defineProperty(publ, 'PARENT', {
      value:PYC.classList[classObject.Extends].publ    
    });
  }else if (classObject.PrototipeSingleton !== undefined){ //ha de ser un objeto ya creado al describir la clase
    publ = Object.create(classObject.PrototipeSingleton); 
  }

  classObject.publ(publ);

  return publ;
};

PYC.createAttributesPrototype = function(classObject){
  let attributes = {};
  if (classObject.Extends !== undefined){
    for (let attr in PYC.classList[classObject.Extends].attributes){
      attributes[attr] = PYC.classList[classObject.Extends].attributes[attr];
    }
  }
  for (let attr in classObject.attributes){
      attributes[attr] = classObject.attributes[attr];
  }
  return attributes;
};

PYC.createObjectBuilder = (className,classObject) => (params,forcedPrivate) => {
  let newObject = PYC.instantiateLinkedObject(className,forcedPrivate);
  PYC.injectAttributes(newObject,className);

  if (classObject.Extends !== undefined){
    PYC.classList[classObject.Extends].builder(params,newObject);
  }
  classObject.builder(newObject,params);

  return newObject;
};

PYC.instantiateLinkedObject = (className,forcedPrivate) => {
  let newObject;
  if (forcedPrivate === undefined){
    newObject = Object.create(PYC.classList[className].publ);
    newObject.objectType = className;
  }else{
    newObject = forcedPrivate;
  }
  return newObject;
}

PYC.injectAttributes = (newObject,className) => {
  if (newObject._attributes === undefined){
    newObject._attributes = {};
  }
  for (let attr in PYC.classList[className].attributes){
    if (newObject._attributes[attr] === undefined ){
      PYC.injectGeterSeterAttribute(newObject,attr,PYC.classList[className].attributes[attr]);
    }
  }
}

PYC.buildObject = function(className,params,dependencyTree){
  PYC.loadClass(className);

  let newObject = {};
  if (PYC.classList[className] === undefined){
    console.error("The class " + className + " is not defined");
  }
  else{
    try{ 
      newObject = PYC.classList[className].builder(params);

      if (newObject.init){
        newObject.init();
      }  
      newObject.dependencyTree = dependencyTree;
    }catch(error) {
      console.error("Error when creating class '" + className + "'");
      console.error( error.message);
    }
  }
  // PYC.CREATED_OBJECTS[newObject.$Id()+newObject.objectType] = newObject;
  return newObject;
};

PYC.injectGeterSeterAttribute = (newObject,attributeName,attributeValue) => {
  // Prevent static like properties
  if (typeof attributeValue == "object" ){
    if (attributeValue.length !== undefined) {attributeValue = [];}
    else {attributeValue = {};}
  }

  newObject._attributes[attributeName] =
  { currentValue: attributeValue,
    lastValue: attributeValue,
    nextValue: null,
    lastChangeTime : 0
  };

  Object.defineProperty(newObject, attributeName, {
    get: function(){ return this._attributes[attributeName].currentValue},
    set: function(value){ 
      this._attributes[attributeName].nextValue = value;
      this.$fireEvent("beforeChange:" + attributeName, {newValue:value});
      this._attributes[attributeName].lastChangeTime = Date.now();
      this._attributes[attributeName].lastValue = this._attributes[attributeName].currentValue;
      this._attributes[attributeName].currentValue = value;
      this._attributes[attributeName].nextValue = null;
      this.$fireEvent("afterChange:" + attributeName,{newValue:value});
     // console.log("El atributo '" + attributeName + "' ha sido modificado a: ", value);
      } // TODO cuando modificamos se lanzan triggers y se propagan los cambios
  });
}

PYC.isSettingContextObject = function(className){
  return typeof className !== "string";
}

PYC.validateClass = function (className,classObject){
  if (typeof PYC.classList[className] !== 'undefined'){
    console.error('you are trying to describe twice the same class: ' + className);
    return false;
  }
  if (classObject.Extends !== undefined){
    PYC[PYC.mode].require(classObject.Extends);
  }
  return true;
};

PYC.loadClass = function(className){
  PYC[PYC.mode].require(className);
};

PYC.Server.require = function(className){

  if (PYC.classList[className] === undefined){
    try{
      require(PYC.getClassFilePath(className)+PYC.prefix+className);
    }catch(e){
      console.error('no se ha podido cargar la clase "'+className+'"  =>', e);
    }
  }
};




PYC.Client.require = function(className){
  if (PYC.classList[className] === undefined){
      console.error('Ya debería estar cargada la dependencia "'+className+'" ');
  }
};



PYC.getClassFilePath = function(className){
  var splitString = className.split('.');
  var classFilePath = '';
  for (var i = 0; i< splitString.length-1 ; i++) {
     classFilePath += PYC.prefix+splitString[i] +'/';
  } 
  return __dirname+'/../PYC/'+classFilePath;
};



PYC.isStubed = function(className){
  return PYC.stubList[className] !==  undefined;
}



/*
PYC.InjectIdentifiers = function(priv,className){
  priv.objectId = priv.$Id() + '_' + className ;
  priv.objectType = className;
};

PYC.InjectGenericMethods = function(priv){
    priv.publ.getId = function(){
      return priv.objectId;
    };
    priv.publ.getObjectType = function(){
      return priv.objectType;
    };
    
    if (priv.controller !== undefined){
      priv.publ.getController = function(){
        return priv.controller;
      };
    }
};*/
//---------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------
/*PYC.Describe = function(className,classObject){
  if (typeof PYC.classList[className] !== 'undefined'){
    console.error('you are trying to describe two time the same class');
    return false;
  }

  PYC.classList[className] = function(params){
    params = params ? params : {};
    var me = this;
    // variable privadas generales
    this.objectId = this.$Id() + '_' + className ;
    this.objectType = className;
      //

    this.publ  = classObject.publ(this,params); 
      //metodos generales
    this.publ.getId = function(){
      return me.objectId;
    };
    
    this.publ.getObjectType = function(){
      return me.objectType;
    };
      //
    classObject.privateInit(this,params);

    return this.publ;
  };
};

PYC.Create = function(intefaceClass,params,className){
  var interfaceInstance,
      classType,
      newObject;
  try{
    interfaceInstance = PYC.classList.interface[intefaceClass]();
     classType = interfaceInstance.classType;
  }catch (error){
    console.error('interface Class: "' + intefaceClass + '" not implemented');
  }
    
  if (className === undefined){
     className = interfaceInstance.defaultClass;
  }
  if (PYC.classList[classType][className] === undefined){
    console.error('the class '+classType+'->'+className+' has been invoqued but is not described');
  }

  newObject = new PYC.classList[classType][className](params);
  if (newObject.init){
    newObject.init();
  }
 

  PYC.CREATED_OBJECTS[newObject.getId()] = newObject;
  return newObject;
};

PYC.hasAllRequiredMethods = function(className,classObject,classType){
  var proxyPubl = {},
      inheritedMethods,
      method; 
  
  if (classObject.publ !== undefined){
     classObject.publ(proxyPubl,{},{});
  }
  else{
    if (classObject.Implements !== undefined){
      return false;
    }else{
      return true;
    }
  }
    
  if (classObject.Extends !== undefined){
    PYC.classList[classType][classObject.Extends].DOC.publ(proxyPubl,{},{});
  }
  
  if (classObject.Implements !== undefined){
      classObject.Implements.forEach(function(extendedClass){
        var method,
            extendedObject = PYC.classList.interface[extendedClass]();
        
        for (method in extendedObject){
          if (extendedObject.hasOwnProperty(method) && typeof extendedObject[method] === 'function'){
            if (proxyPubl[method] === undefined){
              console.error('class "'+className+'" is missing the implementation of method "'+method+'" from interface "'+extendedClass+'"'); 
              
              return false;
            }
          }
        }
      });
    }
    
    return true;
};  


PYC.Describe.Interface = function(className,classObject){
  var classType = 'Interface';
  
  if(!PYC.validateClass(className,classObject,classType))return false;
  
  PYC.classList[classType][className] = function(){
    return classObject;
  };
  
  PYC.classList[classType][className].DOC = classObject;
};


PYC.Describe.Controller = function(className,classObject){
  var classType = 'Controller';
  
  if(!PYC.validateClass(className,classObject,classType))return false;

  PYC.classList[classType][className] = function(params,forcedPrivate){
    params = params ? params : {};
    var priv = forcedPrivate ? forcedPrivate : {};
    
    PYC.createPublic(priv,className,classObject,params,classType);
  
    PYC.InjectGenericMethods(priv);
    PYC.InjectView(priv,classObject.view,params);
    
    classObject.builder(priv,params);

    return priv.publ;
  };
  
  PYC.classList[classType][className].DOC = classObject;
};


PYC.Describe.View = function(className,classObject){
  var classType = 'View';
  
  if(!PYC.validateClass(className,classObject,classType))return false;
  
  PYC.classList[classType][className] = function(params,forcedPrivate){
    params = params ? params : {};
    var priv =  forcedPrivate ? forcedPrivate : {};
    // variable privadas generales
    PYC.createPublic(priv,className,classObject,params,classType);

    priv.controller  = params.controller; 
      //metodos generales
    PYC.InjectGenericMethods(priv);
    
    PYC.InjectMainDomElement(priv,classObject);
  
      //
    classObject.builder(priv,params);

    return priv.publ;
  };
  
  PYC.classList[classType][className].DOC = classObject;
};

PYC.Describe.Model = function(className,classObject){
   var classType = 'Model';
  
  if(!PYC.validateClass(className,classObject,classType))return false;
   
   PYC.classList[classType][className] = function(params,forcedPrivate){
    params = params ? params : {};
    var priv = forcedPrivate ? forcedPrivate : {};
    // variable privadas generales
    PYC.createPublic(priv,className,classObject,params,classType);
      //metodos generales 
    PYC.InjectGenericMethods(priv);
      //
    classObject.builder(priv,params);

    return priv.publ;
  };
  
  PYC.classList[classType][className].DOC = classObject;
};

PYC.Describe.Template = function(className,classObject){  
   PYC.TemplateList[className] = function(params){
    params = params ? params : {};
    var templateString = classObject.builder(params);

    return $(templateString);
  };
};

PYC.Create.Template = function(className,params){  
    return PYC.TemplateList[className](params);
};

PYC.Describe.Svg = function(className,classObject){  
   PYC.svgList[className] = function(params){
    params = params ? params : {};
    var svgObject = classObject.builder(params);

    return svgObject;
  };
};

PYC.Create.Svg = function(className,params){  
    return PYC.svgList[className](params);
};

PYC.Create.Controller = function(className,params){
  PYC.Require('Controller',className);
  var newObject = new PYC.classList.Controller[className](params);

    if (newObject.init){
      newObject.init();
    }
    
    PYC.CREATED_OBJECTS[newObject.getId()] = newObject;
    return newObject;
};

PYC.Create.View = function(className,params){
  PYC.Require('View',className);
  var newObject = new PYC.classList.View[className](params);

    if (newObject.init){
      newObject.init();
    }
    
    PYC.CREATED_OBJECTS[newObject.getId()] = newObject;
    return newObject;
};

PYC.Create.Model = function(className,params){
  PYC.Require('Model',className);
  var newObject = new PYC.classList.Model[className](params);

    if (newObject.init){
      newObject.init();
    }
    
    PYC.CREATED_OBJECTS[newObject.getId()] = newObject;
    return newObject;
};




PYC.InjectIdentifiers = function(priv,className){
  priv.objectId = priv.$Id() + '_' + className ;
  priv.objectType = className;
};

PYC.InjectGenericMethods = function(priv){
    priv.publ.getId = function(){
      return priv.objectId;
    };
    priv.publ.getObjectType = function(){
      return priv.objectType;
    };
    
    if (priv.controller !== undefined){
      priv.publ.getController = function(){
        return priv.controller;
      };
    }
};



PYC.InjectView = function(priv,view,params){
  if (view){
    params.controller = priv.publ;
    priv.view = PYC.Create.View(view.name,params);
  }
};

PYC.InjectMainDomElement = function(priv,params){
  if (params.mainDomElement !== undefined){
      priv.mainDomElement = PYC.buildDomElement(priv.publ,params.mainDomElement.template);
    
      priv.publ.getDomElement = function(){
          return priv.mainDomElement;
      };
      
      priv.publ.renderTo = function(element){
          element.append(priv.mainDomElement);
      };
      
      priv.publ.cleanDomElement = function(){
          priv.mainDomElement.empty();
      };
    } 
};




PYC.hasOnlyFunctions = function(className,classObject){
    var method;
    
    for (method in classObject){
      if (classObject.hasOwnProperty(method) && typeof extendedObject[method] !== 'function'){
          console.error('Interface "'+className+'" have a non function member -> "'+method+'"'); 
          
          return false;
      }
    }
    return true;
};

*/
PYC.publishDocumentation = function(){
  var classTypeCollection,
      className,
      classDoc,
      privateElements = [],
      publicElements = [],
      index;
  

    classTypeCollection = PYC.classList;
    for (className in classTypeCollection){
      classDoc = classTypeCollection[className].DOC;
      PYC.getClassDocumentation(className);
      console.log('%c' +className + '   ', 'color:green;');
      
      if (classDoc.attributes){
        console.log('\tprivate','\n\t\t'+Object.keys(classDoc.attributes).join('\n\t\t'));
      }
      if (classDoc.publ){
         publicElements = classDoc.publ.toString().match(/publ\.[a-zA-Z0-9]*\s*[=|:]/g);
        
        if (publicElements && publicElements.length > 0){
          for (index in publicElements){
            publicElements[index] = publicElements[index].split(' ')[0].split('.')[1];
          }
          
          console.log('\tpublic'+'\n\t\t'+publicElements.join('\n\t\t'));
        }
      }
      if (classDoc.view){
        console.log('\tview'+'\n\t\t'+classDoc.view.name);
        
      }
      if(classDoc.mainDomElement){
        console.log('\tDomElement'+'\n\t\t'+classDoc.mainDomElement.template);
      }
     
      console.log('------------------------------------------------------------');
    }
  
};

PYC.getClassDocumentation = function(className){
  var index,
      classDoc,
      refinedDoc = {};
  
    classDoc = PYC.classList[className].DOC;
      
      console.log('%c' +className + '  ', 'color:green;');
      
      if (classDoc.builder){
        refinedDoc.privateElements = classDoc.builder.toString().match(/priv\.[a-zA-Z0-9]*\s*[=|:]/g);
        
        if (refinedDoc.privateElements && refinedDoc.privateElements.length > 0){
          for (index in refinedDoc.privateElements){
            refinedDoc.privateElements[index] = refinedDoc.privateElements[index].split(' ')[0].split('.')[1];
          }
        }
      }
      if (classDoc.publ){
         refinedDoc.publicElements = classDoc.publ.toString().match(/publ\.[a-zA-Z0-9]*\s*[=|:]/g);
        
        if (refinedDoc.publicElements && refinedDoc.publicElements.length > 0){
          for (index in refinedDoc.publicElements){
            refinedDoc.publicElements[index] = refinedDoc.publicElements[index].split(' ')[0].split('.')[1];
          }
        }
      }
      if (classDoc.view){
        refinedDoc.view = classDoc.view.name;
        
      }
      if(classDoc.mainDomElement){
        refinedDoc.mainDomElement = classDoc.mainDomElement.template;
      }
     
     console.log(refinedDoc);
  return refinedDoc;
};

export default PYC;