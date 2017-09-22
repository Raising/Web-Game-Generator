"use strict";
PYC.Describe('CreateNode',{
  Extends:'Node',
  attributes:{
  },
  builder: function(me,params){   
  },
  publ: function(me,params){
  	me.execute = async function(inputParams){
      var me = this;
      var params = {};
      var newEntityDescription = {};
      console.log(me.description);
      me.addParamsToObjectWithNames(params,me.inputNames,inputParams);

      for (var attrName in me.attributes){
        newEntityDescription[attrName] = await me.calculateValue(me.attributes[attrName],params);
      }

      var entity = await me.game.createEntity(newEntityDescription,params);

      // if (me.children !== undefined && me.children.length > 0){
      //   let childrenPramsArray = [...inputParams,entity];
      //   for (var childrenIndex in me.children){
      //     let childrenDescription = me.children[childrenIndex];
      //     let chidren = await me.runCreate(childrenDescription,childrenPramsArray);
      //   }
      // }

      return [entity];
    };

  }
});
