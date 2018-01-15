/*
 * web_game_generator 2.0.0
 * Platform to play and create tabletoplike games
 *
 * 
 *
 * Copyright 2018, Ignacio Medina Castillo 
 *
 * Released on: January 12, 2018
*/
import PYC from '..\\..\\module\\PrototypeClass';
import React, { Component } from "react";
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
        nodeDescription = me.game.nodes[nodeInfo.id];  
      }
      else{
        nodeDescription = nodeInfo; 
      } 
      //TODO debe gestionar las estructuras de control en si mismo en caso dqe nodo de flujo
      return await PYC.Create(me)(nodeDescription.nodeType + "Node",Object.assign({game:me.game,callerInfo:nodeInfo},nodeDescription)).execute(inputParams);
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
        let paramName = paramsNames[i].key;
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
        let paramName = paramsNames[i].key;
        if (params[paramName] !== undefined){
          paramsArray.push(params[paramName]);
        }
        else{
          console.error("A required parameter '" + paramName + "' is not in the params object ", params);
        } 
      }
      return paramsArray;
    };

    me.operation = {
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
      entityByName: async function ({name = "", attribute = ""}) {
       var me = this; 
       let attributeChain = attribute !== "" ? attribute.split(".") : [];
       var currentValue = me.game.getEntityByName(name);
       for (var indexAttr in attributeChain){
         currentValue = currentValue[attributeChain[indexAttr]];
       }
       return currentValue; 
       
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
      raw: async function ({value = ""},params) {
        return value;
      },
      
      list: async function({list = ""},params){
        var me = this;
        let result = [];
        for (var index in list){
          result.push(await me.resolveOperand(list[index],params));
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
          let comparation =  await me.resolveOperation(comparator,{current:entityA,candidate:entityB} ) ; 
          if (comparation){
            return entityA;
          }else{
            return entityB;
          }
        }; 
    }; 
    
  },

  react: function(props) {
   

    return (
      <li >{props.nodeType}  </li>
    );
    
  }
});

"use strict";
PYC.Describe("Element",{
  builder: function(obj,params){   
    obj.game = params.game;
    obj.owner  = params.owner;
  },
  publ: function(obj,params){    
    
  }
});

"use strict";
PYC.Describe("Entity",{
  attributes:{
    "owner": {},
    "location":{},
    "name":"",
    "children":[]
  },
  builder: function(me,params){   
  	me.prepareChildrenManagement();
  	me.insertAditionalAttributes(params);
    
  },
  publ: function(me,params){
  	me.insertAditionalAttributes = function(params){
  		var me = this;
	  	for (let attr in params){
	      if( me[attr] !== undefined){
	      	me[attr] = params[attr];
	      } else{
	      	PYC.injectGeterSeterAttribute(me,attr,params[attr]);
	      }
	    }
  	};

  	me.prepareChildrenManagement = function(){
  		var me = this;
  		me.$listenEvent(me,"beforeChange:location","redefineContainedChildren");
  	};

  	me.redefineContainedChildren = async function({newValue = {}}){
  		var me = this;
  		
  		if (me.location.removeChild !== undefined){
        await me.location.removeChild({child:me});
  		}
  		if (newValue.removeChild !== undefined){
  			await newValue.addChild({child:me});
  		}
  		return true;
  	};

  	me.removeChild = async function({child}){
  		var me = this;
  		var index = me.children.indexOf(child);
		  return await me.children.splice(index, 1);
  	};

  	me.addChild = async function({child}){
  		var me = this;
  		return await  me.children.push(child);
  	};
  	
  	me.select = async function(selectableEntities){
  		var me = this;
  		return new Promise( function(resolve,reject) {
  			setTimeout( function() {
	  			let selectionIndex = Math.floor((Math.random() * selectableEntities.length));
	  			console.log("La entidad '" + me.name + "' ha seleccionado: " + selectableEntities[selectionIndex].name);
  				resolve(selectableEntities[selectionIndex]);
  			}, Math.random() * 200);
  		}); 
  		
  	};
  }
});

"use strict";
PYC.Describe("Game",{
  attributes:{
    "zones": {},
    "players":{},
    "entitiesId":{},
    "entitiesName":{},
    "nodes":{},
  },
  builder: function(me,{players = {}, zones = {}, entities = {}, nodes = {}}){  
    me.createPlayers(players);
    me.createZones(zones);
    me.createEntities(entities);
    me.nodes = nodes;
    me.entities = entities;    
  },
  publ: function(me){ 
    me.startGame = async function(firstFlowNodeName){
      var me = this;
      await PYC.Create(me)("FlowNode",Object.assign({game:me},me.nodes[firstFlowNodeName])).execute();
      //return me.runFlow(me.nodes.Flow[firstFlowNodeName]);
    };

    me.createPlayers = function (players){
      var me = this;
      for (var playerIndex in players){
        let player = PYC.Create(me)("Entity",players[playerIndex]); // Replace Entity for player
        me.players[player.$Id()] = player;
      }
    };

    me.createZones = function (zones){
      var me = this;
      for (var zoneIndex in zones){
        let zone = PYC.Create(me)("Zone",zones[zoneIndex]);
        me.zones[zone.Id] = zone;
      }
    };
    

    me.createEntities = function (entities){
      var me = this;
      for (var entityIndex in entities){
        me.addEntity( PYC.Create(me)("Entity",entities[entityIndex]));
      }
    };

    me.createEntity = async function (createNode,inputParams){
      var me = this;
      let entity = await (PYC.Create(me)("Entity",createNode));
      await me.addEntity( entity); //REDUX
      return entity;
    };


    me.addEntity = async function (entity){
      var me = this;
      me.entitiesId[entity.$Id()] = entity;
      //me.entitiesName[entity.name] = entity;
      PYC.store.dispatch({
        type: 'MODIFY_ATTRIBUTE',
        payload:{
          entity:me.entitiesName,
          attibute:entity.name,
          value:entity
        }
      });

    };

    me.getEntityByName = function (entityName){
      var me = this;
      return me.entitiesName[entityName];
    };
  },

  storeActions:{
    MODIFY_ATTRIBUTE: function({entity = {},attibute = "",value = {}}){
      return entity[attibute] = value;
    },

    START_GAME: function({gameDescription}){
      let game = PYC.Create({   dependencyTree:{}, dispatcher:{} })("Game",gameDescription);
      game.startGame("main"); 
      return game;
    },
  }
});
"use strict";
PYC.Describe("NodeDefinitionApp",{
  attributes:{
  },
  builder: function(me,params){   
  },
  publ: function(me,params){
  },
  react: function(props) {
    const NodeSelector = PYC.React("NodeSelector");
    const NodeManipulator = PYC.React("NodeManipulator");

    return (
      <div>
        <NodeSelector 
          nodes={props.nodes}
        />
        <NodeManipulator />
      </div>
    );
  }
});
"use strict";
PYC.Describe("NodeManipulator",{
  attributes:{
  },
  builder: function(me,params){   
  },
  publ: function(me,params){
  },
  react: function(params) {
    return (
      <div>
      </div>
    );
  }
});
"use strict";
PYC.Describe("NodeSelector",{
  attributes:{
  },
  builder: function(me,params){   
  },
  publ: function(me,params){
  },
  react: function(props) {
    const BaseNode = PYC.React("BaseNode");

    return (
      <ul className="col-md-3 list-group">
        { Object.keys(props.nodes).map( (nodeType, index) => (
          <li 
            key={ index } >
            <a>{nodeType}</a>
            <ul className="list-group">
              { Object.keys(props.nodes[nodeType]).map( (nodeName, index) => (
                <li 
                  key={ index } >
                  <a>{nodeName}</a>
                </li>
              ))}
            </ul>
          </li>
          ))}
      </ul>
    );
    
  }
});
"use strict";
PYC.Describe("CreateNode",{
  Extends:"BaseNode",
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

"use strict";
PYC.Describe("ModifyNode",{
  Extends:"BaseNode",
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
      
      // TODO when adding a non setted property add it in the getter setter way so it raises events.
      
      let entity = await me.calculateValue(me.entity,params);
      let attibuteName = await me.calculateValue(me.attribute,params);
      let newValue = await me.calculateValue(me.newValue,params);
      
      PYC.history.push("asignation: " + entity + " [" + attibuteName + "] = " + newValue);
      //entity[attibuteName] = await me.calculateValue(me.newValue,params); // REDUX
 
      PYC.store.dispatch({
        type: 'MODIFY_ATTRIBUTE',
        payload:{
          entity:entity,
          attibute:attibuteName,
          value:newValue
        }
      });

      return [entity[me.attribute]];
    };

  }
});

"use strict";
PYC.Describe("PrimitiveNode",{
  Extends:"BaseNode",
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

"use strict";
PYC.Describe("SelectorNode",{
  Extends:"BaseNode",
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
