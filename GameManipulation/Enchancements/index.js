Object.$ID_COUNTER = 0;
Object.defineProperty(Object.prototype, '$Id',{
  value :function(){
    if (this['[[ID]]'] === undefined){
      Object.$ID_COUNTER ++;
      var str = "" + Object.$ID_COUNTER;
      var pad = "0000000000";
   
      Object.defineProperty(this, '[[ID]]',{
      value : pad.substring(0, pad.length - str.length) + str
      });
    }
    return this['[[ID]]'];
  }
});

Object.defineProperty(Object.prototype, 'getProperty',{
    value :function(propertyName,separator){
      let inmutableProperty;
        if (separator === undefined){
            return inmutableProperty = this[propertyName];
        }
        else {
            let splitedProperty = propertyName.split(separator); 
            if (splitedProperty.length === 1){
                return inmutableProperty = this[propertyName];
            }
            let property = this;
            for (let subName of splitedProperty){
                if (property !== undefined){
                    property = property[subName];
                }
            }
            return inmutableProperty = property;
        }
      if (typeof inmutableProperty === "object"){
        if (inmutableProperty.hasOwnProperty("length")){
          inmutableProperty = [...inmutableProperty];
        }else{
          inmutableProperty = Object.assign({},inmutableProperty);
        }
      }
      return inmutableProperty;
    }
});

Object.defineProperty(Object.prototype, 'getPropertyDot',{
    value : function(propertyName){
        return this.getProperty(propertyName,".");
    }
});

Object.defineProperty(Object.prototype, 'setProperty',{
    value : function(propertyName,value,separator){
      let newThis =  Object.assign(Object.create(this.__proto__),this);
      if (typeof value === "object"){
        if (value.hasOwnProperty("length")){
          value = [...value];
        }else{
          value = Object.assign({},value);
        }
      }
      if (separator === undefined){
          newThis[propertyName] = value;
      }
      else {
        let splitedProperty = propertyName.split(separator); 
        
        if (splitedProperty.length === 1){
          newThis[propertyName] = value;
        }else{
          let property = newThis;
          let tailPropertyValue = splitedProperty.pop();
          for (let subName of splitedProperty){
            if (typeof property[subName] === "object"){
              if (property[subName] !== undefined &&  property[subName].hasOwnProperty("length")){
                property[subName] = [...property[subName]];
              }else{
                property[subName] = Object.assign({},property[subName]);
              }
            }else{
              property[subName] = {};
            }
            property = property[subName];
          }
          property[tailPropertyValue] = value;
        }
      }
      return newThis;
    }
});

Object.defineProperty(Object.prototype, 'setPropertyDot',{
    value : function(propertyName,value){
      return  this.setProperty(propertyName,value,".");
    }
});