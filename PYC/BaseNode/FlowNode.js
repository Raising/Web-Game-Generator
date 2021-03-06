"use strict";
PYC.Describe("FlowNode",{
  Extends:"BaseNode",
  attributes:{
  },
  builder: function(me,params){   
  },
  publ: function(me,params){
  	me.execute = async function(inputParams){
      var me = this;  
      if (me.callerInfo !== undefined && me.callerInfo.control !== undefined){
      	me.control = me.callerInfo.control;
      	return await me.controlStructure[me.control.type].call(me,inputParams);
      }else{
      	return await me.singleExecution(inputParams);
      }
    };

    me.singleExecution = async function(inputParams){
      var me = this;
      var params = {};

      me.addParamsToObjectWithNames(params,me.inputNames,inputParams);
   
      console.group(me.description);
      for (let nodeIndex in me.nodes){
        let childNode = me.nodes[nodeIndex];
        let nodeResult = await me.resolveNode(childNode,me.getParamsArrayFromNamedObject(params,childNode.inputNames));
        me.addParamsToObjectWithNames(params, childNode.outputNames, nodeResult);
      }
      console.groupEnd();

      return await me.getParamsArrayFromNamedObject(params,me.outputNames);
    };

    me.controlStructure = {
      while : async function (  inputParams){
        var me = this;
        params = [];
        let infiniteLoopLock = 0;
        while (await me.resolveOperation(me.control.condition,inputParams) || infiniteLoopLock > 1000){ // jshint ignore:line
          let nodeExecution = await me.singleExecution(inputParams);
          params.push( nodeExecution); 
          infiniteLoopLock++;
        }
        if (infiniteLoopLock > 1000) console.error("infinite loop prevented");
        return params;
      },

      simultaneous : async function ( inputParams){
        var me = this;
        let result;
        let elements = await me.calculateValue(me.control.nodeSpecificInfo,params); 
        let simultaneousOperations = [];

        console.group("simultaneous flows per element");
        for (var elementIndex in elements){
          simultaneousOperations.push( me.singleExecution([elements[elementIndex],...inputParams]));
        }
        result = await Promise.all(simultaneousOperations);      
        console.groupEnd();  
        return result;
      },

      consecutive : async function (inputParams){
      	var me = this;
        let elements = await me.calculateValue(me.control.nodeSpecificInfo,params); 
        let result = [];
        
        if (me.control.initiative !== undefined){
        	// set a value for every element , then sort.
        }

        console.group("consecutive flows per element");
        
        for (var elementIndex in elements){
          let nodeExecution = await me.singleExecution([elements[elementIndex],...inputParams]);
          result.push(nodeExecution );
        }
        console.groupEnd();  
        return result;
      },

      
    };

  }
});
