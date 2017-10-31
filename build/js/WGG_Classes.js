/*
 * web_game_generator 2.0.0
 * Platform to play and create tabletoplike games
 *
 * 
 *
 * Copyright 2017, Ignacio Medina Castillo 
 *
 * Released on: October 30, 2017
*/
import PYC from '..\\..\\module\\PrototypeClass';
import React, { Component } from "react";
/*BaseNode.js:0           */ "use strict";
/*BaseNode.js:1           */ PYC.Describe("BaseNode",{
/*BaseNode.js:2           */   attributes:{
/*BaseNode.js:3           */     "owner": {},
/*BaseNode.js:4           */   },
/*BaseNode.js:5           */   builder: function(me,params){
/*BaseNode.js:6           */     Object.assign(me,params);
/*BaseNode.js:7           */   },
/*BaseNode.js:8           */   publ: function(me,params){
/*BaseNode.js:9           */     me.resolveNode = async function(nodeInfo,inputParams){
/*BaseNode.js:10          */       var me = this;
/*BaseNode.js:11          */       let nodeDescription;
/*BaseNode.js:12          */       if (nodeInfo.id !== undefined){
/*BaseNode.js:13          */         nodeDescription = me.game.nodes[nodeInfo.nodeType][nodeInfo.id];  
/*BaseNode.js:14          */       }
/*BaseNode.js:15          */       else{
/*BaseNode.js:16          */         nodeDescription = nodeInfo; 
/*BaseNode.js:17          */       } 
/*BaseNode.js:18          */       //TODO debe gestionar las estructuras de control en si mismo en caso dqe nodo de flujo
/*BaseNode.js:19          */       return await PYC.Create(me)(nodeInfo.nodeType + "Node",Object.assign({game:me.game,callerInfo:nodeInfo},nodeDescription)).execute(inputParams);
/*BaseNode.js:20          */     };
/*BaseNode.js:21          */ 
/*BaseNode.js:22          */     me.calculateValue = async function(valueDescriptor,inputParams){
/*BaseNode.js:23          */       var me = this;
/*BaseNode.js:24          */       var newValue;
/*BaseNode.js:25          */       if (valueDescriptor.baseValue !== undefined){
/*BaseNode.js:26          */         newValue = await me.resolveOperand(valueDescriptor.baseValue,inputParams);
/*BaseNode.js:27          */         for (var operationIndex in valueDescriptor.operations){
/*BaseNode.js:28          */           let operationDescriptor =  valueDescriptor.operations[operationIndex];
/*BaseNode.js:29          */           
/*BaseNode.js:30          */           newValue = await me.resolveOperation({
/*BaseNode.js:31          */             operator: operationDescriptor.operator,
/*BaseNode.js:32          */             operands: [newValue, ...operationDescriptor.operands]
/*BaseNode.js:33          */           },inputParams);
/*BaseNode.js:34          */         }
/*BaseNode.js:35          */       }
/*BaseNode.js:36          */       else{
/*BaseNode.js:37          */         newValue = await me.resolveOperand(valueDescriptor,inputParams);
/*BaseNode.js:38          */       }
/*BaseNode.js:39          */       return newValue;
/*BaseNode.js:40          */     };
/*BaseNode.js:41          */ 
/*BaseNode.js:42          */ 
/*BaseNode.js:43          */ 
/*BaseNode.js:44          */     me.resolveOperation = async function ({operator = "",operands = []},inputParams){
/*BaseNode.js:45          */       var me = this;
/*BaseNode.js:46          */ 
/*BaseNode.js:47          */       return await me.operation[operator].call(me,operands,inputParams);
/*BaseNode.js:48          */     };
/*BaseNode.js:49          */ 
/*BaseNode.js:50          */     me.resolveCondition = async function ({operator = "",operands = []},inputParams){
/*BaseNode.js:51          */       var me = this;
/*BaseNode.js:52          */ 
/*BaseNode.js:53          */       return await me.condition[operator].call(me,operands,inputParams);
/*BaseNode.js:54          */     };
/*BaseNode.js:55          */ 
/*BaseNode.js:56          */     me.resolveOperand = async function (operand,inputParams){
/*BaseNode.js:57          */       var me = this;
/*BaseNode.js:58          */       if ( typeof operand === "object"){
/*BaseNode.js:59          */         if (me.operand[operand.type] === undefined  ){
/*BaseNode.js:60          */             console.log(operand,me);
/*BaseNode.js:61          */         }
/*BaseNode.js:62          */ 
/*BaseNode.js:63          */         return await me.operand[operand.type].call(me,operand,inputParams);
/*BaseNode.js:64          */       }else{
/*BaseNode.js:65          */         return operand;
/*BaseNode.js:66          */       }
/*BaseNode.js:67          */     };
/*BaseNode.js:68          */ 
/*BaseNode.js:69          */   	
/*BaseNode.js:70          */     me.addParamsToObjectWithNames = function(params,paramsNames = [], paramsArray = []){
/*BaseNode.js:71          */       var me = this;
/*BaseNode.js:72          */ 
/*BaseNode.js:73          */       for (let i = 0; i < paramsNames.length; i++){
/*BaseNode.js:74          */         let paramName = paramsNames[i];
/*BaseNode.js:75          */         if (paramsArray[i] !== undefined){
/*BaseNode.js:76          */           params[paramName] = paramsArray[i];
/*BaseNode.js:77          */         }
/*BaseNode.js:78          */         else{
/*BaseNode.js:79          */           console.error("A required parameter '" + paramName + "' in position '" + i + "' has not been served for node ", me);
/*BaseNode.js:80          */         }  
/*BaseNode.js:81          */       }
/*BaseNode.js:82          */       return params;
/*BaseNode.js:83          */     };
/*BaseNode.js:84          */ 
/*BaseNode.js:85          */     me.getParamsArrayFromNamedObject = function(params,paramsNames = []){
/*BaseNode.js:86          */       var me = this;
/*BaseNode.js:87          */       var paramsArray = [];
/*BaseNode.js:88          */ 
/*BaseNode.js:89          */       for (let i = 0; i < paramsNames.length; i++){
/*BaseNode.js:90          */         let paramName = paramsNames[i];
/*BaseNode.js:91          */         if (params[paramName] !== undefined){
/*BaseNode.js:92          */           paramsArray.push(params[paramName]);
/*BaseNode.js:93          */         }
/*BaseNode.js:94          */         else{
/*BaseNode.js:95          */           console.error("A required parameter '" + paramName + "' is not in the params object ", params);
/*BaseNode.js:96          */         } 
/*BaseNode.js:97          */       }
/*BaseNode.js:98          */       return paramsArray;
/*BaseNode.js:99          */     };
/*BaseNode.js:100         */ 
/*BaseNode.js:101         */     me.condition = {
/*BaseNode.js:102         */       "==":    async function (operands,inputParams) {
/*BaseNode.js:103         */         var me = this; 
/*BaseNode.js:104         */         let firstOperand = await me.resolveOperand(operands[0],inputParams);
/*BaseNode.js:105         */         let secondOperand = await me.resolveOperand(operands[1],inputParams);
/*BaseNode.js:106         */         return firstOperand == secondOperand; // jshint ignore:line
/*BaseNode.js:107         */       },
/*BaseNode.js:108         */       "<":     async function (operands,inputParams) {
/*BaseNode.js:109         */         var me = this; 
/*BaseNode.js:110         */         let firstOperand = await me.resolveOperand(operands[0],inputParams);
/*BaseNode.js:111         */         let secondOperand = await me.resolveOperand(operands[1],inputParams);
/*BaseNode.js:112         */         return firstOperand < secondOperand;
/*BaseNode.js:113         */       },
/*BaseNode.js:114         */       "<=":    async function (operands,inputParams) {
/*BaseNode.js:115         */         var me = this; 
/*BaseNode.js:116         */         let firstOperand = await me.resolveOperand(operands[0],inputParams);
/*BaseNode.js:117         */         let secondOperand = await me.resolveOperand(operands[1],inputParams);
/*BaseNode.js:118         */         return firstOperand <= secondOperand;
/*BaseNode.js:119         */       },
/*BaseNode.js:120         */       ">":     async function (operands,inputParams) {
/*BaseNode.js:121         */         var me = this; 
/*BaseNode.js:122         */         let firstOperand = await me.resolveOperand(operands[0],inputParams);
/*BaseNode.js:123         */         let secondOperand = await me.resolveOperand(operands[1],inputParams);
/*BaseNode.js:124         */         return firstOperand > secondOperand;
/*BaseNode.js:125         */       },
/*BaseNode.js:126         */       ">=":    async function (operands,inputParams) {
/*BaseNode.js:127         */         var me = this; 
/*BaseNode.js:128         */         let firstOperand = await me.resolveOperand(operands[0],inputParams);
/*BaseNode.js:129         */         let secondOperand = await me.resolveOperand(operands[1],inputParams);
/*BaseNode.js:130         */         return firstOperand >= secondOperand;
/*BaseNode.js:131         */       },
/*BaseNode.js:132         */     };
/*BaseNode.js:133         */ 
/*BaseNode.js:134         */     me.operation = {
/*BaseNode.js:135         */       "+":    async function (operands,inputParams) {
/*BaseNode.js:136         */         var me = this;
/*BaseNode.js:137         */         let firstOperand = await me.resolveOperand(operands[0],inputParams);
/*BaseNode.js:138         */         let secondOperand = await me.resolveOperand(operands[1],inputParams); 
/*BaseNode.js:139         */         return firstOperand + secondOperand;
/*BaseNode.js:140         */       },
/*BaseNode.js:141         */       "-":    async function (operands,inputParams) {
/*BaseNode.js:142         */         var me = this;
/*BaseNode.js:143         */         let firstOperand = await me.resolveOperand(operands[0],inputParams);
/*BaseNode.js:144         */         let secondOperand = await me.resolveOperand(operands[1],inputParams); 
/*BaseNode.js:145         */         return firstOperand - secondOperand;
/*BaseNode.js:146         */       },
/*BaseNode.js:147         */       "/":    async function (operands,inputParams) {
/*BaseNode.js:148         */         var me = this;
/*BaseNode.js:149         */         let firstOperand = await me.resolveOperand(operands[0],inputParams);
/*BaseNode.js:150         */         let secondOperand = await me.resolveOperand(operands[1],inputParams); 
/*BaseNode.js:151         */         return firstOperand / secondOperand;
/*BaseNode.js:152         */       },
/*BaseNode.js:153         */       "*":    async function (operands,inputParams) {
/*BaseNode.js:154         */         var me = this;
/*BaseNode.js:155         */         let firstOperand = await me.resolveOperand(operands[0],inputParams);
/*BaseNode.js:156         */         let secondOperand = await me.resolveOperand(operands[1],inputParams); 
/*BaseNode.js:157         */         return firstOperand * secondOperand;
/*BaseNode.js:158         */       },
/*BaseNode.js:159         */       "pow":  async function (operands,inputParams) {
/*BaseNode.js:160         */         var me = this;
/*BaseNode.js:161         */         let firstOperand = await me.resolveOperand(operands[0],inputParams);
/*BaseNode.js:162         */         let secondOperand = await me.resolveOperand(operands[1],inputParams); 
/*BaseNode.js:163         */         return Math.pow(firstOperand,secondOperand);
/*BaseNode.js:164         */       },
/*BaseNode.js:165         */     };
/*BaseNode.js:166         */ 
/*BaseNode.js:167         */ 
/*BaseNode.js:168         */    
/*BaseNode.js:169         */     me.operand = { 
/*BaseNode.js:170         */       entityProperty: async function ({entity = "", attribute = ""}) { 
/*BaseNode.js:171         */         var me = this; 
/*BaseNode.js:172         */         return me.game.getEntityByName(entity)[attribute]; 
/*BaseNode.js:173         */       },
/*BaseNode.js:174         */       entityByName: async function ({name = ""}) {
/*BaseNode.js:175         */        var me = this; 
/*BaseNode.js:176         */        return me.game.getEntityByName(name); 
/*BaseNode.js:177         */       },
/*BaseNode.js:178         */       param: async function ({name = "", attribute = ""},params) {
/*BaseNode.js:179         */         var me = this;
/*BaseNode.js:180         */         let attributeChain = attribute !== "" ? attribute.split(".") : [];
/*BaseNode.js:181         */         var currentValue = params[name];
/*BaseNode.js:182         */         for (var indexAttr in attributeChain){
/*BaseNode.js:183         */           currentValue = currentValue[attributeChain[indexAttr]];
/*BaseNode.js:184         */         }
/*BaseNode.js:185         */         return currentValue;
/*BaseNode.js:186         */       },
/*BaseNode.js:187         */       
/*BaseNode.js:188         */       list: async function({list = ""},params){
/*BaseNode.js:189         */         var me = this;
/*BaseNode.js:190         */         let result = [];
/*BaseNode.js:191         */         for (var index in list){
/*BaseNode.js:192         */           result.push(await me.resolveOperand(list[index],params));  // jshint ignore:line
/*BaseNode.js:193         */         }
/*BaseNode.js:194         */         return result;
/*BaseNode.js:195         */       },
/*BaseNode.js:196         */ 
/*BaseNode.js:197         */       game: async function({attribute = ""},params) {
/*BaseNode.js:198         */         var me = this;
/*BaseNode.js:199         */         return await me.resolveOperand({type:"param", name : "game", attribute : attribute},{game:me.game});
/*BaseNode.js:200         */       },
/*BaseNode.js:201         */ 
/*BaseNode.js:202         */       reduce: async function({group = "", comparator = ""},params){
/*BaseNode.js:203         */         var me = this;
/*BaseNode.js:204         */         var groupOfEntities = await me.calculateValue(group,params);
/*BaseNode.js:205         */ 
/*BaseNode.js:206         */         var result = await groupOfEntities.reduce( me.selectOne(comparator));
/*BaseNode.js:207         */         console.log(result.name);
/*BaseNode.js:208         */         return result;
/*BaseNode.js:209         */       },
/*BaseNode.js:210         */ 
/*BaseNode.js:211         */       
/*BaseNode.js:212         */     };
/*BaseNode.js:213         */ 
/*BaseNode.js:214         */     me.selectOne = function (comparator) {
/*BaseNode.js:215         */         var me = this;
/*BaseNode.js:216         */         return async function (entityA, entityB){
/*BaseNode.js:217         */           let comparation =  await me.resolveCondition(comparator,{current:entityA,candidate:entityB} ) ; 
/*BaseNode.js:218         */           if (comparation){
/*BaseNode.js:219         */             return entityA;
/*BaseNode.js:220         */           }else{
/*BaseNode.js:221         */             return entityB;
/*BaseNode.js:222         */           }
/*BaseNode.js:223         */         }; 
/*BaseNode.js:224         */     }; 
/*BaseNode.js:225         */     
/*BaseNode.js:226         */   }
/*BaseNode.js:227         */ });
/*BaseNode.js:228         */ 
/*Element.js:0            */ "use strict";
/*Element.js:1            */ PYC.Describe("Element",{
/*Element.js:2            */   builder: function(obj,params){   
/*Element.js:3            */     obj.game = params.game;
/*Element.js:4            */     obj.owner  = params.owner;
/*Element.js:5            */   },
/*Element.js:6            */   publ: function(obj,params){    
/*Element.js:7            */     
/*Element.js:8            */   }
/*Element.js:9            */ });
/*Element.js:10           */ 
/*Entity.js:0             */ "use strict";
/*Entity.js:1             */ PYC.Describe("Entity",{
/*Entity.js:2             */   attributes:{
/*Entity.js:3             */     "owner": {},
/*Entity.js:4             */     "location":{},
/*Entity.js:5             */     "name":"",
/*Entity.js:6             */     "children":[]
/*Entity.js:7             */   },
/*Entity.js:8             */   builder: function(me,params){   
/*Entity.js:9             */   	me.prepareChildrenManagement();
/*Entity.js:10            */   	me.insertAditionalAttributes(params);
/*Entity.js:11            */     
/*Entity.js:12            */   },
/*Entity.js:13            */   publ: function(me,params){
/*Entity.js:14            */   	me.insertAditionalAttributes = function(params){
/*Entity.js:15            */   		var me = this;
/*Entity.js:16            */ 	  	for (let attr in params){
/*Entity.js:17            */ 	      if( me[attr] !== undefined){
/*Entity.js:18            */ 	      	me[attr] = params[attr];
/*Entity.js:19            */ 	      } else{
/*Entity.js:20            */ 	      	PYC.injectGeterSeterAttribute(me,attr,params[attr]);
/*Entity.js:21            */ 	      }
/*Entity.js:22            */ 	    }
/*Entity.js:23            */   	};
/*Entity.js:24            */ 
/*Entity.js:25            */   	me.prepareChildrenManagement = function(){
/*Entity.js:26            */   		var me = this;
/*Entity.js:27            */   		me.$listenEvent(me,"beforeChange:location","redefineContainedChildren");
/*Entity.js:28            */   	};
/*Entity.js:29            */ 
/*Entity.js:30            */   	me.redefineContainedChildren = async function({newValue = {}}){
/*Entity.js:31            */   		var me = this;
/*Entity.js:32            */   		
/*Entity.js:33            */   		if (me.location.removeChild !== undefined){
/*Entity.js:34            */         await me.location.removeChild({child:me});
/*Entity.js:35            */   		}
/*Entity.js:36            */   		if (newValue.removeChild !== undefined){
/*Entity.js:37            */   			await newValue.addChild({child:me});
/*Entity.js:38            */   		}
/*Entity.js:39            */   		return true;
/*Entity.js:40            */   	};
/*Entity.js:41            */ 
/*Entity.js:42            */   	me.removeChild = async function({child}){
/*Entity.js:43            */   		var me = this;
/*Entity.js:44            */   		var index = me.children.indexOf(child);
/*Entity.js:45            */ 		  return await me.children.splice(index, 1);
/*Entity.js:46            */   	};
/*Entity.js:47            */ 
/*Entity.js:48            */   	me.addChild = async function({child}){
/*Entity.js:49            */   		var me = this;
/*Entity.js:50            */   		return await  me.children.push(child);
/*Entity.js:51            */   	};
/*Entity.js:52            */   	
/*Entity.js:53            */   	me.select = async function(selectableEntities){
/*Entity.js:54            */   		var me = this;
/*Entity.js:55            */   		return new Promise( function(resolve,reject) {
/*Entity.js:56            */   			setTimeout( function() {
/*Entity.js:57            */ 	  			let selectionIndex = Math.floor((Math.random() * selectableEntities.length));
/*Entity.js:58            */ 	  			console.log("La entidad '" + me.name + "' ha seleccionado: " + selectableEntities[selectionIndex].name);
/*Entity.js:59            */   				resolve(selectableEntities[selectionIndex]);
/*Entity.js:60            */   			}, Math.random() * 200);
/*Entity.js:61            */   		}); 
/*Entity.js:62            */   		
/*Entity.js:63            */   	};
/*Entity.js:64            */   }
/*Entity.js:65            */ });
/*Entity.js:66            */ 
/*Game.js:0               */ "use strict";
/*Game.js:1               */ PYC.Describe("Game",{
/*Game.js:2               */   attributes:{
/*Game.js:3               */     "zones": {},
/*Game.js:4               */     "players":{},
/*Game.js:5               */     "entitiesId":{},
/*Game.js:6               */     "entitiesName":{},
/*Game.js:7               */     "nodes":{},
/*Game.js:8               */   },
/*Game.js:9               */   builder: function(me,{players = {}, zones = {}, entities = {}, nodes = {}}){  
/*Game.js:10              */     me.createPlayers(players);
/*Game.js:11              */     me.createZones(zones);
/*Game.js:12              */     me.createEntities(entities);
/*Game.js:13              */     me.nodes = nodes;
/*Game.js:14              */     me.entities = entities;    
/*Game.js:15              */   },
/*Game.js:16              */   publ: function(me){ 
/*Game.js:17              */     me.startGame = async function(firstFlowNodeName){
/*Game.js:18              */       var me = this;
/*Game.js:19              */       await PYC.Create(me)("FlowNode",Object.assign({game:me},me.nodes.Flow[firstFlowNodeName])).execute();
/*Game.js:20              */       //return me.runFlow(me.nodes.Flow[firstFlowNodeName]);
/*Game.js:21              */     };
/*Game.js:22              */ 
/*Game.js:23              */     me.createPlayers = function (players){
/*Game.js:24              */       var me = this;
/*Game.js:25              */       for (var playerIndex in players){
/*Game.js:26              */         let player = PYC.Create(me)("Entity",players[playerIndex]); // Replace Entity for player
/*Game.js:27              */         me.players[player.$Id()] = player;
/*Game.js:28              */       }
/*Game.js:29              */     };
/*Game.js:30              */ 
/*Game.js:31              */     me.createZones = function (zones){
/*Game.js:32              */       var me = this;
/*Game.js:33              */       for (var zoneIndex in zones){
/*Game.js:34              */         let zone = PYC.Create(me)("Zone",zones[zoneIndex]);
/*Game.js:35              */         me.zones[zone.Id] = zone;
/*Game.js:36              */       }
/*Game.js:37              */     };
/*Game.js:38              */     
/*Game.js:39              */ 
/*Game.js:40              */     me.createEntities = function (entities){
/*Game.js:41              */       var me = this;
/*Game.js:42              */       for (var entityIndex in entities){
/*Game.js:43              */         me.addEntity( PYC.Create(me)("Entity",entities[entityIndex]));
/*Game.js:44              */       }
/*Game.js:45              */     };
/*Game.js:46              */ 
/*Game.js:47              */     me.createEntity = async function (createNode,inputParams){
/*Game.js:48              */       var me = this;
/*Game.js:49              */       let entity = await (PYC.Create(me)("Entity",createNode));
/*Game.js:50              */       me.addEntity( entity);
/*Game.js:51              */       return entity;
/*Game.js:52              */     };
/*Game.js:53              */ 
/*Game.js:54              */ 
/*Game.js:55              */     me.addEntity = function (entity){
/*Game.js:56              */       var me = this;
/*Game.js:57              */       me.entitiesId[entity.$Id()] = entity;
/*Game.js:58              */       me.entitiesName[entity.name] = entity;
/*Game.js:59              */     };
/*Game.js:60              */ 
/*Game.js:61              */     me.getEntityByName = function (entityName){
/*Game.js:62              */       var me = this;
/*Game.js:63              */       return me.entitiesName[entityName];
/*Game.js:64              */     };
/*Game.js:65              */   }
/*Game.js:66              */ });
/*NodeDefinitionApp.js:0  */ "use strict";
/*NodeDefinitionApp.js:1  */ PYC.Describe("NodeDefinitionApp",{
/*NodeDefinitionApp.js:2  */   attributes:{
/*NodeDefinitionApp.js:3  */   },
/*NodeDefinitionApp.js:4  */   builder: function(me,params){   
/*NodeDefinitionApp.js:5  */   },
/*NodeDefinitionApp.js:6  */   publ: function(me,params){
/*NodeDefinitionApp.js:7  */   },
/*NodeDefinitionApp.js:8  */   react: function(params) {
/*NodeDefinitionApp.js:9  */     let NodeSelector = PYC.React("NodeSelector");
/*NodeDefinitionApp.js:10 */     let NodeManipulator = PYC.React("NodeManipulator");
/*NodeDefinitionApp.js:11 */ 
/*NodeDefinitionApp.js:12 */     return (
/*NodeDefinitionApp.js:13 */       <div>
/*NodeDefinitionApp.js:14 */         <NodeSelector />
/*NodeDefinitionApp.js:15 */         <NodeManipulator />
/*NodeDefinitionApp.js:16 */       </div>
/*NodeDefinitionApp.js:17 */     );
/*NodeDefinitionApp.js:18 */   }
/*NodeDefinitionApp.js:19 */ });
/*NodeManipulator.js:0    */ "use strict";
/*NodeManipulator.js:1    */ PYC.Describe("NodeManipulator",{
/*NodeManipulator.js:2    */   attributes:{
/*NodeManipulator.js:3    */   },
/*NodeManipulator.js:4    */   builder: function(me,params){   
/*NodeManipulator.js:5    */   },
/*NodeManipulator.js:6    */   publ: function(me,params){
/*NodeManipulator.js:7    */   },
/*NodeManipulator.js:8    */   react: function(params) {
/*NodeManipulator.js:9    */     
/*NodeManipulator.js:10   */ 
/*NodeManipulator.js:11   */     return (
/*NodeManipulator.js:12   */       <div>
/*NodeManipulator.js:13   */        
/*NodeManipulator.js:14   */       </div>
/*NodeManipulator.js:15   */     );
/*NodeManipulator.js:16   */   }
/*NodeManipulator.js:17   */ });
/*NodeSelector.js:0       */ "use strict";
/*NodeSelector.js:1       */ PYC.Describe("NodeSelector",{
/*NodeSelector.js:2       */   attributes:{
/*NodeSelector.js:3       */   },
/*NodeSelector.js:4       */   builder: function(me,params){   
/*NodeSelector.js:5       */   },
/*NodeSelector.js:6       */   publ: function(me,params){
/*NodeSelector.js:7       */   },
/*NodeSelector.js:8       */   react: function(params) {
/*NodeSelector.js:9       */   
/*NodeSelector.js:10      */     return (
/*NodeSelector.js:11      */       <div>
/*NodeSelector.js:12      */       
/*NodeSelector.js:13      */       </div>
/*NodeSelector.js:14      */     );
/*NodeSelector.js:15      */   }
/*NodeSelector.js:16      */ });
/*CreateNode.js:0         */ "use strict";
/*CreateNode.js:1         */ PYC.Describe("CreateNode",{
/*CreateNode.js:2         */   Extends:"BaseNode",
/*CreateNode.js:3         */   attributes:{
/*CreateNode.js:4         */   },
/*CreateNode.js:5         */   builder: function(me,params){   
/*CreateNode.js:6         */   },
/*CreateNode.js:7         */   publ: function(me,params){
/*CreateNode.js:8         */   	me.execute = async function(inputParams){
/*CreateNode.js:9         */       var me = this;
/*CreateNode.js:10        */       var params = {};
/*CreateNode.js:11        */       var newEntityDescription = {};
/*CreateNode.js:12        */       console.log(me.description);
/*CreateNode.js:13        */       me.addParamsToObjectWithNames(params,me.inputNames,inputParams);
/*CreateNode.js:14        */ 
/*CreateNode.js:15        */       for (var attrName in me.attributes){
/*CreateNode.js:16        */         newEntityDescription[attrName] = await me.calculateValue(me.attributes[attrName],params);
/*CreateNode.js:17        */       }
/*CreateNode.js:18        */ 
/*CreateNode.js:19        */       var entity = await me.game.createEntity(newEntityDescription,params);
/*CreateNode.js:20        */ 
/*CreateNode.js:21        */       // if (me.children !== undefined && me.children.length > 0){
/*CreateNode.js:22        */       //   let childrenPramsArray = [...inputParams,entity];
/*CreateNode.js:23        */       //   for (var childrenIndex in me.children){
/*CreateNode.js:24        */       //     let childrenDescription = me.children[childrenIndex];
/*CreateNode.js:25        */       //     let chidren = await me.runCreate(childrenDescription,childrenPramsArray);
/*CreateNode.js:26        */       //   }
/*CreateNode.js:27        */       // }
/*CreateNode.js:28        */ 
/*CreateNode.js:29        */       return [entity];
/*CreateNode.js:30        */     };
/*CreateNode.js:31        */ 
/*CreateNode.js:32        */   }
/*CreateNode.js:33        */ });
/*CreateNode.js:34        */ 
/*FlowNode.js:0           */ "use strict";
/*FlowNode.js:1           */ PYC.Describe("FlowNode",{
/*FlowNode.js:2           */   Extends:"BaseNode",
/*FlowNode.js:3           */   attributes:{
/*FlowNode.js:4           */   },
/*FlowNode.js:5           */   builder: function(me,params){   
/*FlowNode.js:6           */   },
/*FlowNode.js:7           */   publ: function(me,params){
/*FlowNode.js:8           */   	me.execute = async function(inputParams){
/*FlowNode.js:9           */       var me = this;  
/*FlowNode.js:10          */       if (me.callerInfo !== undefined && me.callerInfo.control !== undefined){
/*FlowNode.js:11          */       	me.control = me.callerInfo.control;
/*FlowNode.js:12          */       	return await me.controlStructure[me.control.type].call(me,inputParams);
/*FlowNode.js:13          */       }else{
/*FlowNode.js:14          */       	return await me.singleExecution(inputParams);
/*FlowNode.js:15          */       }
/*FlowNode.js:16          */     };
/*FlowNode.js:17          */ 
/*FlowNode.js:18          */     me.singleExecution = async function(inputParams){
/*FlowNode.js:19          */       var me = this;
/*FlowNode.js:20          */       var params = {};
/*FlowNode.js:21          */ 
/*FlowNode.js:22          */       me.addParamsToObjectWithNames(params,me.inputNames,inputParams);
/*FlowNode.js:23          */    
/*FlowNode.js:24          */       console.group(me.description);
/*FlowNode.js:25          */       for (let nodeIndex in me.nodes){
/*FlowNode.js:26          */         let childNode = me.nodes[nodeIndex];
/*FlowNode.js:27          */         let nodeResult = await me.resolveNode(childNode,me.getParamsArrayFromNamedObject(params,childNode.inputNames));
/*FlowNode.js:28          */         me.addParamsToObjectWithNames(params, childNode.outputNames, nodeResult);
/*FlowNode.js:29          */       }
/*FlowNode.js:30          */       console.groupEnd();
/*FlowNode.js:31          */ 
/*FlowNode.js:32          */       return await me.getParamsArrayFromNamedObject(params,me.outputNames);
/*FlowNode.js:33          */     };
/*FlowNode.js:34          */ 
/*FlowNode.js:35          */     me.controlStructure = {
/*FlowNode.js:36          */       while : async function (  inputParams){
/*FlowNode.js:37          */         var me = this;
/*FlowNode.js:38          */         params = [];
/*FlowNode.js:39          */         let infiniteLoopLock = 0;
/*FlowNode.js:40          */         while (await me.resolveCondition(me.control.condition,inputParams) || infiniteLoopLock > 1000){ // jshint ignore:line
/*FlowNode.js:41          */           let nodeExecution = await me.singleExecution(inputParams);
/*FlowNode.js:42          */           params.push( nodeExecution); 
/*FlowNode.js:43          */           infiniteLoopLock++;
/*FlowNode.js:44          */         }
/*FlowNode.js:45          */         if (infiniteLoopLock > 1000) console.error("infinite loop prevented");
/*FlowNode.js:46          */         return params;
/*FlowNode.js:47          */       },
/*FlowNode.js:48          */ 
/*FlowNode.js:49          */       simultaneous : async function ( inputParams){
/*FlowNode.js:50          */         var me = this;
/*FlowNode.js:51          */         let result;
/*FlowNode.js:52          */         let elements = await me.calculateValue(me.control.nodeSpecificInfo,params); 
/*FlowNode.js:53          */         let simultaneousOperations = [];
/*FlowNode.js:54          */ 
/*FlowNode.js:55          */         console.group("simultaneous flows per element");
/*FlowNode.js:56          */         for (var elementIndex in elements){
/*FlowNode.js:57          */           simultaneousOperations.push( me.singleExecution([elements[elementIndex],...inputParams]));
/*FlowNode.js:58          */         }
/*FlowNode.js:59          */         result = await Promise.all(simultaneousOperations);      
/*FlowNode.js:60          */         console.groupEnd();  
/*FlowNode.js:61          */         return result;
/*FlowNode.js:62          */       },
/*FlowNode.js:63          */ 
/*FlowNode.js:64          */       consecutive : async function (inputParams){
/*FlowNode.js:65          */       	var me = this;
/*FlowNode.js:66          */         let elements = await me.calculateValue(me.control.nodeSpecificInfo,params); 
/*FlowNode.js:67          */         let result = [];
/*FlowNode.js:68          */         
/*FlowNode.js:69          */         if (me.control.initiative !== undefined){
/*FlowNode.js:70          */         	// set a value for every element , then sort.
/*FlowNode.js:71          */         }
/*FlowNode.js:72          */ 
/*FlowNode.js:73          */         console.group("consecutive flows per element");
/*FlowNode.js:74          */         
/*FlowNode.js:75          */         for (var elementIndex in elements){
/*FlowNode.js:76          */           let nodeExecution = await me.singleExecution([elements[elementIndex],...inputParams]);
/*FlowNode.js:77          */           result.push(nodeExecution );
/*FlowNode.js:78          */         }
/*FlowNode.js:79          */         console.groupEnd();  
/*FlowNode.js:80          */         return result;
/*FlowNode.js:81          */       },
/*FlowNode.js:82          */ 
/*FlowNode.js:83          */       
/*FlowNode.js:84          */     };
/*FlowNode.js:85          */ 
/*FlowNode.js:86          */   }
/*FlowNode.js:87          */ });
/*FlowNode.js:88          */ 
/*ModifyNode.js:0         */ "use strict";
/*ModifyNode.js:1         */ PYC.Describe("ModifyNode",{
/*ModifyNode.js:2         */   Extends:"BaseNode",
/*ModifyNode.js:3         */   attributes:{
/*ModifyNode.js:4         */   },
/*ModifyNode.js:5         */   builder: function(me,params){   
/*ModifyNode.js:6         */   },
/*ModifyNode.js:7         */   publ: function(me,params){
/*ModifyNode.js:8         */   	me.execute = async function(inputParams){
/*ModifyNode.js:9         */       var me = this;
/*ModifyNode.js:10        */       var params = {};
/*ModifyNode.js:11        */       me.addParamsToObjectWithNames(params,me.inputNames,inputParams);
/*ModifyNode.js:12        */ 
/*ModifyNode.js:13        */       console.log(me.description);
/*ModifyNode.js:14        */ 
/*ModifyNode.js:15        */       
/*ModifyNode.js:16        */       // TODO when adding a non setted property add it in the getter setter way so it raises events.
/*ModifyNode.js:17        */       
/*ModifyNode.js:18        */       let entity = await me.calculateValue(me.entity,params);
/*ModifyNode.js:19        */       let attibuteName = await me.calculateValue(me.attribute,params);
/*ModifyNode.js:20        */       entity[attibuteName] = await me.calculateValue(me.newValue,params);
/*ModifyNode.js:21        */ 
/*ModifyNode.js:22        */       return [entity[me.attribute]];
/*ModifyNode.js:23        */     };
/*ModifyNode.js:24        */ 
/*ModifyNode.js:25        */   }
/*ModifyNode.js:26        */ });
/*ModifyNode.js:27        */ 
/*PrimitiveNode.js:0      */ "use strict";
/*PrimitiveNode.js:1      */ PYC.Describe("PrimitiveNode",{
/*PrimitiveNode.js:2      */   Extends:"BaseNode",
/*PrimitiveNode.js:3      */   attributes:{
/*PrimitiveNode.js:4      */   },
/*PrimitiveNode.js:5      */   builder: function(me,params){   
/*PrimitiveNode.js:6      */   },
/*PrimitiveNode.js:7      */   publ: function(me,params){
/*PrimitiveNode.js:8      */   	me.execute = async function(inputParams){
/*PrimitiveNode.js:9      */       var me = this;   
/*PrimitiveNode.js:10     */       var params = {};
/*PrimitiveNode.js:11     */       me.addParamsToObjectWithNames(params,me.inputNames,inputParams);
/*PrimitiveNode.js:12     */       let primitive =  await me.calculateValue(me.value,params);
/*PrimitiveNode.js:13     */ 
/*PrimitiveNode.js:14     */       return [primitive];
/*PrimitiveNode.js:15     */     };
/*PrimitiveNode.js:16     */ 
/*PrimitiveNode.js:17     */   }
/*PrimitiveNode.js:18     */ });
/*PrimitiveNode.js:19     */ 
/*SelectorNode.js:0       */ "use strict";
/*SelectorNode.js:1       */ PYC.Describe("SelectorNode",{
/*SelectorNode.js:2       */   Extends:"BaseNode",
/*SelectorNode.js:3       */   attributes:{
/*SelectorNode.js:4       */   },
/*SelectorNode.js:5       */   builder: function(me,params){   
/*SelectorNode.js:6       */   },
/*SelectorNode.js:7       */   publ: function(me,params){
/*SelectorNode.js:8       */   	me.execute = async function(inputParams){
/*SelectorNode.js:9       */       var me = this;   
/*SelectorNode.js:10      */       var params = {};
/*SelectorNode.js:11      */       let fullEntitiesList = [];
/*SelectorNode.js:12      */ 
/*SelectorNode.js:13      */       me.addParamsToObjectWithNames(params,me.inputNames,inputParams);
/*SelectorNode.js:14      */       let entityWhomSelect = await me.calculateValue(me.whoSelect,params);
/*SelectorNode.js:15      */ 
/*SelectorNode.js:16      */       for (var optionsIndex in me.options){
/*SelectorNode.js:17      */         let optionsSpecification = me.options[optionsIndex];
/*SelectorNode.js:18      */         let entitiesList = await me.calculateValue(optionsSpecification.scope,params);
/*SelectorNode.js:19      */         let posibleEntities = await me.reduceEntitiesByRestrictions(entitiesList,optionsSpecification.restrictions,params);
/*SelectorNode.js:20      */         fullEntitiesList = fullEntitiesList.concat(posibleEntities);
/*SelectorNode.js:21      */       }
/*SelectorNode.js:22      */       let selection = await entityWhomSelect.select(fullEntitiesList);
/*SelectorNode.js:23      */       return [selection];
/*SelectorNode.js:24      */       
/*SelectorNode.js:25      */     };
/*SelectorNode.js:26      */ 
/*SelectorNode.js:27      */     me.reduceEntitiesByRestrictions = async function(entitiesList,restrictions,inputParams){
/*SelectorNode.js:28      */         var me = this;
/*SelectorNode.js:29      */         //TODO restrictions
/*SelectorNode.js:30      */         return entitiesList;
/*SelectorNode.js:31      */     };
/*SelectorNode.js:32      */   }
/*SelectorNode.js:33      */ });
/*SelectorNode.js:34      */ 