PYC.Describe('FlowNode',{
  Extends:'Node',
  attributes:{
  },
  builder: function(me,params){   
  },
  publ: function(me,params){
  	me.execute = async function(inputParams){
      var me = this;  
      if (me.callerInfo !== undefined && me.callerInfo.control !== undefined){
      	me.control = me.callerInfo.control;
      	return me.controlStructure[me.control.type].call(me,inputParams);
      }else{
      	return me.singleExecution(inputParams);
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

      return me.getParamsArrayFromNamedObject(params,me.outputNames);
    }

    me.controlStructure = {
      while : async function (  inputParams){
        var me = this;
        params = [];
        let infiniteLoopLock = 0;
        while (await me.resolveCondition(me.control.condition,inputParams) || infiniteLoopLock > 1000){
          params.push( await me.singleExecution(inputParams));
          infiniteLoopLock++;
        }
        if (infiniteLoopLock > 1000) console.error("infinite loop prevented");
        return params;
      },

      simultaneous : async function ( inputParams){
        var me = this;
        results = [];
        let elements = await me.calculateValue(me.control.nodeSpecificInfo,params); 
        let simultaneousOperations = [];

        console.group("simultaneous flows per element");
        for (var elementIndex in elements){
          simultaneousOperations.push( me.singleExecution([elements[elementIndex],...inputParams]));
        }
        let result = await Promise.all(simultaneousOperations);      
        console.groupEnd();  
        return result;
      },

      consecutive : async function (inputParams){
      	var me = this;
        results = [];
        let elements = await me.calculateValue(me.control.nodeSpecificInfo,params); 
        let result = [];
        
        if (me.control.initiative !== undefined){
        	// set a value for every element , then sort.
        }

        console.group("consecutive flows per element");
        
        for (var elementIndex in elements){
          result.push( await me.singleExecution([elements[elementIndex],...inputParams]));
        }
        console.groupEnd();  
        return result;
      },

      
    };

  }
});
