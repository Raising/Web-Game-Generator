/*
 * web_game_generator 2.0.0
 * Platform to play and create tabletoplike games
 *
 * 
 *
 * Copyright 2017, Ignacio Medina Castillo 
 *
 * Released on: September 22, 2017
*/
/*CL_Client.js:0          */ PYC.Describe('Client',{
/*CL_Client.js:1          */   builder: function(obj,params){
/*CL_Client.js:2          */     obj.loginServerPath = params.loginServerPath || 'http://localhost:5000';
/*CL_Client.js:3          */ 
/*CL_Client.js:4          */     obj.user = PYC.Create('User',{});
/*CL_Client.js:5          */   
/*CL_Client.js:6          */   },
/*CL_Client.js:7          */ 
/*CL_Client.js:8          */   publ: function(obj,params){  
/*CL_Client.js:9          */     obj.startClient = function(){
/*CL_Client.js:10         */       var obj = this;
/*CL_Client.js:11         */       new PromiseChain()
/*CL_Client.js:12         */         .while((sc)=>{
/*CL_Client.js:13         */           return (sc.GS_ConectionInfo[sc.GS_ConectionInfo.length-1] === undefined  || sc.GS_ConectionInfo[sc.GS_ConectionInfo.length-1] === undefined || sc.GS_ConectionInfo[sc.GS_ConectionInfo.length-1].path === undefined );},
/*CL_Client.js:14         */           (sc)=>{
/*CL_Client.js:15         */           return new PromiseChain(sc)
/*CL_Client.js:16         */             .continue((sc)=>{
/*CL_Client.js:17         */               return obj.user.doSelection('LoginSelector');},
/*CL_Client.js:18         */               'LoginInput')
/*CL_Client.js:19         */             .continue((sc)=>{
/*CL_Client.js:20         */               return obj.loginUser(sc.LoginInput);
/*CL_Client.js:21         */             })
/*CL_Client.js:22         */           .end();
/*CL_Client.js:23         */         },'GS_ConectionInfo')
/*CL_Client.js:24         */         .continue((sc)=>{
/*CL_Client.js:25         */           sc.GS_ConectionInfo = sc.GS_ConectionInfo[sc.GS_ConectionInfo.length-1];
/*CL_Client.js:26         */           obj.user.setToken(sc.GS_ConectionInfo.token);
/*CL_Client.js:27         */           obj.gameServerSocket = obj.conectToGameServer(sc.GS_ConectionInfo.path);
/*CL_Client.js:28         */           obj.user.setSocket(obj.gameServerSocket);
/*CL_Client.js:29         */           MainView.setSocket(obj.gameServerSocket);
/*CL_Client.js:30         */           obj.gameServerSocket.emit('clientToServer',{token:obj.user.getToken()});
/*CL_Client.js:31         */         })
/*CL_Client.js:32         */       .end();
/*CL_Client.js:33         */     };
/*CL_Client.js:34         */     obj.loginUser = function(loginData){
/*CL_Client.js:35         */       var obj = this;
/*CL_Client.js:36         */       obj.loginServerSocket = io.connect(obj.loginServerPath);
/*CL_Client.js:37         */      
/*CL_Client.js:38         */       var P1 =  new Promise((resolve,reject)=>{
/*CL_Client.js:39         */          obj.loginServerSocket.loginSucces = resolve;
/*CL_Client.js:40         */       });
/*CL_Client.js:41         */       obj.loginServerSocket.on('gameServerCredentials',(data)=>{
/*CL_Client.js:42         */           obj.loginServerSocket.loginSucces(data);
/*CL_Client.js:43         */       });
/*CL_Client.js:44         */       obj.loginServerSocket.emit('login',loginData);
/*CL_Client.js:45         */       return P1;
/*CL_Client.js:46         */       //socket.emit('login',{User:'Nacho',Password:'1234'});
/*CL_Client.js:47         */     };
/*CL_Client.js:48         */     obj.conectToGameServer = function(serverPath){
/*CL_Client.js:49         */       var obj = this;
/*CL_Client.js:50         */         obj.gameServerSocket = io.connect(serverPath); 
/*CL_Client.js:51         */ 
/*CL_Client.js:52         */         return  obj.gameServerSocket;
/*CL_Client.js:53         */     }; 
/*CL_Client.js:54         */   }
/*CL_Client.js:55         */ });
/*CL_Element.js:0         */ PYC.Describe('Element',{
/*CL_Element.js:1         */   builder: function(obj,params){   
/*CL_Element.js:2         */     obj.game = params.game;
/*CL_Element.js:3         */     obj.owner  = params.owner;
/*CL_Element.js:4         */   },
/*CL_Element.js:5         */   publ: function(obj,params){    
/*CL_Element.js:6         */     
/*CL_Element.js:7         */   }
/*CL_Element.js:8         */ });
/*CL_Element.js:9         */ 
/*CL_ElementView.js:0     */ PYC.Describe('ElementView',{
/*CL_ElementView.js:1     */   builder: function(obj,params){   
/*CL_ElementView.js:2     */     obj.game = params.game;
/*CL_ElementView.js:3     */     obj.owner  = params.owner;
/*CL_ElementView.js:4     */   },
/*CL_ElementView.js:5     */   publ: function(obj,params){    
/*CL_ElementView.js:6     */     obj.getView = function(){
/*CL_ElementView.js:7     */       var obj = this;
/*CL_ElementView.js:8     */       return obj.container;
/*CL_ElementView.js:9     */     };
/*CL_ElementView.js:10    */ 
/*CL_ElementView.js:11    */     obj.renderTo = function(parent){
/*CL_ElementView.js:12    */       var obj = this;
/*CL_ElementView.js:13    */       parent.append(obj.container);
/*CL_ElementView.js:14    */     };
/*CL_ElementView.js:15    */   }
/*CL_ElementView.js:16    */ });
/*CL_ElementView.js:17    */ 
/*CL_Entity.js:0          */ PYC.Describe('Entity',{
/*CL_Entity.js:1          */   attributes:{
/*CL_Entity.js:2          */     "owner": {},
/*CL_Entity.js:3          */     "location":{},
/*CL_Entity.js:4          */     "name":"",
/*CL_Entity.js:5          */     "children":[]
/*CL_Entity.js:6          */   },
/*CL_Entity.js:7          */   builder: function(me,params){   
/*CL_Entity.js:8          */   	me.prepareChildrenManagement();
/*CL_Entity.js:9          */   	me.insertAditionalAttributes(params);
/*CL_Entity.js:10         */     
/*CL_Entity.js:11         */   },
/*CL_Entity.js:12         */   publ: function(me,params){
/*CL_Entity.js:13         */   	me.insertAditionalAttributes = function(params){
/*CL_Entity.js:14         */   		var me = this;
/*CL_Entity.js:15         */ 	  	for (let attr in params){
/*CL_Entity.js:16         */ 	      if( me[attr] !== undefined){
/*CL_Entity.js:17         */ 	      	me[attr] = params[attr];
/*CL_Entity.js:18         */ 	      } else{
/*CL_Entity.js:19         */ 	      	PYC.injectGeterSeterAttribute(me,attr,params[attr]);
/*CL_Entity.js:20         */ 	      }
/*CL_Entity.js:21         */ 	    }
/*CL_Entity.js:22         */   	};
/*CL_Entity.js:23         */ 
/*CL_Entity.js:24         */   	me.prepareChildrenManagement = function(){
/*CL_Entity.js:25         */   		var me = this;
/*CL_Entity.js:26         */   		me.$listenEvent(me,"beforeChange:location","redefineContainedChildren");
/*CL_Entity.js:27         */   	};
/*CL_Entity.js:28         */ 
/*CL_Entity.js:29         */   	me.redefineContainedChildren = async function({newValue = {}}){
/*CL_Entity.js:30         */   		var me = this;
/*CL_Entity.js:31         */   		
/*CL_Entity.js:32         */   		if (me.location.removeChild !== undefined){
/*CL_Entity.js:33         */   			await me.location.removeChild({child:me});
/*CL_Entity.js:34         */   		}
/*CL_Entity.js:35         */   		if (newValue.removeChild !== undefined){
/*CL_Entity.js:36         */   			await newValue.addChild({child:me});
/*CL_Entity.js:37         */   		}
/*CL_Entity.js:38         */   		return true;
/*CL_Entity.js:39         */   	};
/*CL_Entity.js:40         */ 
/*CL_Entity.js:41         */   	me.removeChild = async function({child}){
/*CL_Entity.js:42         */   		var me = this;
/*CL_Entity.js:43         */   		var index = me.children.indexOf(child);
/*CL_Entity.js:44         */ 		return me.children.splice(index, 1);
/*CL_Entity.js:45         */   	};
/*CL_Entity.js:46         */ 
/*CL_Entity.js:47         */   	me.addChild = async function({child}){
/*CL_Entity.js:48         */   		var me = this;
/*CL_Entity.js:49         */   		return me.children.push(child);
/*CL_Entity.js:50         */   	};
/*CL_Entity.js:51         */   	
/*CL_Entity.js:52         */   	me.select = async function(selectableEntities){
/*CL_Entity.js:53         */   		var me = this;
/*CL_Entity.js:54         */   		return new Promise( function(resolve,reject) {
/*CL_Entity.js:55         */   			setTimeout( function() {
/*CL_Entity.js:56         */ 	  			let selectionIndex = Math.floor((Math.random() * selectableEntities.length));
/*CL_Entity.js:57         */ 	  			console.log("La entidad '" + me.name + "' ha seleccionado: " + selectableEntities[selectionIndex].name);
/*CL_Entity.js:58         */   				resolve(selectableEntities[selectionIndex]);
/*CL_Entity.js:59         */   			}, Math.random() * 1500);
/*CL_Entity.js:60         */   		}); 
/*CL_Entity.js:61         */   		
/*CL_Entity.js:62         */   	};
/*CL_Entity.js:63         */   }
/*CL_Entity.js:64         */ });
/*CL_Entity.js:65         */ 
/*CL_Game.js:0            */ "strict mode";
/*CL_Game.js:1            */ PYC.Describe('Game',{
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
/*CL_Game.js:19           */       PYC.Create(me)("FlowNode",Object.assign({game:me},me.nodes.Flow[firstFlowNodeName])).execute();
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
/*CL_Game.js:49           */       let entity = await PYC.Create(me)("Entity",createNode);
/*CL_Game.js:50           */       me.addEntity( entity);
/*CL_Game.js:51           */       return entity;
/*CL_Game.js:52           */     };
/*CL_Game.js:53           */ 
/*CL_Game.js:54           */ 
/*CL_Game.js:55           */     me.addEntity = function (entity){
/*CL_Game.js:56           */       var me = this;
/*CL_Game.js:57           */       me.entitiesId[entity.$Id()] = entity;
/*CL_Game.js:58           */       me.entitiesName[entity.name] = entity;
/*CL_Game.js:59           */     }
/*CL_Game.js:60           */ 
/*CL_Game.js:61           */     me.getEntityByName = function (entityName){
/*CL_Game.js:62           */       var me = this;
/*CL_Game.js:63           */       return me.entitiesName[entityName];
/*CL_Game.js:64           */     };
/*CL_Game.js:65           */   }
/*CL_Game.js:66           */ });
/*CL_GameManager.js:0     */ PYC.Describe('GameManager',{
/*CL_GameManager.js:1     */   builder: function(obj,params){  
/*CL_GameManager.js:2     */     obj.socket = false; 
/*CL_GameManager.js:3     */     obj.gameList = {};
/*CL_GameManager.js:4     */     obj.game = params.game || 'GS_Game';
/*CL_GameManager.js:5     */   },
/*CL_GameManager.js:6     */   publ: function(obj,params){ 
/*CL_GameManager.js:7     */     obj.setGame = function(gameName){
/*CL_GameManager.js:8     */       var obj = this;
/*CL_GameManager.js:9     */       obj.game = obj.gameList[gameName];
/*CL_GameManager.js:10    */     }
/*CL_GameManager.js:11    */ 
/*CL_GameManager.js:12    */     obj.addPlayer = function(user){
/*CL_GameManager.js:13    */       var obj = this;
/*CL_GameManager.js:14    */       var player = PYC.Create('GS_Player',{user:user}); // se pueden crear jugadores de forma asincrona?
/*CL_GameManager.js:15    */       obj.idlePlayers[player.$Id()] = player;
/*CL_GameManager.js:16    */       obj.runMatchMaker();
/*CL_GameManager.js:17    */       
/*CL_GameManager.js:18    */     };
/*CL_GameManager.js:19    */ 
/*CL_GameManager.js:20    */     
/*CL_GameManager.js:21    */   }
/*CL_GameManager.js:22    */ });
/*CL_InteractionManager.j */ PYC.Describe('InteractionManager',{
/*CL_InteractionManager.j */   builder: function(obj,params){
/*CL_InteractionManager.j */     obj.user  = params.user;
/*CL_InteractionManager.j */     obj.selectorList = {};
/*CL_InteractionManager.j */     MainView.setInteractionManager(obj);
/*CL_InteractionManager.j */     //obj.socketOptions = params.socketOptions || {};
/*CL_InteractionManager.j */     
/*CL_InteractionManager.j */   //  PYC.Create('SelectorManager',params.selectorManager,params.selectorManager.accountableClass);
/*CL_InteractionManager.j */ 
/*CL_InteractionManager.j */ 
/*CL_InteractionManager.j */   },
/*CL_InteractionManager.j */   publ: function(obj,params){   
/*CL_InteractionManager.j */     obj.onInteraction = function(input){
/*CL_InteractionManager.j */       var obj = this;
/*CL_InteractionManager.j */       var resolved = false;
/*CL_InteractionManager.j */       for (selectorToken in obj.selectorList){
/*CL_InteractionManager.j */         if (!resolved){
/*CL_InteractionManager.j */           var selector = obj.selectorList[selectorToken];
/*CL_InteractionManager.j */           if (selector.process(input)){
/*CL_InteractionManager.j */             if (selector.done()){
/*CL_InteractionManager.j */               delete obj.selectorList[selectorToken];  
/*CL_InteractionManager.j */             }
/*CL_InteractionManager.j */             return true;
/*CL_InteractionManager.j */           }
/*CL_InteractionManager.j */         }
/*CL_InteractionManager.j */       }
/*CL_InteractionManager.j */     } 
/*CL_InteractionManager.j */      obj.activateSelector = function(selectorType,selectorParams){
/*CL_InteractionManager.j */       var obj = this;
/*CL_InteractionManager.j */       console.log('IM-fun:activateSelector:'+selectorType+' => '+selectorParams);
/*CL_InteractionManager.j */       return new PromiseChain()
/*CL_InteractionManager.j */       .continue((sc)=>{
/*CL_InteractionManager.j */         return PYC.Create('Selector.'+selectorType,selectorParams);
/*CL_InteractionManager.j */       },'selector')
/*CL_InteractionManager.j */       .continue((sc)=>{
/*CL_InteractionManager.j */         sc.selectorToken = sc.selector.getToken();
/*CL_InteractionManager.j */         obj.selectorList[sc.selectorToken] = sc.selector;
/*CL_InteractionManager.j */         return sc.selector.getPromisedResult();
/*CL_InteractionManager.j */       }).end();
/*CL_InteractionManager.j */      
/*CL_InteractionManager.j */     };
/*CL_InteractionManager.j */     
/*CL_InteractionManager.j */   }
/*CL_InteractionManager.j */ });
/*CL_MainView.js:0        */ PYC.Describe('MainView',{
/*CL_MainView.js:1        */   PrototipeSingleton: new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: ()=>{}, create: ()=>{}}),
/*CL_MainView.js:2        */   builder: function(obj,params){   
/*CL_MainView.js:3        */   	obj.interactionManager = null;
/*CL_MainView.js:4        */     obj.elementViewCollections = {}; // <-- maybe a handler?
/*CL_MainView.js:5        */     obj.selfPlayerName = '';
/*CL_MainView.js:6        */   },  
/*CL_MainView.js:7        */   publ: function(obj,params){ 
/*CL_MainView.js:8        */   	obj.setInteractionManager = function(interactionManager){
/*CL_MainView.js:9        */    		var obj = this;
/*CL_MainView.js:10       */    		obj.interactionManager = interactionManager;
/*CL_MainView.js:11       */    	} ;  
/*CL_MainView.js:12       */    	obj.addInput = function(inputName,params){
/*CL_MainView.js:13       */    		var obj = this;
/*CL_MainView.js:14       */    		var inputELement = PYC.Create('VW_Input.'+inputName,params);
/*CL_MainView.js:15       */    		inputELement.onAction((result)=>{
/*CL_MainView.js:16       */    			obj.interactionManager.onInteraction(result);
/*CL_MainView.js:17       */    		});
/*CL_MainView.js:18       */    		inputELement.renderTo($('body'));
/*CL_MainView.js:19       */    	};
/*CL_MainView.js:20       */ 
/*CL_MainView.js:21       */    
/*CL_MainView.js:22       */     obj.setSocket = function(socket){
/*CL_MainView.js:23       */       var obj = this;
/*CL_MainView.js:24       */       console.log('mainView:setSocket');
/*CL_MainView.js:25       */       obj.socket = socket;
/*CL_MainView.js:26       */       obj.setSocketOptions();
/*CL_MainView.js:27       */     };
/*CL_MainView.js:28       */     obj.setSocketOptions = function(){
/*CL_MainView.js:29       */       var obj = this;
/*CL_MainView.js:30       */       console.log('mainView:setSocketOptions');
/*CL_MainView.js:31       */       if (obj.socket === false) {console.error('Trying to modify undefined socket');}
/*CL_MainView.js:32       */       else{
/*CL_MainView.js:33       */        
/*CL_MainView.js:34       */         obj.socket.on('notification',(data)=>{ console.log(data); });
/*CL_MainView.js:35       */         obj.socket.on('notification_playerName',(data)=>{ obj.onPlayerNameNotification(data); });
/*CL_MainView.js:36       */         obj.socket.on('notification_view',(data)=>{obj.onViewNotification(data); });
/*CL_MainView.js:37       */         obj.socket.on('notification_viewCreation',(data)=>{ obj.onCreateView(data);});
/*CL_MainView.js:38       */ 
/*CL_MainView.js:39       */       }
/*CL_MainView.js:40       */     };
/*CL_MainView.js:41       */     obj.onCreateView = function(params){
/*CL_MainView.js:42       */       var obj = this;
/*CL_MainView.js:43       */       var newElement = PYC.Create(params.class,params.params);
/*CL_MainView.js:44       */       newElement.serverReflection = params.object;
/*CL_MainView.js:45       */       if (params.parent) {
/*CL_MainView.js:46       */         newElement.renderTo(obj.elementViewCollections[params.parent]);
/*CL_MainView.js:47       */       }else{
/*CL_MainView.js:48       */         newElement.renderTo($('body')); // <---- this depends on client type
/*CL_MainView.js:49       */       }
/*CL_MainView.js:50       */       obj.elementViewCollections[params.object] = newElement;
/*CL_MainView.js:51       */    };
/*CL_MainView.js:52       */ 
/*CL_MainView.js:53       */     obj.onViewNotification = function(params){
/*CL_MainView.js:54       */       var obj = this;
/*CL_MainView.js:55       */        obj.elementViewCollections[params.object][params.action](params.params);
/*CL_MainView.js:56       */     };
/*CL_MainView.js:57       */ 
/*CL_MainView.js:58       */     obj.onPlayerNameNotification = function(params){
/*CL_MainView.js:59       */       var obj = this;
/*CL_MainView.js:60       */       obj.selfPlayerName = params.playerName;
/*CL_MainView.js:61       */     };
/*CL_MainView.js:62       */ 
/*CL_MainView.js:63       */     obj.isSelfPlayer = function(name){
/*CL_MainView.js:64       */       var obj = this;
/*CL_MainView.js:65       */       return name === obj.selfPlayerName;
/*CL_MainView.js:66       */     };
/*CL_MainView.js:67       */   }
/*CL_MainView.js:68       */ });
/*CL_MainView.js:69       */ 
/*CL_MainView.js:70       */ 
/*CL_MainView.js:71       */ 
/*CL_Node.js:0            */ PYC.Describe('Node',{
/*CL_Node.js:1            */   attributes:{
/*CL_Node.js:2            */     "owner": {},
/*CL_Node.js:3            */   },
/*CL_Node.js:4            */   builder: function(me,params){   
/*CL_Node.js:5            */     Object.assign(me,params);
/*CL_Node.js:6            */   },
/*CL_Node.js:7            */   publ: function(me,params){
/*CL_Node.js:8            */ 
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
/*CL_Node.js:19           */       // Valorar si juntar l node description y el node info puede generar conflicto
/*CL_Node.js:20           */       return PYC.Create(me)(nodeInfo.nodeType + "Node",Object.assign({game:me.game,callerInfo:nodeInfo},nodeDescription)).execute(inputParams);
/*CL_Node.js:21           */ 
/*CL_Node.js:22           */       // if ( nodeInfo.nodeType === "Flow"){
/*CL_Node.js:23           */       //   let control = nodeInfo.control || {type:"continue",condition:{operands: []}}; 
/*CL_Node.js:24           */       //   return me.controlStructure[control.type].call(me,nodeDescription,params,control.condition);
/*CL_Node.js:25           */       // }else{
/*CL_Node.js:26           */       //   return me["run" + nodeInfo.nodeType](nodeDescription,params);
/*CL_Node.js:27           */       // }
/*CL_Node.js:28           */     };
/*CL_Node.js:29           */ 
/*CL_Node.js:30           */ 
/*CL_Node.js:31           */     me.calculateValue = async function(valueDescriptor,inputParams){
/*CL_Node.js:32           */       var me = this;
/*CL_Node.js:33           */       var newValue;
/*CL_Node.js:34           */       if (valueDescriptor.baseValue !== undefined){
/*CL_Node.js:35           */         newValue = await me.resolveOperand(valueDescriptor.baseValue,inputParams);
/*CL_Node.js:36           */         for (var operationIndex in valueDescriptor.operations){
/*CL_Node.js:37           */           let operationDescriptor =  valueDescriptor.operations[operationIndex];
/*CL_Node.js:38           */           
/*CL_Node.js:39           */           newValue = await me.resolveOperation({
/*CL_Node.js:40           */             operator: operationDescriptor.operator,
/*CL_Node.js:41           */             operands: [newValue, ...operationDescriptor.operands]
/*CL_Node.js:42           */           },inputParams);
/*CL_Node.js:43           */         }
/*CL_Node.js:44           */       }
/*CL_Node.js:45           */       else{
/*CL_Node.js:46           */         newValue = await me.resolveOperand(valueDescriptor,inputParams);
/*CL_Node.js:47           */       }
/*CL_Node.js:48           */       return newValue;
/*CL_Node.js:49           */     };
/*CL_Node.js:50           */ 
/*CL_Node.js:51           */ 
/*CL_Node.js:52           */ 
/*CL_Node.js:53           */     me.resolveOperation = async function({operator = "",operands = []},inputParams){
/*CL_Node.js:54           */       var me = this;
/*CL_Node.js:55           */ 
/*CL_Node.js:56           */       return me.operation[operator].call(me,operands,inputParams);
/*CL_Node.js:57           */     };
/*CL_Node.js:58           */ 
/*CL_Node.js:59           */     me.resolveCondition = async function({operator = "",operands = []},inputParams){
/*CL_Node.js:60           */       var me = this;
/*CL_Node.js:61           */ 
/*CL_Node.js:62           */       return me.condition[operator].call(me,operands,inputParams);
/*CL_Node.js:63           */     };
/*CL_Node.js:64           */ 
/*CL_Node.js:65           */     me.resolveOperand = async function(operand,inputParams){
/*CL_Node.js:66           */       var me = this;
/*CL_Node.js:67           */       if ( typeof operand === 'object'){
/*CL_Node.js:68           */         if (me.operand[operand.type] === undefined  ){
/*CL_Node.js:69           */             console.log(operand,me);
/*CL_Node.js:70           */         }
/*CL_Node.js:71           */ 
/*CL_Node.js:72           */         return me.operand[operand.type].call(me,operand,inputParams);
/*CL_Node.js:73           */       }else{
/*CL_Node.js:74           */         return operand;
/*CL_Node.js:75           */       }
/*CL_Node.js:76           */     };
/*CL_Node.js:77           */ 
/*CL_Node.js:78           */   	
/*CL_Node.js:79           */     me.addParamsToObjectWithNames = function(params,paramsNames = [], paramsArray){
/*CL_Node.js:80           */       var me = this;
/*CL_Node.js:81           */ 
/*CL_Node.js:82           */       for (let i = 0; i < paramsNames.length; i++){
/*CL_Node.js:83           */         let paramName = paramsNames[i];
/*CL_Node.js:84           */         if (paramsArray[i] !== undefined){
/*CL_Node.js:85           */           params[paramName] = paramsArray[i];
/*CL_Node.js:86           */         }
/*CL_Node.js:87           */         else{
/*CL_Node.js:88           */           console.error("A required parameter '" + paramName + "' in position '" + i + "' has not been served for node ", me);
/*CL_Node.js:89           */         }  
/*CL_Node.js:90           */       }
/*CL_Node.js:91           */       return params;
/*CL_Node.js:92           */     };
/*CL_Node.js:93           */ 
/*CL_Node.js:94           */     me.getParamsArrayFromNamedObject = function(params,paramsNames = []){
/*CL_Node.js:95           */       var me = this;
/*CL_Node.js:96           */       var paramsArray = [];
/*CL_Node.js:97           */ 
/*CL_Node.js:98           */       for (let i = 0; i < paramsNames.length; i++){
/*CL_Node.js:99           */         let paramName = paramsNames[i];
/*CL_Node.js:100          */         if (params[paramName] !== undefined){
/*CL_Node.js:101          */           paramsArray.push(params[paramName]);
/*CL_Node.js:102          */         }
/*CL_Node.js:103          */         else{
/*CL_Node.js:104          */           console.error("A required parameter '" + paramName + "' is not in the params object ", params);
/*CL_Node.js:105          */         } 
/*CL_Node.js:106          */       }
/*CL_Node.js:107          */       return paramsArray;
/*CL_Node.js:108          */     };
/*CL_Node.js:109          */ 
/*CL_Node.js:110          */     me.condition = {
/*CL_Node.js:111          */       "==":        async function (operands,inputParams) {var me = this; return await me.resolveOperand(operands[0],inputParams) ==  await me.resolveOperand(operands[1],inputParams);},
/*CL_Node.js:112          */       "<":         async function (operands,inputParams) {var me = this; return await me.resolveOperand(operands[0],inputParams) <   await me.resolveOperand(operands[1],inputParams);},
/*CL_Node.js:113          */       "<=":        async function (operands,inputParams) {var me = this; return await me.resolveOperand(operands[0],inputParams) <=  await me.resolveOperand(operands[1],inputParams);},
/*CL_Node.js:114          */       ">":         async function (operands,inputParams) {var me = this; return await me.resolveOperand(operands[0],inputParams) >   await me.resolveOperand(operands[1],inputParams);},
/*CL_Node.js:115          */       ">=":        async function (operands,inputParams) {var me = this; return await me.resolveOperand(operands[0],inputParams) >=  await me.resolveOperand(operands[1],inputParams);},
/*CL_Node.js:116          */     };
/*CL_Node.js:117          */ 
/*CL_Node.js:118          */     me.operation = {
/*CL_Node.js:119          */       "+":        async function (operands,inputParams) {var me = this; return await me.resolveOperand(operands[0],inputParams) +   await me.resolveOperand(operands[1],inputParams);},
/*CL_Node.js:120          */       "-":        async function (operands,inputParams) {var me = this; return await me.resolveOperand(operands[0],inputParams) -   await me.resolveOperand(operands[1],inputParams);},
/*CL_Node.js:121          */       "/":        async function (operands,inputParams) {var me = this; return await me.resolveOperand(operands[0],inputParams) /   await me.resolveOperand(operands[1],inputParams);},
/*CL_Node.js:122          */       "*":        async function (operands,inputParams) {var me = this; return await me.resolveOperand(operands[0],inputParams) *   await me.resolveOperand(operands[1],inputParams);},
/*CL_Node.js:123          */       "pow":      async function (operands,inputParams) {var me = this; return await me.resolveOperand(operands[0],inputParams) **  await me.resolveOperand(operands[1],inputParams);},
/*CL_Node.js:124          */     };
/*CL_Node.js:125          */ 
/*CL_Node.js:126          */ 
/*CL_Node.js:127          */    
/*CL_Node.js:128          */     me.operand = { 
/*CL_Node.js:129          */       entityProperty: async function({entity = "", attribute = ""}) { var me = this; return me.game.getEntityByName(entity)[attribute]; },
/*CL_Node.js:130          */       entityByName: async function({name = ""}) { var me = this; return me.game.getEntityByName(name); },
/*CL_Node.js:131          */       param: async function({name = "", attribute = ""},params) {
/*CL_Node.js:132          */         var me = this;
/*CL_Node.js:133          */         let attributeChain = attribute !== "" ? attribute.split(".") : [];
/*CL_Node.js:134          */         var currentValue = params[name];
/*CL_Node.js:135          */         for (var indexAttr in attributeChain){
/*CL_Node.js:136          */           currentValue = currentValue[attributeChain[indexAttr]];
/*CL_Node.js:137          */         }
/*CL_Node.js:138          */         return currentValue;
/*CL_Node.js:139          */       },
/*CL_Node.js:140          */       
/*CL_Node.js:141          */       list: async function({list = ""},params){
/*CL_Node.js:142          */         var me = this;
/*CL_Node.js:143          */         let result = [];
/*CL_Node.js:144          */         for (var index in list){
/*CL_Node.js:145          */           result.push(await me.resolveOperand(list[index],params));
/*CL_Node.js:146          */         }
/*CL_Node.js:147          */         return result;
/*CL_Node.js:148          */       },
/*CL_Node.js:149          */ 
/*CL_Node.js:150          */       game: async function({attribute = ""},params) {
/*CL_Node.js:151          */         var me = this;
/*CL_Node.js:152          */         return me.resolveOperand({type:"param", name : "game", attribute : attribute},{game:me.game});
/*CL_Node.js:153          */       },
/*CL_Node.js:154          */ 
/*CL_Node.js:155          */       reduce: async function({group = "", comparator = ""},params){
/*CL_Node.js:156          */         var me = this;
/*CL_Node.js:157          */         var groupOfEntities = await me.calculateValue(group,params);
/*CL_Node.js:158          */ 
/*CL_Node.js:159          */         var result = await groupOfEntities.reduce( me.selectOne(comparator));
/*CL_Node.js:160          */         console.log(result.name);
/*CL_Node.js:161          */         return result;
/*CL_Node.js:162          */       },
/*CL_Node.js:163          */ 
/*CL_Node.js:164          */       
/*CL_Node.js:165          */     };
/*CL_Node.js:166          */ 
/*CL_Node.js:167          */     me.selectOne = function (comparator) {
/*CL_Node.js:168          */         var me = this;
/*CL_Node.js:169          */         return async (entityA, entityB) => {
/*CL_Node.js:170          */           let comparation =  await me.resolveCondition(comparator,{current:entityA,candidate:entityB} ) ; 
/*CL_Node.js:171          */           if (comparation){
/*CL_Node.js:172          */             return entityA;
/*CL_Node.js:173          */           }else{
/*CL_Node.js:174          */             return entityB;
/*CL_Node.js:175          */           }
/*CL_Node.js:176          */         }; 
/*CL_Node.js:177          */     }; 
/*CL_Node.js:178          */     
/*CL_Node.js:179          */   }
/*CL_Node.js:180          */ });
/*CL_Node.js:181          */ 
/*CL_Selector.js:0        */ PYC.Describe('Selector',{
/*CL_Selector.js:1        */   builder: function(obj,params){   
/*CL_Selector.js:2        */     obj.resolve  = null;
/*CL_Selector.js:3        */     obj.reject  = null;
/*CL_Selector.js:4        */     obj.end  =  false;
/*CL_Selector.js:5        */     obj.options = params.options;
/*CL_Selector.js:6        */   },
/*CL_Selector.js:7        */   publ: function(obj,params){    
/*CL_Selector.js:8        */     obj.process = function(result){
/*CL_Selector.js:9        */       var obj = this;
/*CL_Selector.js:10       */       console.log('resolveSelector:'+result);
/*CL_Selector.js:11       */       if (obj.validate(result)){   
/*CL_Selector.js:12       */         obj.end = true;
/*CL_Selector.js:13       */         obj.resolve(result);
/*CL_Selector.js:14       */         return true;
/*CL_Selector.js:15       */       }else{
/*CL_Selector.js:16       */         return false;
/*CL_Selector.js:17       */       }
/*CL_Selector.js:18       */     };
/*CL_Selector.js:19       */     obj.done = function(){
/*CL_Selector.js:20       */       var obj = this;
/*CL_Selector.js:21       */       return obj.end ;
/*CL_Selector.js:22       */     };
/*CL_Selector.js:23       */     obj.validate = function(result){
/*CL_Selector.js:24       */       var obj = this;
/*CL_Selector.js:25       */       return true; // Para el selector generico todo vale
/*CL_Selector.js:26       */     };
/*CL_Selector.js:27       */     obj.getPromisedResult = function(){
/*CL_Selector.js:28       */       var obj = this;
/*CL_Selector.js:29       */       return new Promise((resolve,reject)=>{
/*CL_Selector.js:30       */         obj.resolve = resolve;
/*CL_Selector.js:31       */         obj.reject  = reject;
/*CL_Selector.js:32       */       });
/*CL_Selector.js:33       */     };
/*CL_Selector.js:34       */ 
/*CL_Selector.js:35       */     obj.getToken = function(){
/*CL_Selector.js:36       */       var obj = this;
/*CL_Selector.js:37       */       obj.token = obj.$Id();
/*CL_Selector.js:38       */       return obj.token;
/*CL_Selector.js:39       */     };
/*CL_Selector.js:40       */   }
/*CL_Selector.js:41       */ });
/*CL_Selector.js:42       */ 
/*CL_User.js:0            */ PYC.Describe('User',{
/*CL_User.js:1            */   builder: function(obj,params){
/*CL_User.js:2            */     obj.socket  = false;
/*CL_User.js:3            */     obj.token  = params.token;
/*CL_User.js:4            */     params.interactorManager = params.interactorManager === undefined ? {} : params.interactorManager;
/*CL_User.js:5            */     params.interactorManager.user = obj;
/*CL_User.js:6            */     //obj.socketOptions = params.socketOptions || {};
/*CL_User.js:7            */     obj.interactorManager = PYC.Create('InteractionManager',params.interactorManager);
/*CL_User.js:8            */   //PYC.Create('SelectorManager',params.selectorManager,params.selectorManager.accountableClass);
/*CL_User.js:9            */     nacho = obj.interactorManager;
/*CL_User.js:10           */ 
/*CL_User.js:11           */   },
/*CL_User.js:12           */   publ: function(obj,params){    
/*CL_User.js:13           */     obj.setSocket = function(socket){
/*CL_User.js:14           */       var obj = this;
/*CL_User.js:15           */       console.log('ufun:setSocket');
/*CL_User.js:16           */       obj.socket = socket;
/*CL_User.js:17           */       obj.setSocketOptions();
/*CL_User.js:18           */     };
/*CL_User.js:19           */     obj.setSocketOptions = function(){
/*CL_User.js:20           */       var obj = this;
/*CL_User.js:21           */       console.log('ufun:setSocketOptions');
/*CL_User.js:22           */       obj.socket.on('doSelection', function(data) {  
/*CL_User.js:23           */         console.log('doSelection',data);
/*CL_User.js:24           */         
/*CL_User.js:25           */         obj.interactorManager.activateSelector(data.type,data.params)
/*CL_User.js:26           */         .then((result)=>{
/*CL_User.js:27           */           obj.socket.emit('selector',{selectorToken:data.selectorToken,result:result});
/*CL_User.js:28           */         });
/*CL_User.js:29           */         /*
/*CL_User.js:30           */         var option = 0;
/*CL_User.js:31           */         if (data.type === 'GS_Selector.RockPaperScissors') option = Math.floor(Math.random()*3);
/*CL_User.js:32           */        
/*CL_User.js:33           */ 
/*CL_User.js:34           */         obj.socket.emit('selector',{selectorToken:data.selectorToken,result:data.params.options[option]});*/
/*CL_User.js:35           */       });
/*CL_User.js:36           */     };
/*CL_User.js:37           */ 
/*CL_User.js:38           */     obj.doSelection = function(selectorType,selectorParams){
/*CL_User.js:39           */       var obj = this;
/*CL_User.js:40           */       return obj.interactorManager.activateSelector(selectorType,selectorParams);
/*CL_User.js:41           */       //return {user:"Nacho",password:"1234"};
/*CL_User.js:42           */     };
/*CL_User.js:43           */ 
/*CL_User.js:44           */     obj.setToken = function(token){
/*CL_User.js:45           */       obj.token = token;
/*CL_User.js:46           */     }
/*CL_User.js:47           */ 
/*CL_User.js:48           */     obj.getToken = function(){
/*CL_User.js:49           */       return obj.token;
/*CL_User.js:50           */     }
/*CL_User.js:51           */   }
/*CL_User.js:52           */ });
/*CL_ElementView.ScoreBoa */ PYC.Describe('ElementView.ScoreBoard',{
/*CL_ElementView.ScoreBoa */   Extends:'ElementView',
/*CL_ElementView.ScoreBoa */   builder: function(obj,params){  
/*CL_ElementView.ScoreBoa */    
/*CL_ElementView.ScoreBoa */     obj.scoreSlots = {};
/*CL_ElementView.ScoreBoa */     obj.container = $('<div style="position:absolute;left:5%;width:250px;padding:25px;border-radius:10px;top:20px;text-align:right;background-color:grey;" class="" id=""></div>');
/*CL_ElementView.ScoreBoa */    
/*CL_ElementView.ScoreBoa */   },
/*CL_ElementView.ScoreBoa */   publ: function(obj,params){
/*CL_ElementView.ScoreBoa */   	obj.init = function(params){
/*CL_ElementView.ScoreBoa */   	   var obj = this;
/*CL_ElementView.ScoreBoa */   	   
/*CL_ElementView.ScoreBoa */   	};    
/*CL_ElementView.ScoreBoa */     obj.addScoreSlot = function(params){
/*CL_ElementView.ScoreBoa */       var obj = this;
/*CL_ElementView.ScoreBoa */       if (obj.scoreSlots[params.scoreSlotName] !== undefined){
/*CL_ElementView.ScoreBoa */       	 obj.scoreSlots[params.scoreSlotName].remove();
/*CL_ElementView.ScoreBoa */       }
/*CL_ElementView.ScoreBoa */ 
/*CL_ElementView.ScoreBoa */       obj.scoreSlots[params.scoreSlotName] = $('<div style="float:left;height:50px;width:50px;border-radius:4px;background-color:white;" class="" id="">'+(params.value || 0)+'</div>');
/*CL_ElementView.ScoreBoa */   	  obj.container.append(obj.scoreSlots[params.scoreSlotName]);
/*CL_ElementView.ScoreBoa */ 
/*CL_ElementView.ScoreBoa */     };
/*CL_ElementView.ScoreBoa */    
/*CL_ElementView.ScoreBoa */   }
/*CL_ElementView.ScoreBoa */ });
/*CL_ElementView.ScoreBoa */ 
/*CL_CreateNode.js:0      */ PYC.Describe('CreateNode',{
/*CL_CreateNode.js:1      */   Extends:'Node',
/*CL_CreateNode.js:2      */   attributes:{
/*CL_CreateNode.js:3      */   },
/*CL_CreateNode.js:4      */   builder: function(me,params){   
/*CL_CreateNode.js:5      */   },
/*CL_CreateNode.js:6      */   publ: function(me,params){
/*CL_CreateNode.js:7      */   	me.execute = async function(inputParams){
/*CL_CreateNode.js:8      */       var me = this;
/*CL_CreateNode.js:9      */       var params = {};
/*CL_CreateNode.js:10     */       var newEntityDescription = {};
/*CL_CreateNode.js:11     */       console.log(me.description);
/*CL_CreateNode.js:12     */       me.addParamsToObjectWithNames(params,me.inputNames,inputParams);
/*CL_CreateNode.js:13     */ 
/*CL_CreateNode.js:14     */       for (var attrName in me.attributes){
/*CL_CreateNode.js:15     */         newEntityDescription[attrName] = await me.calculateValue(me.attributes[attrName],params);
/*CL_CreateNode.js:16     */       }
/*CL_CreateNode.js:17     */ 
/*CL_CreateNode.js:18     */       var entity = await me.game.createEntity(newEntityDescription,params);
/*CL_CreateNode.js:19     */ 
/*CL_CreateNode.js:20     */       // if (me.children !== undefined && me.children.length > 0){
/*CL_CreateNode.js:21     */       //   let childrenPramsArray = [...inputParams,entity];
/*CL_CreateNode.js:22     */       //   for (var childrenIndex in me.children){
/*CL_CreateNode.js:23     */       //     let childrenDescription = me.children[childrenIndex];
/*CL_CreateNode.js:24     */       //     let chidren = await me.runCreate(childrenDescription,childrenPramsArray);
/*CL_CreateNode.js:25     */       //   }
/*CL_CreateNode.js:26     */       // }
/*CL_CreateNode.js:27     */ 
/*CL_CreateNode.js:28     */       return [entity];
/*CL_CreateNode.js:29     */     };
/*CL_CreateNode.js:30     */ 
/*CL_CreateNode.js:31     */   }
/*CL_CreateNode.js:32     */ });
/*CL_CreateNode.js:33     */ 
/*CL_FlowNode.js:0        */ PYC.Describe('FlowNode',{
/*CL_FlowNode.js:1        */   Extends:'Node',
/*CL_FlowNode.js:2        */   attributes:{
/*CL_FlowNode.js:3        */   },
/*CL_FlowNode.js:4        */   builder: function(me,params){   
/*CL_FlowNode.js:5        */   },
/*CL_FlowNode.js:6        */   publ: function(me,params){
/*CL_FlowNode.js:7        */   	me.execute = async function(inputParams){
/*CL_FlowNode.js:8        */       var me = this;  
/*CL_FlowNode.js:9        */       if (me.callerInfo !== undefined && me.callerInfo.control !== undefined){
/*CL_FlowNode.js:10       */       	me.control = me.callerInfo.control;
/*CL_FlowNode.js:11       */       	return me.controlStructure[me.control.type].call(me,inputParams);
/*CL_FlowNode.js:12       */       }else{
/*CL_FlowNode.js:13       */       	return me.singleExecution(inputParams);
/*CL_FlowNode.js:14       */       }
/*CL_FlowNode.js:15       */     };
/*CL_FlowNode.js:16       */ 
/*CL_FlowNode.js:17       */     me.singleExecution = async function(inputParams){
/*CL_FlowNode.js:18       */       var me = this;
/*CL_FlowNode.js:19       */       var params = {};
/*CL_FlowNode.js:20       */ 
/*CL_FlowNode.js:21       */       me.addParamsToObjectWithNames(params,me.inputNames,inputParams);
/*CL_FlowNode.js:22       */    
/*CL_FlowNode.js:23       */       console.group(me.description);
/*CL_FlowNode.js:24       */       for (let nodeIndex in me.nodes){
/*CL_FlowNode.js:25       */         let childNode = me.nodes[nodeIndex];
/*CL_FlowNode.js:26       */         let nodeResult = await me.resolveNode(childNode,me.getParamsArrayFromNamedObject(params,childNode.inputNames));
/*CL_FlowNode.js:27       */         me.addParamsToObjectWithNames(params, childNode.outputNames, nodeResult);
/*CL_FlowNode.js:28       */       }
/*CL_FlowNode.js:29       */       console.groupEnd();
/*CL_FlowNode.js:30       */ 
/*CL_FlowNode.js:31       */       return me.getParamsArrayFromNamedObject(params,me.outputNames);
/*CL_FlowNode.js:32       */     }
/*CL_FlowNode.js:33       */ 
/*CL_FlowNode.js:34       */     me.controlStructure = {
/*CL_FlowNode.js:35       */       while : async function (  inputParams){
/*CL_FlowNode.js:36       */         var me = this;
/*CL_FlowNode.js:37       */         params = [];
/*CL_FlowNode.js:38       */         let infiniteLoopLock = 0;
/*CL_FlowNode.js:39       */         while (await me.resolveCondition(me.control.condition,inputParams) || infiniteLoopLock > 1000){
/*CL_FlowNode.js:40       */           params.push( await me.singleExecution(inputParams));
/*CL_FlowNode.js:41       */           infiniteLoopLock++;
/*CL_FlowNode.js:42       */         }
/*CL_FlowNode.js:43       */         if (infiniteLoopLock > 1000) console.error("infinite loop prevented");
/*CL_FlowNode.js:44       */         return params;
/*CL_FlowNode.js:45       */       },
/*CL_FlowNode.js:46       */ 
/*CL_FlowNode.js:47       */       simultaneous : async function ( inputParams){
/*CL_FlowNode.js:48       */         var me = this;
/*CL_FlowNode.js:49       */         results = [];
/*CL_FlowNode.js:50       */         let elements = await me.calculateValue(me.control.nodeSpecificInfo,params); 
/*CL_FlowNode.js:51       */         let simultaneousOperations = [];
/*CL_FlowNode.js:52       */ 
/*CL_FlowNode.js:53       */         console.group("simultaneous flows per element");
/*CL_FlowNode.js:54       */         for (var elementIndex in elements){
/*CL_FlowNode.js:55       */           simultaneousOperations.push( me.singleExecution([elements[elementIndex],...inputParams]));
/*CL_FlowNode.js:56       */         }
/*CL_FlowNode.js:57       */         let result = await Promise.all(simultaneousOperations);      
/*CL_FlowNode.js:58       */         console.groupEnd();  
/*CL_FlowNode.js:59       */         return result;
/*CL_FlowNode.js:60       */       },
/*CL_FlowNode.js:61       */ 
/*CL_FlowNode.js:62       */       consecutive : async function (inputParams){
/*CL_FlowNode.js:63       */       	var me = this;
/*CL_FlowNode.js:64       */         results = [];
/*CL_FlowNode.js:65       */         let elements = await me.calculateValue(me.control.nodeSpecificInfo,params); 
/*CL_FlowNode.js:66       */         let result = [];
/*CL_FlowNode.js:67       */         
/*CL_FlowNode.js:68       */         if (me.control.initiative !== undefined){
/*CL_FlowNode.js:69       */         	// set a value for every element , then sort.
/*CL_FlowNode.js:70       */         }
/*CL_FlowNode.js:71       */ 
/*CL_FlowNode.js:72       */         console.group("consecutive flows per element");
/*CL_FlowNode.js:73       */         
/*CL_FlowNode.js:74       */         for (var elementIndex in elements){
/*CL_FlowNode.js:75       */           result.push( await me.singleExecution([elements[elementIndex],...inputParams]));
/*CL_FlowNode.js:76       */         }
/*CL_FlowNode.js:77       */         console.groupEnd();  
/*CL_FlowNode.js:78       */         return result;
/*CL_FlowNode.js:79       */       },
/*CL_FlowNode.js:80       */ 
/*CL_FlowNode.js:81       */       
/*CL_FlowNode.js:82       */     };
/*CL_FlowNode.js:83       */ 
/*CL_FlowNode.js:84       */   }
/*CL_FlowNode.js:85       */ });
/*CL_FlowNode.js:86       */ 
/*CL_ModifyNode.js:0      */ PYC.Describe('ModifyNode',{
/*CL_ModifyNode.js:1      */   Extends:'Node',
/*CL_ModifyNode.js:2      */   attributes:{
/*CL_ModifyNode.js:3      */   },
/*CL_ModifyNode.js:4      */   builder: function(me,params){   
/*CL_ModifyNode.js:5      */   },
/*CL_ModifyNode.js:6      */   publ: function(me,params){
/*CL_ModifyNode.js:7      */   	me.execute = async function(inputParams){
/*CL_ModifyNode.js:8      */       var me = this;
/*CL_ModifyNode.js:9      */       var params = {};
/*CL_ModifyNode.js:10     */       me.addParamsToObjectWithNames(params,me.inputNames,inputParams);
/*CL_ModifyNode.js:11     */ 
/*CL_ModifyNode.js:12     */       console.log(me.description);
/*CL_ModifyNode.js:13     */ 
/*CL_ModifyNode.js:14     */       /*
/*CL_ModifyNode.js:15     */       TODO when adding a non setted property add it in the getter setter way so it raises events.
/*CL_ModifyNode.js:16     */       */
/*CL_ModifyNode.js:17     */       let entity = await me.calculateValue(me.entity,params);
/*CL_ModifyNode.js:18     */       let attibuteName = await me.calculateValue(me.attribute,params);
/*CL_ModifyNode.js:19     */       entity[attibuteName] = await me.calculateValue(me.newValue,params);
/*CL_ModifyNode.js:20     */ 
/*CL_ModifyNode.js:21     */       return [entity[me.attribute]];
/*CL_ModifyNode.js:22     */     };
/*CL_ModifyNode.js:23     */ 
/*CL_ModifyNode.js:24     */   }
/*CL_ModifyNode.js:25     */ });
/*CL_ModifyNode.js:26     */ 
/*CL_PrimitiveNode.js:0   */ PYC.Describe('PrimitiveNode',{
/*CL_PrimitiveNode.js:1   */   Extends:'Node',
/*CL_PrimitiveNode.js:2   */   attributes:{
/*CL_PrimitiveNode.js:3   */   },
/*CL_PrimitiveNode.js:4   */   builder: function(me,params){   
/*CL_PrimitiveNode.js:5   */   },
/*CL_PrimitiveNode.js:6   */   publ: function(me,params){
/*CL_PrimitiveNode.js:7   */   	me.execute = async function(inputParams){
/*CL_PrimitiveNode.js:8   */       var me = this;   
/*CL_PrimitiveNode.js:9   */       var params = {};
/*CL_PrimitiveNode.js:10  */       me.addParamsToObjectWithNames(params,me.inputNames,inputParams);
/*CL_PrimitiveNode.js:11  */       let primitive =  await me.calculateValue(me.value,params);
/*CL_PrimitiveNode.js:12  */ 
/*CL_PrimitiveNode.js:13  */       return [primitive];
/*CL_PrimitiveNode.js:14  */     };
/*CL_PrimitiveNode.js:15  */ 
/*CL_PrimitiveNode.js:16  */   }
/*CL_PrimitiveNode.js:17  */ });
/*CL_PrimitiveNode.js:18  */ 
/*CL_SelectorNode.js:0    */ PYC.Describe('SelectorNode',{
/*CL_SelectorNode.js:1    */   Extends:'Node',
/*CL_SelectorNode.js:2    */   attributes:{
/*CL_SelectorNode.js:3    */   },
/*CL_SelectorNode.js:4    */   builder: function(me,params){   
/*CL_SelectorNode.js:5    */   },
/*CL_SelectorNode.js:6    */   publ: function(me,params){
/*CL_SelectorNode.js:7    */   	me.execute = async function(inputParams){
/*CL_SelectorNode.js:8    */       var me = this;   
/*CL_SelectorNode.js:9    */       var params = {};
/*CL_SelectorNode.js:10   */       let fullEntitiesList = [];
/*CL_SelectorNode.js:11   */ 
/*CL_SelectorNode.js:12   */       me.addParamsToObjectWithNames(params,me.inputNames,inputParams);
/*CL_SelectorNode.js:13   */       let entityWhomSelect = await me.calculateValue(me.whoSelect,params);
/*CL_SelectorNode.js:14   */ 
/*CL_SelectorNode.js:15   */       for (var optionsIndex in me.options){
/*CL_SelectorNode.js:16   */         let optionsSpecification = me.options[optionsIndex];
/*CL_SelectorNode.js:17   */         let entitiesList = await me.calculateValue(optionsSpecification.scope,params);
/*CL_SelectorNode.js:18   */         let posibleEntities = await me.reduceEntitiesByRestrictions(entitiesList,optionsSpecification.restrictions,params);
/*CL_SelectorNode.js:19   */         fullEntitiesList = fullEntitiesList.concat(posibleEntities);
/*CL_SelectorNode.js:20   */       }
/*CL_SelectorNode.js:21   */       let selection = await entityWhomSelect.select(fullEntitiesList);
/*CL_SelectorNode.js:22   */       return [selection];
/*CL_SelectorNode.js:23   */       
/*CL_SelectorNode.js:24   */     };
/*CL_SelectorNode.js:25   */ 
/*CL_SelectorNode.js:26   */     me.reduceEntitiesByRestrictions = async function(entitiesList,restrictions,inputParams){
/*CL_SelectorNode.js:27   */         var me = this;
/*CL_SelectorNode.js:28   */         //TODO restrictions
/*CL_SelectorNode.js:29   */         return entitiesList;
/*CL_SelectorNode.js:30   */     };
/*CL_SelectorNode.js:31   */   }
/*CL_SelectorNode.js:32   */ });
/*CL_SelectorNode.js:33   */ 
/*CL_Selector.LoginSelect */ PYC.Describe('Selector.LoginSelector',{
/*CL_Selector.LoginSelect */   Extends:'Selector',
/*CL_Selector.LoginSelect */   builder: function(obj,params){   
/*CL_Selector.LoginSelect */   	obj.view = PYC.Create('Selector.LoginSelectorView',{});
/*CL_Selector.LoginSelect */   },
/*CL_Selector.LoginSelect */   publ: function(obj,params){    
/*CL_Selector.LoginSelect */    	obj.getPromisedResult = function(){
/*CL_Selector.LoginSelect */       var obj = this;
/*CL_Selector.LoginSelect */       obj.view.readyInput();
/*CL_Selector.LoginSelect */       return new Promise((resolve,reject)=>{
/*CL_Selector.LoginSelect */         obj.resolve = resolve;
/*CL_Selector.LoginSelect */         obj.reject  = reject;
/*CL_Selector.LoginSelect */       });
/*CL_Selector.LoginSelect */     };
/*CL_Selector.LoginSelect */     obj.validate = function(result){
/*CL_Selector.LoginSelect */       var obj = this;
/*CL_Selector.LoginSelect */       try{
/*CL_Selector.LoginSelect */         if (result.User !== undefined  && result.Password !== undefined){
/*CL_Selector.LoginSelect */           return true;
/*CL_Selector.LoginSelect */         }
/*CL_Selector.LoginSelect */       }catch (error){
/*CL_Selector.LoginSelect */         return false;
/*CL_Selector.LoginSelect */       }
/*CL_Selector.LoginSelect */       return false;
/*CL_Selector.LoginSelect */     };
/*CL_Selector.LoginSelect */    
/*CL_Selector.LoginSelect */   }
/*CL_Selector.LoginSelect */ });
/*CL_Selector.LoginSelect */ 
/*CL_Selector.LoginSelect */ 
/*CL_Selector.LoginSelect */ PYC.Describe('Selector.LoginSelectorView',{
/*CL_Selector.LoginSelect */   builder: function(obj,params){   
/*CL_Selector.LoginSelect */   	
/*CL_Selector.LoginSelect */   },
/*CL_Selector.LoginSelect */   publ: function(obj,params){    
/*CL_Selector.LoginSelect */     
/*CL_Selector.LoginSelect */    	obj.readyInput = function(){
/*CL_Selector.LoginSelect */       var obj = this;
/*CL_Selector.LoginSelect */      
/*CL_Selector.LoginSelect */       MainView.addInput('Form',{
/*CL_Selector.LoginSelect */         fields:[
/*CL_Selector.LoginSelect */           {key:'User',title:'User',type:'text'},
/*CL_Selector.LoginSelect */           {key:'Password',title:'Password',type:'Password'},
/*CL_Selector.LoginSelect */         ],
/*CL_Selector.LoginSelect */         buttons:['ok']
/*CL_Selector.LoginSelect */       });
/*CL_Selector.LoginSelect */ 
/*CL_Selector.LoginSelect */     }
/*CL_Selector.LoginSelect */   }
/*CL_Selector.LoginSelect */ });
/*CL_Selector.LoginSelect */ 
/*CL_Selector.LoginSelect */ 
/*CL_Selector.LoginSelect */ 
/*CL_Selector.SimplePopUp */ PYC.Describe('Selector.SimplePopUpSelector',{
/*CL_Selector.SimplePopUp */   Extends:'Selector',
/*CL_Selector.SimplePopUp */   builder: function(obj,params){   
/*CL_Selector.SimplePopUp */   	obj.view = PYC.Create('Selector.SimplePopUpSelectorView',{});
/*CL_Selector.SimplePopUp */   },
/*CL_Selector.SimplePopUp */   publ: function(obj,params){    
/*CL_Selector.SimplePopUp */      obj.getPromisedResult = function(){
/*CL_Selector.SimplePopUp */       var obj = this;
/*CL_Selector.SimplePopUp */       obj.view.readyInput(obj.options);
/*CL_Selector.SimplePopUp */       return new Promise((resolve,reject)=>{
/*CL_Selector.SimplePopUp */         obj.resolve = resolve;
/*CL_Selector.SimplePopUp */         obj.reject  = reject;
/*CL_Selector.SimplePopUp */       });
/*CL_Selector.SimplePopUp */     };
/*CL_Selector.SimplePopUp */ 
/*CL_Selector.SimplePopUp */     obj.validate = function(result){
/*CL_Selector.SimplePopUp */       var obj = this;
/*CL_Selector.SimplePopUp */       try{
/*CL_Selector.SimplePopUp */         if (obj.options.indexOf(result) >= 0){
/*CL_Selector.SimplePopUp */           return true;
/*CL_Selector.SimplePopUp */         }
/*CL_Selector.SimplePopUp */       }catch (error){
/*CL_Selector.SimplePopUp */         return false;
/*CL_Selector.SimplePopUp */       }
/*CL_Selector.SimplePopUp */       return false;
/*CL_Selector.SimplePopUp */     };
/*CL_Selector.SimplePopUp */ 
/*CL_Selector.SimplePopUp */    
/*CL_Selector.SimplePopUp */   }
/*CL_Selector.SimplePopUp */ });
/*CL_Selector.SimplePopUp */ 
/*CL_Selector.SimplePopUp */ 
/*CL_Selector.SimplePopUp */ PYC.Describe('Selector.SimplePopUpSelectorView',{
/*CL_Selector.SimplePopUp */   builder: function(obj,params){   
/*CL_Selector.SimplePopUp */   	 obj.options = [];
/*CL_Selector.SimplePopUp */   },
/*CL_Selector.SimplePopUp */   publ: function(obj,params){    
/*CL_Selector.SimplePopUp */     
/*CL_Selector.SimplePopUp */    	obj.readyInput = function(options){
/*CL_Selector.SimplePopUp */       var obj = this;
/*CL_Selector.SimplePopUp */      
/*CL_Selector.SimplePopUp */       for (optionIndex in options){
/*CL_Selector.SimplePopUp */       	var option = options[optionIndex];
/*CL_Selector.SimplePopUp */       	obj.options.push({key:option,title:option});
/*CL_Selector.SimplePopUp */       }
/*CL_Selector.SimplePopUp */       MainView.addInput('SimpleSelection',{
/*CL_Selector.SimplePopUp */         options:obj.options
/*CL_Selector.SimplePopUp */       });
/*CL_Selector.SimplePopUp */ 
/*CL_Selector.SimplePopUp */     }
/*CL_Selector.SimplePopUp */   }
/*CL_Selector.SimplePopUp */ });
/*CL_Selector.SimplePopUp */ 
/*CL_Selector.SimplePopUp */ 
/*CL_Selector.SimplePopUp */ 
/*CL_Selector.GameSelecto */ PYC.Describe('Selector.GameSelector',{
/*CL_Selector.GameSelecto */   Extends:'Selector.SimplePopUpSelector',
/*CL_Selector.GameSelecto */   builder: function(obj,params){   
/*CL_Selector.GameSelecto */   },
/*CL_Selector.GameSelecto */   publ: function(obj,params){     
/*CL_Selector.GameSelecto */   }
/*CL_Selector.GameSelecto */ });
/*CL_Selector.GameSelecto */ 
/*CL_Selector.GameSelecto */ 
/*CL_Selector.RockPaperSc */ PYC.Describe('Selector.RockPaperScissors',{
/*CL_Selector.RockPaperSc */   Extends:'Selector.SimplePopUpSelector',
/*CL_Selector.RockPaperSc */   builder: function(obj,params){   
/*CL_Selector.RockPaperSc */   },
/*CL_Selector.RockPaperSc */   publ: function(obj,params){ 
/*CL_Selector.RockPaperSc */   }
/*CL_Selector.RockPaperSc */ });
/*CL_Selector.RockPaperSc */ 
/*CL_Selector.RockPaperSc */ 
/*BaseTemplates.js:0      */ PYC.Describe.Template('SimpleDiv' ,{
/*BaseTemplates.js:1      */ 
/*BaseTemplates.js:2      */   builder: function(params){
/*BaseTemplates.js:3      */     var stringDescriptor = '<div ';
/*BaseTemplates.js:4      */     
/*BaseTemplates.js:5      */     if (params.style !== undefined){
/*BaseTemplates.js:6      */       stringDescriptor += ' style="';
/*BaseTemplates.js:7      */       for (var atribute in params.style){
/*BaseTemplates.js:8      */         stringDescriptor += atribute + ' : ' + params.style[atribute] + ';';
/*BaseTemplates.js:9      */       }
/*BaseTemplates.js:10     */       stringDescriptor += '"';
/*BaseTemplates.js:11     */     }
/*BaseTemplates.js:12     */     
/*BaseTemplates.js:13     */     if (params.classes !== undefined){
/*BaseTemplates.js:14     */       stringDescriptor += ' class="'+ params.classes +'" ';
/*BaseTemplates.js:15     */     }
/*BaseTemplates.js:16     */ 
/*BaseTemplates.js:17     */     if (params.id !== undefined){
/*BaseTemplates.js:18     */       stringDescriptor += ' id="'+ params.id +'" ';
/*BaseTemplates.js:19     */     } 
/*BaseTemplates.js:20     */     
/*BaseTemplates.js:21     */     stringDescriptor += '>';
/*BaseTemplates.js:22     */     stringDescriptor += (params.content?params.content:'');
/*BaseTemplates.js:23     */     stringDescriptor += '</div>';
/*BaseTemplates.js:24     */     return stringDescriptor;
/*BaseTemplates.js:25     */   }
/*BaseTemplates.js:26     */ });
/*BaseTemplates.js:27     */ 
/*BaseTemplates.js:28     */ PYC.Describe.Template('LoginForm' ,{
/*BaseTemplates.js:29     */ 
/*BaseTemplates.js:30     */   builder: function(params){
/*BaseTemplates.js:31     */     var stringDescriptor = '<div>User<input style="" value=""></div>'; 
/*BaseTemplates.js:32     */    
/*BaseTemplates.js:33     */     return stringDescriptor;
/*BaseTemplates.js:34     */   }
/*BaseTemplates.js:35     */ });
/*VW_Input.Form.js:0      */ PYC.Describe('VW_Input.Form',{
/*VW_Input.Form.js:1      */   builder: function(obj,params){   
/*VW_Input.Form.js:2      */   	 obj.whenResolved = null;
/*VW_Input.Form.js:3      */      //obj.fields = [];
/*VW_Input.Form.js:4      */      obj.container = $('<div style="position:absolute;left:20%;width:250px;padding:25px;border-radius:10px;top:200px;text-align:right;background-color:grey;" class="" id=""></div>');
/*VW_Input.Form.js:5      */      params.fields.forEach((element)=>{
/*VW_Input.Form.js:6      */       obj.container.append(element.title+": <input type='"+element.type+"' name='"+element.key+"'><br> ");
/*VW_Input.Form.js:7      */      });
/*VW_Input.Form.js:8      */      
/*VW_Input.Form.js:9      */      obj.submit = $("<button >ok</button>");
/*VW_Input.Form.js:10     */      obj.submit.on('click',(e)=>{
/*VW_Input.Form.js:11     */         var result = {};
/*VW_Input.Form.js:12     */         obj.container.children('input').each(function(el){
/*VW_Input.Form.js:13     */           var element = $(this);
/*VW_Input.Form.js:14     */           result[element.attr('name')] = element.val();
/*VW_Input.Form.js:15     */         });
/*VW_Input.Form.js:16     */         // TODO any kind of validation;
/*VW_Input.Form.js:17     */ 
/*VW_Input.Form.js:18     */         obj.whenResolved(result);
/*VW_Input.Form.js:19     */         obj.container.remove();
/*VW_Input.Form.js:20     */      });
/*VW_Input.Form.js:21     */      obj.container.append(obj.submit);
/*VW_Input.Form.js:22     */   },
/*VW_Input.Form.js:23     */   publ: function(obj,params){    
/*VW_Input.Form.js:24     */    
/*VW_Input.Form.js:25     */       obj.onAction = function(fun){
/*VW_Input.Form.js:26     */         var obj = this;
/*VW_Input.Form.js:27     */         obj.whenResolved = fun;
/*VW_Input.Form.js:28     */       };
/*VW_Input.Form.js:29     */ 
/*VW_Input.Form.js:30     */       obj.renderTo = function(element){
/*VW_Input.Form.js:31     */         var obj = this;
/*VW_Input.Form.js:32     */         element.append(obj.container);
/*VW_Input.Form.js:33     */       }
/*VW_Input.Form.js:34     */   }
/*VW_Input.Form.js:35     */ });
/*VW_Input.Form.js:36     */ 
/*VW_Input.SimpleSelectio */ PYC.Describe('VW_Input.SimpleSelection',{
/*VW_Input.SimpleSelectio */   builder: function(obj,params){   
/*VW_Input.SimpleSelectio */   	 obj.whenResolved = null;
/*VW_Input.SimpleSelectio */ 
/*VW_Input.SimpleSelectio */      obj.container = $('<div style="position:absolute;left:20%;width:250px;padding:25px;border-radius:10px;top:200px;text-align:right;background-color:grey;" class="" id=""></div>');
/*VW_Input.SimpleSelectio */      params.options.forEach((element)=>{
/*VW_Input.SimpleSelectio */       obj.container.append("<button name='"+element.key+"'>"+element.title+"</button> ");
/*VW_Input.SimpleSelectio */      });
/*VW_Input.SimpleSelectio */ 
/*VW_Input.SimpleSelectio */ 
/*VW_Input.SimpleSelectio */      obj.container.on('click',(e)=>{
/*VW_Input.SimpleSelectio */         var result = $(e.target).attr("name");
/*VW_Input.SimpleSelectio */         // TODO any kind of validation;
/*VW_Input.SimpleSelectio */ 
/*VW_Input.SimpleSelectio */         obj.whenResolved(result);
/*VW_Input.SimpleSelectio */         obj.container.remove();
/*VW_Input.SimpleSelectio */      });
/*VW_Input.SimpleSelectio */      obj.container.append(obj.submit);
/*VW_Input.SimpleSelectio */   },
/*VW_Input.SimpleSelectio */   publ: function(obj,params){    
/*VW_Input.SimpleSelectio */    
/*VW_Input.SimpleSelectio */       obj.onAction = function(fun){
/*VW_Input.SimpleSelectio */         var obj = this;
/*VW_Input.SimpleSelectio */         obj.whenResolved = fun;
/*VW_Input.SimpleSelectio */       };
/*VW_Input.SimpleSelectio */ 
/*VW_Input.SimpleSelectio */       obj.renderTo = function(element){
/*VW_Input.SimpleSelectio */         var obj = this;
/*VW_Input.SimpleSelectio */         element.append(obj.container);
/*VW_Input.SimpleSelectio */       }
/*VW_Input.SimpleSelectio */   }
/*VW_Input.SimpleSelectio */ });
/*VW_Input.SimpleSelectio */ 