"use strict";
PYC.Describe('SelectorNode',{
  Extends:'Node',
  attributes:{
  },
  builder: function(me,params){   
  },
  publ: function(me,params){
  	me.execute = async function(inputParams){
      var me = this;   
      var params = {};
      let fullEntitiesList = [];

      me.addParamsToObjectWithNames(params,me.inputNames,inputParams);
      let entityWhomSelect = await me.calculateValue(me.whoSelect,params);

      for (var optionsIndex in me.options){
        let optionsSpecification = me.options[optionsIndex];
        let entitiesList = await me.calculateValue(optionsSpecification.scope,params);
        let posibleEntities = await me.reduceEntitiesByRestrictions(entitiesList,optionsSpecification.restrictions,params);
        fullEntitiesList = fullEntitiesList.concat(posibleEntities);
      }
      let selection = await entityWhomSelect.select(fullEntitiesList);
      return [selection];
      
    };

    me.reduceEntitiesByRestrictions = async function(entitiesList,restrictions,inputParams){
        var me = this;
        //TODO restrictions
        return entitiesList;
    };
  }
});
