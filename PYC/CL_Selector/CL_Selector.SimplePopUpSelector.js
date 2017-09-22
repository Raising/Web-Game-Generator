PYC.Describe('Selector.SimplePopUpSelector',{
  Extends:'Selector',
  builder: function(obj,params){   
  	obj.view = PYC.Create('Selector.SimplePopUpSelectorView',{});
  },
  publ: function(obj,params){    
     obj.getPromisedResult = function(){
      var obj = this;
      obj.view.readyInput(obj.options);
      return new Promise((resolve,reject)=>{
        obj.resolve = resolve;
        obj.reject  = reject;
      });
    };

    obj.validate = function(result){
      var obj = this;
      try{
        if (obj.options.indexOf(result) >= 0){
          return true;
        }
      }catch (error){
        return false;
      }
      return false;
    };

   
  }
});


PYC.Describe('Selector.SimplePopUpSelectorView',{
  builder: function(obj,params){   
  	 obj.options = [];
  },
  publ: function(obj,params){    
    
   	obj.readyInput = function(options){
      var obj = this;
     
      for (optionIndex in options){
      	var option = options[optionIndex];
      	obj.options.push({key:option,title:option});
      }
      MainView.addInput('SimpleSelection',{
        options:obj.options
      });

    }
  }
});


