PYC.Describe('PrimitiveNode',{
  Extends:'Node',
  attributes:{
  },
  builder: function(me,params){   
  },
  publ: function(me,params){
  	me.execute = async function(inputParams){
      var me = this;   
      var params = {};
      me.addParamsToObjectWithNames(params,me.inputNames,inputParams);
      let primitive =  await me.calculateValue(me.value,params);

      return [primitive];
    };

  }
});
