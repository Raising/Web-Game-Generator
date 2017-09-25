/*
 * web_game_generator 2.0.0
 * Platform to play and create tabletoplike games
 *
 * 
 *
 * Copyright 2017, Ignacio Medina Castillo 
 *
 * Released on: September 25, 2017
*/
/*CL_Element.js:0         */ "use strict";
/*CL_Element.js:1         */ PYC.Describe("Element",{
/*CL_Element.js:2         */   builder: function(obj,params){   
/*CL_Element.js:3         */     obj.game = params.game;
/*CL_Element.js:4         */     obj.owner  = params.owner;
/*CL_Element.js:5         */   },
/*CL_Element.js:6         */   publ: function(obj,params){    
/*CL_Element.js:7         */     
/*CL_Element.js:8         */   }
/*CL_Element.js:9         */ });
/*CL_Element.js:10        */ 
/*CL_Entity.js:0          */ "use strict";
/*CL_Entity.js:1          */ PYC.Describe("Entity",{
/*CL_Entity.js:2          */   attributes:{
/*CL_Entity.js:3          */     "owner": {},
/*CL_Entity.js:4          */     "location":{},
/*CL_Entity.js:5          */     "name":"",
/*CL_Entity.js:6          */     "children":[]
/*CL_Entity.js:7          */   },
/*CL_Entity.js:8          */   builder: function(me,params){   
/*CL_Entity.js:9          */   	me.prepareChildrenManagement();
/*CL_Entity.js:10         */   	me.insertAditionalAttributes(params);
/*CL_Entity.js:11         */     
/*CL_Entity.js:12         */   },
/*CL_Entity.js:13         */   publ: function(me,params){
/*CL_Entity.js:14         */   	me.insertAditionalAttributes = function(params){
/*CL_Entity.js:15         */   		var me = this;
/*CL_Entity.js:16         */ 	  	for (let attr in params){
/*CL_Entity.js:17         */ 	      if( me[attr] !== undefined){
/*CL_Entity.js:18         */ 	      	me[attr] = params[attr];
/*CL_Entity.js:19         */ 	      } else{
/*CL_Entity.js:20         */ 	      	PYC.injectGeterSeterAttribute(me,attr,params[attr]);
/*CL_Entity.js:21         */ 	      }
/*CL_Entity.js:22         */ 	    }
/*CL_Entity.js:23         */   	};
/*CL_Entity.js:24         */ 
/*CL_Entity.js:25         */   	me.prepareChildrenManagement = function(){
/*CL_Entity.js:26         */   		var me = this;
/*CL_Entity.js:27         */   		me.$listenEvent(me,"beforeChange:location","redefineContainedChildren");
/*CL_Entity.js:28         */   	};
/*CL_Entity.js:29         */ 
/*CL_Entity.js:30         */   	me.redefineContainedChildren = async function({newValue = {}}){
/*CL_Entity.js:31         */   		var me = this;
/*CL_Entity.js:32         */   		
/*CL_Entity.js:33         */   		if (me.location.removeChild !== undefined){
/*CL_Entity.js:34         */         await me.location.removeChild({child:me});
/*CL_Entity.js:35         */   		}
/*CL_Entity.js:36         */   		if (newValue.removeChild !== undefined){
/*CL_Entity.js:37         */   			await newValue.addChild({child:me});
/*CL_Entity.js:38         */   		}
/*CL_Entity.js:39         */   		return true;
/*CL_Entity.js:40         */   	};
/*CL_Entity.js:41         */ 
/*CL_Entity.js:42         */   	me.removeChild = async function({child}){
/*CL_Entity.js:43         */   		var me = this;
/*CL_Entity.js:44         */   		var index = me.children.indexOf(child);
/*CL_Entity.js:45         */ 		  return await me.children.splice(index, 1);
/*CL_Entity.js:46         */   	};
/*CL_Entity.js:47         */ 
/*CL_Entity.js:48         */   	me.addChild = async function({child}){
/*CL_Entity.js:49         */   		var me = this;
/*CL_Entity.js:50         */   		return await  me.children.push(child);
/*CL_Entity.js:51         */   	};
/*CL_Entity.js:52         */   	
/*CL_Entity.js:53         */   	me.select = async function(selectableEntities){
/*CL_Entity.js:54         */   		var me = this;
/*CL_Entity.js:55         */   		return new Promise( function(resolve,reject) {
/*CL_Entity.js:56         */   			setTimeout( function() {
/*CL_Entity.js:57         */ 	  			let selectionIndex = Math.floor((Math.random() * selectableEntities.length));
/*CL_Entity.js:58         */ 	  			console.log("La entidad '" + me.name + "' ha seleccionado: " + selectableEntities[selectionIndex].name);
/*CL_Entity.js:59         */   				resolve(selectableEntities[selectionIndex]);
/*CL_Entity.js:60         */   			}, Math.random() * 200);
/*CL_Entity.js:61         */   		}); 
/*CL_Entity.js:62         */   		
/*CL_Entity.js:63         */   	};
/*CL_Entity.js:64         */   }
/*CL_Entity.js:65         */ });
/*CL_Entity.js:66         */ 
/*CL_Game.js:0            */ "use strict";
/*CL_Game.js:1            */ PYC.Describe("Game",{
/*CL_Game.js:2            */   attributes:{
/*CL_Game.js:3            */     "zones": {},
/*CL_Game.js:4            */     "players":{},
/*CL_Game.js:5            */     "entitiesId":{},
/*CL_Game.js:6            */     "entitiesName":{},
/*CL_Game.js:7            */     "nodes":{},
/*CL_Game.js:8            */   },
/*CL_Game.js:9            */   builder: function(me,{players = {}, zones = {}, entities = {}, nodes = {}}){  
/*CL_Game.js:10           */     me.createPlayers(players);
/*CL_Game.js:11           */     me.createZones(zones);
/*CL_Game.js:12           */     me.createEntities(entities);
/*CL_Game.js:13           */     me.nodes = nodes;
/*CL_Game.js:14           */     me.entities = entities;    
/*CL_Game.js:15           */   },
/*CL_Game.js:16           */   publ: function(me){ 
/*CL_Game.js:17           */     me.startGame = async function(firstFlowNodeName){
/*CL_Game.js:18           */       var me = this;
/*CL_Game.js:19           */       await PYC.Create(me)("FlowNode",Object.assign({game:me},me.nodes.Flow[firstFlowNodeName])).execute();
/*CL_Game.js:20           */       //return me.runFlow(me.nodes.Flow[firstFlowNodeName]);
/*CL_Game.js:21           */     };
/*CL_Game.js:22           */ 
/*CL_Game.js:23           */     me.createPlayers = function (players){
/*CL_Game.js:24           */       var me = this;
/*CL_Game.js:25           */       for (var playerIndex in players){
/*CL_Game.js:26           */         let player = PYC.Create(me)("Entity",players[playerIndex]); // Replace Entity for player
/*CL_Game.js:27           */         me.players[player.$Id()] = player;
/*CL_Game.js:28           */       }
/*CL_Game.js:29           */     };
/*CL_Game.js:30           */ 
/*CL_Game.js:31           */     me.createZones = function (zones){
/*CL_Game.js:32           */       var me = this;
/*CL_Game.js:33           */       for (var zoneIndex in zones){
/*CL_Game.js:34           */         let zone = PYC.Create(me)("Zone",zones[zoneIndex]);
/*CL_Game.js:35           */         me.zones[zone.Id] = zone;
/*CL_Game.js:36           */       }
/*CL_Game.js:37           */     };
/*CL_Game.js:38           */     
/*CL_Game.js:39           */ 
/*CL_Game.js:40           */     me.createEntities = function (entities){
/*CL_Game.js:41           */       var me = this;
/*CL_Game.js:42           */       for (var entityIndex in entities){
/*CL_Game.js:43           */         me.addEntity( PYC.Create(me)("Entity",entities[entityIndex]));
/*CL_Game.js:44           */       }
/*CL_Game.js:45           */     };
/*CL_Game.js:46           */ 
/*CL_Game.js:47           */     me.createEntity = async function (createNode,inputParams){
/*CL_Game.js:48           */       var me = this;
/*CL_Game.js:49           */       let entity = await (PYC.Create(me)("Entity",createNode));
/*CL_Game.js:50           */       me.addEntity( entity);
/*CL_Game.js:51           */       return entity;
/*CL_Game.js:52           */     };
/*CL_Game.js:53           */ 
/*CL_Game.js:54           */ 
/*CL_Game.js:55           */     me.addEntity = function (entity){
/*CL_Game.js:56           */       var me = this;
/*CL_Game.js:57           */       me.entitiesId[entity.$Id()] = entity;
/*CL_Game.js:58           */       me.entitiesName[entity.name] = entity;
/*CL_Game.js:59           */     };
/*CL_Game.js:60           */ 
/*CL_Game.js:61           */     me.getEntityByName = function (entityName){
/*CL_Game.js:62           */       var me = this;
/*CL_Game.js:63           */       return me.entitiesName[entityName];
/*CL_Game.js:64           */     };
/*CL_Game.js:65           */   }
/*CL_Game.js:66           */ });
/*CL_Node.js:0            */ "use strict";
/*CL_Node.js:1            */ PYC.Describe("Node",{
/*CL_Node.js:2            */   attributes:{
/*CL_Node.js:3            */     "owner": {},
/*CL_Node.js:4            */   },
/*CL_Node.js:5            */   builder: function(me,params){   
/*CL_Node.js:6            */     Object.assign(me,params);
/*CL_Node.js:7            */   },
/*CL_Node.js:8            */   publ: function(me,params){
/*CL_Node.js:9            */     me.resolveNode = async function(nodeInfo,inputParams){
/*CL_Node.js:10           */       var me = this;
/*CL_Node.js:11           */       let nodeDescription;
/*CL_Node.js:12           */       if (nodeInfo.id !== undefined){
/*CL_Node.js:13           */         nodeDescription = me.game.nodes[nodeInfo.nodeType][nodeInfo.id];  
/*CL_Node.js:14           */       }
/*CL_Node.js:15           */       else{
/*CL_Node.js:16           */         nodeDescription = nodeInfo; 
/*CL_Node.js:17           */       } 
/*CL_Node.js:18           */       //TODO debe gestionar las estructuras de control en si mismo en caso dqe nodo de flujo
/*CL_Node.js:19           */       return await PYC.Create(me)(nodeInfo.nodeType + "Node",Object.assign({game:me.game,callerInfo:nodeInfo},nodeDescription)).execute(inputParams);
/*CL_Node.js:20           */     };
/*CL_Node.js:21           */ 
/*CL_Node.js:22           */     me.calculateValue = async function(valueDescriptor,inputParams){
/*CL_Node.js:23           */       var me = this;
/*CL_Node.js:24           */       var newValue;
/*CL_Node.js:25           */       if (valueDescriptor.baseValue !== undefined){
/*CL_Node.js:26           */         newValue = await me.resolveOperand(valueDescriptor.baseValue,inputParams);
/*CL_Node.js:27           */         for (var operationIndex in valueDescriptor.operations){
/*CL_Node.js:28           */           let operationDescriptor =  valueDescriptor.operations[operationIndex];
/*CL_Node.js:29           */           
/*CL_Node.js:30           */           newValue = await me.resolveOperation({
/*CL_Node.js:31           */             operator: operationDescriptor.operator,
/*CL_Node.js:32           */             operands: [newValue, ...operationDescriptor.operands]
/*CL_Node.js:33           */           },inputParams);
/*CL_Node.js:34           */         }
/*CL_Node.js:35           */       }
/*CL_Node.js:36           */       else{
/*CL_Node.js:37           */         newValue = await me.resolveOperand(valueDescriptor,inputParams);
/*CL_Node.js:38           */       }
/*CL_Node.js:39           */       return newValue;
/*CL_Node.js:40           */     };
/*CL_Node.js:41           */ 
/*CL_Node.js:42           */ 
/*CL_Node.js:43           */ 
/*CL_Node.js:44           */     me.resolveOperation = async function ({operator = "",operands = []},inputParams){
/*CL_Node.js:45           */       var me = this;
/*CL_Node.js:46           */ 
/*CL_Node.js:47           */       return await me.operation[operator].call(me,operands,inputParams);
/*CL_Node.js:48           */     };
/*CL_Node.js:49           */ 
/*CL_Node.js:50           */     me.resolveCondition = async function ({operator = "",operands = []},inputParams){
/*CL_Node.js:51           */       var me = this;
/*CL_Node.js:52           */ 
/*CL_Node.js:53           */       return await me.condition[operator].call(me,operands,inputParams);
/*CL_Node.js:54           */     };
/*CL_Node.js:55           */ 
/*CL_Node.js:56           */     me.resolveOperand = async function (operand,inputParams){
/*CL_Node.js:57           */       var me = this;
/*CL_Node.js:58           */       if ( typeof operand === "object"){
/*CL_Node.js:59           */         if (me.operand[operand.type] === undefined  ){
/*CL_Node.js:60           */             console.log(operand,me);
/*CL_Node.js:61           */         }
/*CL_Node.js:62           */ 
/*CL_Node.js:63           */         return await me.operand[operand.type].call(me,operand,inputParams);
/*CL_Node.js:64           */       }else{
/*CL_Node.js:65           */         return operand;
/*CL_Node.js:66           */       }
/*CL_Node.js:67           */     };
/*CL_Node.js:68           */ 
/*CL_Node.js:69           */   	
/*CL_Node.js:70           */     me.addParamsToObjectWithNames = function(params,paramsNames = [], paramsArray = []){
/*CL_Node.js:71           */       var me = this;
/*CL_Node.js:72           */ 
/*CL_Node.js:73           */       for (let i = 0; i < paramsNames.length; i++){
/*CL_Node.js:74           */         let paramName = paramsNames[i];
/*CL_Node.js:75           */         if (paramsArray[i] !== undefined){
/*CL_Node.js:76           */           params[paramName] = paramsArray[i];
/*CL_Node.js:77           */         }
/*CL_Node.js:78           */         else{
/*CL_Node.js:79           */           console.error("A required parameter '" + paramName + "' in position '" + i + "' has not been served for node ", me);
/*CL_Node.js:80           */         }  
/*CL_Node.js:81           */       }
/*CL_Node.js:82           */       return params;
/*CL_Node.js:83           */     };
/*CL_Node.js:84           */ 
/*CL_Node.js:85           */     me.getParamsArrayFromNamedObject = function(params,paramsNames = []){
/*CL_Node.js:86           */       var me = this;
/*CL_Node.js:87           */       var paramsArray = [];
/*CL_Node.js:88           */ 
/*CL_Node.js:89           */       for (let i = 0; i < paramsNames.length; i++){
/*CL_Node.js:90           */         let paramName = paramsNames[i];
/*CL_Node.js:91           */         if (params[paramName] !== undefined){
/*CL_Node.js:92           */           paramsArray.push(params[paramName]);
/*CL_Node.js:93           */         }
/*CL_Node.js:94           */         else{
/*CL_Node.js:95           */           console.error("A required parameter '" + paramName + "' is not in the params object ", params);
/*CL_Node.js:96           */         } 
/*CL_Node.js:97           */       }
/*CL_Node.js:98           */       return paramsArray;
/*CL_Node.js:99           */     };
/*CL_Node.js:100          */ 
/*CL_Node.js:101          */     me.condition = {
/*CL_Node.js:102          */       "==":    async function (operands,inputParams) {
/*CL_Node.js:103          */         var me = this; 
/*CL_Node.js:104          */         let firstOperand = await me.resolveOperand(operands[0],inputParams);
/*CL_Node.js:105          */         let secondOperand = await me.resolveOperand(operands[1],inputParams);
/*CL_Node.js:106          */         return firstOperand == secondOperand; // jshint ignore:line
/*CL_Node.js:107          */       },
/*CL_Node.js:108          */       "<":     async function (operands,inputParams) {
/*CL_Node.js:109          */         var me = this; 
/*CL_Node.js:110          */         let firstOperand = await me.resolveOperand(operands[0],inputParams);
/*CL_Node.js:111          */         let secondOperand = await me.resolveOperand(operands[1],inputParams);
/*CL_Node.js:112          */         return firstOperand < secondOperand;
/*CL_Node.js:113          */       },
/*CL_Node.js:114          */       "<=":    async function (operands,inputParams) {
/*CL_Node.js:115          */         var me = this; 
/*CL_Node.js:116          */         let firstOperand = await me.resolveOperand(operands[0],inputParams);
/*CL_Node.js:117          */         let secondOperand = await me.resolveOperand(operands[1],inputParams);
/*CL_Node.js:118          */         return firstOperand <= secondOperand;
/*CL_Node.js:119          */       },
/*CL_Node.js:120          */       ">":     async function (operands,inputParams) {
/*CL_Node.js:121          */         var me = this; 
/*CL_Node.js:122          */         let firstOperand = await me.resolveOperand(operands[0],inputParams);
/*CL_Node.js:123          */         let secondOperand = await me.resolveOperand(operands[1],inputParams);
/*CL_Node.js:124          */         return firstOperand > secondOperand;
/*CL_Node.js:125          */       },
/*CL_Node.js:126          */       ">=":    async function (operands,inputParams) {
/*CL_Node.js:127          */         var me = this; 
/*CL_Node.js:128          */         let firstOperand = await me.resolveOperand(operands[0],inputParams);
/*CL_Node.js:129          */         let secondOperand = await me.resolveOperand(operands[1],inputParams);
/*CL_Node.js:130          */         return firstOperand >= secondOperand;
/*CL_Node.js:131          */       },
/*CL_Node.js:132          */     };
/*CL_Node.js:133          */ 
/*CL_Node.js:134          */     me.operation = {
/*CL_Node.js:135          */       "+":    async function (operands,inputParams) {
/*CL_Node.js:136          */         var me = this;
/*CL_Node.js:137          */         let firstOperand = await me.resolveOperand(operands[0],inputParams);
/*CL_Node.js:138          */         let secondOperand = await me.resolveOperand(operands[1],inputParams); 
/*CL_Node.js:139          */         return firstOperand + secondOperand;
/*CL_Node.js:140          */       },
/*CL_Node.js:141          */       "-":    async function (operands,inputParams) {
/*CL_Node.js:142          */         var me = this;
/*CL_Node.js:143          */         let firstOperand = await me.resolveOperand(operands[0],inputParams);
/*CL_Node.js:144          */         let secondOperand = await me.resolveOperand(operands[1],inputParams); 
/*CL_Node.js:145          */         return firstOperand - secondOperand;
/*CL_Node.js:146          */       },
/*CL_Node.js:147          */       "/":    async function (operands,inputParams) {
/*CL_Node.js:148          */         var me = this;
/*CL_Node.js:149          */         let firstOperand = await me.resolveOperand(operands[0],inputParams);
/*CL_Node.js:150          */         let secondOperand = await me.resolveOperand(operands[1],inputParams); 
/*CL_Node.js:151          */         return firstOperand / secondOperand;
/*CL_Node.js:152          */       },
/*CL_Node.js:153          */       "*":    async function (operands,inputParams) {
/*CL_Node.js:154          */         var me = this;
/*CL_Node.js:155          */         let firstOperand = await me.resolveOperand(operands[0],inputParams);
/*CL_Node.js:156          */         let secondOperand = await me.resolveOperand(operands[1],inputParams); 
/*CL_Node.js:157          */         return firstOperand * secondOperand;
/*CL_Node.js:158          */       },
/*CL_Node.js:159          */       "pow":  async function (operands,inputParams) {
/*CL_Node.js:160          */         var me = this;
/*CL_Node.js:161          */         let firstOperand = await me.resolveOperand(operands[0],inputParams);
/*CL_Node.js:162          */         let secondOperand = await me.resolveOperand(operands[1],inputParams); 
/*CL_Node.js:163          */         return Math.pow(firstOperand,secondOperand);
/*CL_Node.js:164          */       },
/*CL_Node.js:165          */     };
/*CL_Node.js:166          */ 
/*CL_Node.js:167          */ 
/*CL_Node.js:168          */    
/*CL_Node.js:169          */     me.operand = { 
/*CL_Node.js:170          */       entityProperty: async function ({entity = "", attribute = ""}) { 
/*CL_Node.js:171          */         var me = this; 
/*CL_Node.js:172          */         return me.game.getEntityByName(entity)[attribute]; 
/*CL_Node.js:173          */       },
/*CL_Node.js:174          */       entityByName: async function ({name = ""}) {
/*CL_Node.js:175          */        var me = this; 
/*CL_Node.js:176          */        return me.game.getEntityByName(name); 
/*CL_Node.js:177          */       },
/*CL_Node.js:178          */       param: async function ({name = "", attribute = ""},params) {
/*CL_Node.js:179          */         var me = this;
/*CL_Node.js:180          */         let attributeChain = attribute !== "" ? attribute.split(".") : [];
/*CL_Node.js:181          */         var currentValue = params[name];
/*CL_Node.js:182          */         for (var indexAttr in attributeChain){
/*CL_Node.js:183          */           currentValue = currentValue[attributeChain[indexAttr]];
/*CL_Node.js:184          */         }
/*CL_Node.js:185          */         return currentValue;
/*CL_Node.js:186          */       },
/*CL_Node.js:187          */       
/*CL_Node.js:188          */       list: async function({list = ""},params){
/*CL_Node.js:189          */         var me = this;
/*CL_Node.js:190          */         let result = [];
/*CL_Node.js:191          */         for (var index in list){
/*CL_Node.js:192          */           result.push(await me.resolveOperand(list[index],params));  // jshint ignore:line
/*CL_Node.js:193          */         }
/*CL_Node.js:194          */         return result;
/*CL_Node.js:195          */       },
/*CL_Node.js:196          */ 
/*CL_Node.js:197          */       game: async function({attribute = ""},params) {
/*CL_Node.js:198          */         var me = this;
/*CL_Node.js:199          */         return await me.resolveOperand({type:"param", name : "game", attribute : attribute},{game:me.game});
/*CL_Node.js:200          */       },
/*CL_Node.js:201          */ 
/*CL_Node.js:202          */       reduce: async function({group = "", comparator = ""},params){
/*CL_Node.js:203          */         var me = this;
/*CL_Node.js:204          */         var groupOfEntities = await me.calculateValue(group,params);
/*CL_Node.js:205          */ 
/*CL_Node.js:206          */         var result = await groupOfEntities.reduce( me.selectOne(comparator));
/*CL_Node.js:207          */         console.log(result.name);
/*CL_Node.js:208          */         return result;
/*CL_Node.js:209          */       },
/*CL_Node.js:210          */ 
/*CL_Node.js:211          */       
/*CL_Node.js:212          */     };
/*CL_Node.js:213          */ 
/*CL_Node.js:214          */     me.selectOne = function (comparator) {
/*CL_Node.js:215          */         var me = this;
/*CL_Node.js:216          */         return async function (entityA, entityB){
/*CL_Node.js:217          */           let comparation =  await me.resolveCondition(comparator,{current:entityA,candidate:entityB} ) ; 
/*CL_Node.js:218          */           if (comparation){
/*CL_Node.js:219          */             return entityA;
/*CL_Node.js:220          */           }else{
/*CL_Node.js:221          */             return entityB;
/*CL_Node.js:222          */           }
/*CL_Node.js:223          */         }; 
/*CL_Node.js:224          */     }; 
/*CL_Node.js:225          */     
/*CL_Node.js:226          */   }
/*CL_Node.js:227          */ });
/*CL_Node.js:228          */ 
/*CL_CreateNode.js:0      */ "use strict";
/*CL_CreateNode.js:1      */ PYC.Describe("CreateNode",{
/*CL_CreateNode.js:2      */   Extends:"Node",
/*CL_CreateNode.js:3      */   attributes:{
/*CL_CreateNode.js:4      */   },
/*CL_CreateNode.js:5      */   builder: function(me,params){   
/*CL_CreateNode.js:6      */   },
/*CL_CreateNode.js:7      */   publ: function(me,params){
/*CL_CreateNode.js:8      */   	me.execute = async function(inputParams){
/*CL_CreateNode.js:9      */       var me = this;
/*CL_CreateNode.js:10     */       var params = {};
/*CL_CreateNode.js:11     */       var newEntityDescription = {};
/*CL_CreateNode.js:12     */       console.log(me.description);
/*CL_CreateNode.js:13     */       me.addParamsToObjectWithNames(params,me.inputNames,inputParams);
/*CL_CreateNode.js:14     */ 
/*CL_CreateNode.js:15     */       for (var attrName in me.attributes){
/*CL_CreateNode.js:16     */         newEntityDescription[attrName] = await me.calculateValue(me.attributes[attrName],params);
/*CL_CreateNode.js:17     */       }
/*CL_CreateNode.js:18     */ 
/*CL_CreateNode.js:19     */       var entity = await me.game.createEntity(newEntityDescription,params);
/*CL_CreateNode.js:20     */ 
/*CL_CreateNode.js:21     */       // if (me.children !== undefined && me.children.length > 0){
/*CL_CreateNode.js:22     */       //   let childrenPramsArray = [...inputParams,entity];
/*CL_CreateNode.js:23     */       //   for (var childrenIndex in me.children){
/*CL_CreateNode.js:24     */       //     let childrenDescription = me.children[childrenIndex];
/*CL_CreateNode.js:25     */       //     let chidren = await me.runCreate(childrenDescription,childrenPramsArray);
/*CL_CreateNode.js:26     */       //   }
/*CL_CreateNode.js:27     */       // }
/*CL_CreateNode.js:28     */ 
/*CL_CreateNode.js:29     */       return [entity];
/*CL_CreateNode.js:30     */     };
/*CL_CreateNode.js:31     */ 
/*CL_CreateNode.js:32     */   }
/*CL_CreateNode.js:33     */ });
/*CL_CreateNode.js:34     */ 
/*CL_FlowNode.js:0        */ "use strict";
/*CL_FlowNode.js:1        */ PYC.Describe("FlowNode",{
/*CL_FlowNode.js:2        */   Extends:"Node",
/*CL_FlowNode.js:3        */   attributes:{
/*CL_FlowNode.js:4        */   },
/*CL_FlowNode.js:5        */   builder: function(me,params){   
/*CL_FlowNode.js:6        */   },
/*CL_FlowNode.js:7        */   publ: function(me,params){
/*CL_FlowNode.js:8        */   	me.execute = async function(inputParams){
/*CL_FlowNode.js:9        */       var me = this;  
/*CL_FlowNode.js:10       */       if (me.callerInfo !== undefined && me.callerInfo.control !== undefined){
/*CL_FlowNode.js:11       */       	me.control = me.callerInfo.control;
/*CL_FlowNode.js:12       */       	return await me.controlStructure[me.control.type].call(me,inputParams);
/*CL_FlowNode.js:13       */       }else{
/*CL_FlowNode.js:14       */       	return await me.singleExecution(inputParams);
/*CL_FlowNode.js:15       */       }
/*CL_FlowNode.js:16       */     };
/*CL_FlowNode.js:17       */ 
/*CL_FlowNode.js:18       */     me.singleExecution = async function(inputParams){
/*CL_FlowNode.js:19       */       var me = this;
/*CL_FlowNode.js:20       */       var params = {};
/*CL_FlowNode.js:21       */ 
/*CL_FlowNode.js:22       */       me.addParamsToObjectWithNames(params,me.inputNames,inputParams);
/*CL_FlowNode.js:23       */    
/*CL_FlowNode.js:24       */       console.group(me.description);
/*CL_FlowNode.js:25       */       for (let nodeIndex in me.nodes){
/*CL_FlowNode.js:26       */         let childNode = me.nodes[nodeIndex];
/*CL_FlowNode.js:27       */         let nodeResult = await me.resolveNode(childNode,me.getParamsArrayFromNamedObject(params,childNode.inputNames));
/*CL_FlowNode.js:28       */         me.addParamsToObjectWithNames(params, childNode.outputNames, nodeResult);
/*CL_FlowNode.js:29       */       }
/*CL_FlowNode.js:30       */       console.groupEnd();
/*CL_FlowNode.js:31       */ 
/*CL_FlowNode.js:32       */       return await me.getParamsArrayFromNamedObject(params,me.outputNames);
/*CL_FlowNode.js:33       */     };
/*CL_FlowNode.js:34       */ 
/*CL_FlowNode.js:35       */     me.controlStructure = {
/*CL_FlowNode.js:36       */       while : async function (  inputParams){
/*CL_FlowNode.js:37       */         var me = this;
/*CL_FlowNode.js:38       */         params = [];
/*CL_FlowNode.js:39       */         let infiniteLoopLock = 0;
/*CL_FlowNode.js:40       */         while (await me.resolveCondition(me.control.condition,inputParams) || infiniteLoopLock > 1000){ // jshint ignore:line
/*CL_FlowNode.js:41       */           let nodeExecution = await me.singleExecution(inputParams);
/*CL_FlowNode.js:42       */           params.push( nodeExecution); 
/*CL_FlowNode.js:43       */           infiniteLoopLock++;
/*CL_FlowNode.js:44       */         }
/*CL_FlowNode.js:45       */         if (infiniteLoopLock > 1000) console.error("infinite loop prevented");
/*CL_FlowNode.js:46       */         return params;
/*CL_FlowNode.js:47       */       },
/*CL_FlowNode.js:48       */ 
/*CL_FlowNode.js:49       */       simultaneous : async function ( inputParams){
/*CL_FlowNode.js:50       */         var me = this;
/*CL_FlowNode.js:51       */         let result;
/*CL_FlowNode.js:52       */         let elements = await me.calculateValue(me.control.nodeSpecificInfo,params); 
/*CL_FlowNode.js:53       */         let simultaneousOperations = [];
/*CL_FlowNode.js:54       */ 
/*CL_FlowNode.js:55       */         console.group("simultaneous flows per element");
/*CL_FlowNode.js:56       */         for (var elementIndex in elements){
/*CL_FlowNode.js:57       */           simultaneousOperations.push( me.singleExecution([elements[elementIndex],...inputParams]));
/*CL_FlowNode.js:58       */         }
/*CL_FlowNode.js:59       */         result = await Promise.all(simultaneousOperations);      
/*CL_FlowNode.js:60       */         console.groupEnd();  
/*CL_FlowNode.js:61       */         return result;
/*CL_FlowNode.js:62       */       },
/*CL_FlowNode.js:63       */ 
/*CL_FlowNode.js:64       */       consecutive : async function (inputParams){
/*CL_FlowNode.js:65       */       	var me = this;
/*CL_FlowNode.js:66       */         let elements = await me.calculateValue(me.control.nodeSpecificInfo,params); 
/*CL_FlowNode.js:67       */         let result = [];
/*CL_FlowNode.js:68       */         
/*CL_FlowNode.js:69       */         if (me.control.initiative !== undefined){
/*CL_FlowNode.js:70       */         	// set a value for every element , then sort.
/*CL_FlowNode.js:71       */         }
/*CL_FlowNode.js:72       */ 
/*CL_FlowNode.js:73       */         console.group("consecutive flows per element");
/*CL_FlowNode.js:74       */         
/*CL_FlowNode.js:75       */         for (var elementIndex in elements){
/*CL_FlowNode.js:76       */           let nodeExecution = await me.singleExecution([elements[elementIndex],...inputParams]);
/*CL_FlowNode.js:77       */           result.push(nodeExecution );
/*CL_FlowNode.js:78       */         }
/*CL_FlowNode.js:79       */         console.groupEnd();  
/*CL_FlowNode.js:80       */         return result;
/*CL_FlowNode.js:81       */       },
/*CL_FlowNode.js:82       */ 
/*CL_FlowNode.js:83       */       
/*CL_FlowNode.js:84       */     };
/*CL_FlowNode.js:85       */ 
/*CL_FlowNode.js:86       */   }
/*CL_FlowNode.js:87       */ });
/*CL_FlowNode.js:88       */ 
/*CL_ModifyNode.js:0      */ "use strict";
/*CL_ModifyNode.js:1      */ PYC.Describe("ModifyNode",{
/*CL_ModifyNode.js:2      */   Extends:"Node",
/*CL_ModifyNode.js:3      */   attributes:{
/*CL_ModifyNode.js:4      */   },
/*CL_ModifyNode.js:5      */   builder: function(me,params){   
/*CL_ModifyNode.js:6      */   },
/*CL_ModifyNode.js:7      */   publ: function(me,params){
/*CL_ModifyNode.js:8      */   	me.execute = async function(inputParams){
/*CL_ModifyNode.js:9      */       var me = this;
/*CL_ModifyNode.js:10     */       var params = {};
/*CL_ModifyNode.js:11     */       me.addParamsToObjectWithNames(params,me.inputNames,inputParams);
/*CL_ModifyNode.js:12     */ 
/*CL_ModifyNode.js:13     */       console.log(me.description);
/*CL_ModifyNode.js:14     */ 
/*CL_ModifyNode.js:15     */       
/*CL_ModifyNode.js:16     */       // TODO when adding a non setted property add it in the getter setter way so it raises events.
/*CL_ModifyNode.js:17     */       
/*CL_ModifyNode.js:18     */       let entity = await me.calculateValue(me.entity,params);
/*CL_ModifyNode.js:19     */       let attibuteName = await me.calculateValue(me.attribute,params);
/*CL_ModifyNode.js:20     */       entity[attibuteName] = await me.calculateValue(me.newValue,params);
/*CL_ModifyNode.js:21     */ 
/*CL_ModifyNode.js:22     */       return [entity[me.attribute]];
/*CL_ModifyNode.js:23     */     };
/*CL_ModifyNode.js:24     */ 
/*CL_ModifyNode.js:25     */   }
/*CL_ModifyNode.js:26     */ });
/*CL_ModifyNode.js:27     */ 
/*CL_PrimitiveNode.js:0   */ "use strict";
/*CL_PrimitiveNode.js:1   */ PYC.Describe("PrimitiveNode",{
/*CL_PrimitiveNode.js:2   */   Extends:"Node",
/*CL_PrimitiveNode.js:3   */   attributes:{
/*CL_PrimitiveNode.js:4   */   },
/*CL_PrimitiveNode.js:5   */   builder: function(me,params){   
/*CL_PrimitiveNode.js:6   */   },
/*CL_PrimitiveNode.js:7   */   publ: function(me,params){
/*CL_PrimitiveNode.js:8   */   	me.execute = async function(inputParams){
/*CL_PrimitiveNode.js:9   */       var me = this;   
/*CL_PrimitiveNode.js:10  */       var params = {};
/*CL_PrimitiveNode.js:11  */       me.addParamsToObjectWithNames(params,me.inputNames,inputParams);
/*CL_PrimitiveNode.js:12  */       let primitive =  await me.calculateValue(me.value,params);
/*CL_PrimitiveNode.js:13  */ 
/*CL_PrimitiveNode.js:14  */       return [primitive];
/*CL_PrimitiveNode.js:15  */     };
/*CL_PrimitiveNode.js:16  */ 
/*CL_PrimitiveNode.js:17  */   }
/*CL_PrimitiveNode.js:18  */ });
/*CL_PrimitiveNode.js:19  */ 
/*CL_SelectorNode.js:0    */ "use strict";
/*CL_SelectorNode.js:1    */ PYC.Describe("SelectorNode",{
/*CL_SelectorNode.js:2    */   Extends:"Node",
/*CL_SelectorNode.js:3    */   attributes:{
/*CL_SelectorNode.js:4    */   },
/*CL_SelectorNode.js:5    */   builder: function(me,params){   
/*CL_SelectorNode.js:6    */   },
/*CL_SelectorNode.js:7    */   publ: function(me,params){
/*CL_SelectorNode.js:8    */   	me.execute = async function(inputParams){
/*CL_SelectorNode.js:9    */       var me = this;   
/*CL_SelectorNode.js:10   */       var params = {};
/*CL_SelectorNode.js:11   */       let fullEntitiesList = [];
/*CL_SelectorNode.js:12   */ 
/*CL_SelectorNode.js:13   */       me.addParamsToObjectWithNames(params,me.inputNames,inputParams);
/*CL_SelectorNode.js:14   */       let entityWhomSelect = await me.calculateValue(me.whoSelect,params);
/*CL_SelectorNode.js:15   */ 
/*CL_SelectorNode.js:16   */       for (var optionsIndex in me.options){
/*CL_SelectorNode.js:17   */         let optionsSpecification = me.options[optionsIndex];
/*CL_SelectorNode.js:18   */         let entitiesList = await me.calculateValue(optionsSpecification.scope,params);
/*CL_SelectorNode.js:19   */         let posibleEntities = await me.reduceEntitiesByRestrictions(entitiesList,optionsSpecification.restrictions,params);
/*CL_SelectorNode.js:20   */         fullEntitiesList = fullEntitiesList.concat(posibleEntities);
/*CL_SelectorNode.js:21   */       }
/*CL_SelectorNode.js:22   */       let selection = await entityWhomSelect.select(fullEntitiesList);
/*CL_SelectorNode.js:23   */       return [selection];
/*CL_SelectorNode.js:24   */       
/*CL_SelectorNode.js:25   */     };
/*CL_SelectorNode.js:26   */ 
/*CL_SelectorNode.js:27   */     me.reduceEntitiesByRestrictions = async function(entitiesList,restrictions,inputParams){
/*CL_SelectorNode.js:28   */         var me = this;
/*CL_SelectorNode.js:29   */         //TODO restrictions
/*CL_SelectorNode.js:30   */         return entitiesList;
/*CL_SelectorNode.js:31   */     };
/*CL_SelectorNode.js:32   */   }
/*CL_SelectorNode.js:33   */ });
/*CL_SelectorNode.js:34   */ 