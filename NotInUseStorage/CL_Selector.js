"use strict";
PYC.Describe('Selector',{
  builder: function(obj,params){   
    obj.resolve  = null;
    obj.reject  = null;
    obj.end  =  false;
    obj.options = params.options;
  },
  publ: function(obj,params){    
    obj.process = function(result){
      var obj = this;
      console.log('resolveSelector:'+result);
      if (obj.validate(result)){   
        obj.end = true;
        obj.resolve(result);
        return true;
      }else{
        return false;
      }
    };
    obj.done = function(){
      var obj = this;
      return obj.end;
    };
    obj.validate = function(result){
      var obj = this;
      return true; // Para el selector generico todo vale
    };
    obj.getPromisedResult = function(){
      var obj = this;
      return await new Promise((resolve,reject)=>{
        obj.resolve = resolve;
        obj.reject  = reject;
      });
    };

    obj.getToken = function(){
      var obj = this;
      obj.token = obj.$Id();
      return obj.token;
    };
  }
});
