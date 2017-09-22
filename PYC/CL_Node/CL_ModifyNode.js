PYC.Describe('ModifyNode',{
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

      console.log(me.description);

      /*
      TODO when adding a non setted property add it in the getter setter way so it raises events.
      */
      let entity = await me.calculateValue(me.entity,params);
      let attibuteName = await me.calculateValue(me.attribute,params);
      entity[attibuteName] = await me.calculateValue(me.newValue,params);

      return [entity[me.attribute]];
    };

  }
});
