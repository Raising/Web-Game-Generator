"use strict";
PYC.Describe("BaseNode",{
  attributes:{
    "owner": {},
  },
  builder: function(me,params){
    Object.assign(me,params);
  },
  publ: function(me,params){
    me.resolveNode = async function(nodeInfo,inputParams){
      var me = this;
      let nodeDescription;
      if (nodeInfo.id !== undefined){
        nodeDescription = me.game.nodes[nodeInfo.nodeType][nodeInfo.id];  
      }
      else{
        nodeDescription = nodeInfo; 
      } 
      //TODO debe gestionar las estructuras de control en si mismo en caso dqe nodo de flujo
      return await PYC.Create(me)(nodeInfo.nodeType + "Node",Object.assign({game:me.game,callerInfo:nodeInfo},nodeDescription)).execute(inputParams);
    };

    me.calculateValue = async function(valueDescriptor,inputParams){
      var me = this;
      var newValue;
      if (valueDescriptor.baseValue !== undefined){
        newValue = await me.resolveOperand(valueDescriptor.baseValue,inputParams);
        for (var operationIndex in valueDescriptor.operations){
          let operationDescriptor =  valueDescriptor.operations[operationIndex];
          
          newValue = await me.resolveOperation({
            operator: operationDescriptor.operator,
            operands: [newValue, ...operationDescriptor.operands]
          },inputParams);
        }
      }
      else{
        newValue = await me.resolveOperand(valueDescriptor,inputParams);
      }
      return newValue;
    };



    me.resolveOperation = async function ({operator = "",operands = []},inputParams){
      var me = this;

      return await me.operation[operator].call(me,operands,inputParams);
    };

    me.resolveCondition = async function ({operator = "",operands = []},inputParams){
      var me = this;

      return await me.condition[operator].call(me,operands,inputParams);
    };

    me.resolveOperand = async function (operand,inputParams){
      var me = this;
      if ( typeof operand === "object"){
        if (me.operand[operand.type] === undefined  ){
            console.log(operand,me);
        }

        return await me.operand[operand.type].call(me,operand,inputParams);
      }else{
        return operand;
      }
    };

  	
    me.addParamsToObjectWithNames = function(params,paramsNames = [], paramsArray = []){
      var me = this;

      for (let i = 0; i < paramsNames.length; i++){
        let paramName = paramsNames[i];
        if (paramsArray[i] !== undefined){
          params[paramName] = paramsArray[i];
        }
        else{
          console.error("A required parameter '" + paramName + "' in position '" + i + "' has not been served for node ", me);
        }  
      }
      return params;
    };

    me.getParamsArrayFromNamedObject = function(params,paramsNames = []){
      var me = this;
      var paramsArray = [];

      for (let i = 0; i < paramsNames.length; i++){
        let paramName = paramsNames[i];
        if (params[paramName] !== undefined){
          paramsArray.push(params[paramName]);
        }
        else{
          console.error("A required parameter '" + paramName + "' is not in the params object ", params);
        } 
      }
      return paramsArray;
    };

    me.condition = {
      "==":    async function (operands,inputParams) {
        var me = this; 
        let firstOperand = await me.resolveOperand(operands[0],inputParams);
        let secondOperand = await me.resolveOperand(operands[1],inputParams);
        return firstOperand == secondOperand; // jshint ignore:line
      },
      "<":     async function (operands,inputParams) {
        var me = this; 
        let firstOperand = await me.resolveOperand(operands[0],inputParams);
        let secondOperand = await me.resolveOperand(operands[1],inputParams);
        return firstOperand < secondOperand;
      },
      "<=":    async function (operands,inputParams) {
        var me = this; 
        let firstOperand = await me.resolveOperand(operands[0],inputParams);
        let secondOperand = await me.resolveOperand(operands[1],inputParams);
        return firstOperand <= secondOperand;
      },
      ">":     async function (operands,inputParams) {
        var me = this; 
        let firstOperand = await me.resolveOperand(operands[0],inputParams);
        let secondOperand = await me.resolveOperand(operands[1],inputParams);
        return firstOperand > secondOperand;
      },
      ">=":    async function (operands,inputParams) {
        var me = this; 
        let firstOperand = await me.resolveOperand(operands[0],inputParams);
        let secondOperand = await me.resolveOperand(operands[1],inputParams);
        return firstOperand >= secondOperand;
      },
    };

    me.operation = {
      "+":    async function (operands,inputParams) {
        var me = this;
        let firstOperand = await me.resolveOperand(operands[0],inputParams);
        let secondOperand = await me.resolveOperand(operands[1],inputParams); 
        return firstOperand + secondOperand;
      },
      "-":    async function (operands,inputParams) {
        var me = this;
        let firstOperand = await me.resolveOperand(operands[0],inputParams);
        let secondOperand = await me.resolveOperand(operands[1],inputParams); 
        return firstOperand - secondOperand;
      },
      "/":    async function (operands,inputParams) {
        var me = this;
        let firstOperand = await me.resolveOperand(operands[0],inputParams);
        let secondOperand = await me.resolveOperand(operands[1],inputParams); 
        return firstOperand / secondOperand;
      },
      "*":    async function (operands,inputParams) {
        var me = this;
        let firstOperand = await me.resolveOperand(operands[0],inputParams);
        let secondOperand = await me.resolveOperand(operands[1],inputParams); 
        return firstOperand * secondOperand;
      },
      "pow":  async function (operands,inputParams) {
        var me = this;
        let firstOperand = await me.resolveOperand(operands[0],inputParams);
        let secondOperand = await me.resolveOperand(operands[1],inputParams); 
        return Math.pow(firstOperand,secondOperand);
      },
    };


   
    me.operand = { 
      entityProperty: async function ({entity = "", attribute = ""}) { 
        var me = this; 
        return me.game.getEntityByName(entity)[attribute]; 
      },
      entityByName: async function ({name = ""}) {
       var me = this; 
       return me.game.getEntityByName(name); 
      },
      param: async function ({name = "", attribute = ""},params) {
        var me = this;
        let attributeChain = attribute !== "" ? attribute.split(".") : [];
        var currentValue = params[name];
        for (var indexAttr in attributeChain){
          currentValue = currentValue[attributeChain[indexAttr]];
        }
        return currentValue;
      },
      
      list: async function({list = ""},params){
        var me = this;
        let result = [];
        for (var index in list){
          result.push(await me.resolveOperand(list[index],params));  // jshint ignore:line
        }
        return result;
      },

      game: async function({attribute = ""},params) {
        var me = this;
        return await me.resolveOperand({type:"param", name : "game", attribute : attribute},{game:me.game});
      },

      reduce: async function({group = "", comparator = ""},params){
        var me = this;
        var groupOfEntities = await me.calculateValue(group,params);

        var result = await groupOfEntities.reduce( me.selectOne(comparator));
        console.log(result.name);
        return result;
      },

      
    };

    me.selectOne = function (comparator) {
        var me = this;
        return async function (entityA, entityB){
          let comparation =  await me.resolveCondition(comparator,{current:entityA,candidate:entityB} ) ; 
          if (comparation){
            return entityA;
          }else{
            return entityB;
          }
        }; 
    }; 
    
  }
});
