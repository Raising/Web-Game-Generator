PYC.Describe('MainView',{
  PrototipeSingleton: new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: ()=>{}, create: ()=>{}}),
  builder: function(obj,params){   
  	obj.interactionManager = null;
    obj.elementViewCollections = {}; // <-- maybe a handler?
    obj.selfPlayerName = '';
  },  
  publ: function(obj,params){ 
  	obj.setInteractionManager = function(interactionManager){
   		var obj = this;
   		obj.interactionManager = interactionManager;
   	} ;  
   	obj.addInput = function(inputName,params){
   		var obj = this;
   		var inputELement = PYC.Create('VW_Input.'+inputName,params);
   		inputELement.onAction((result)=>{
   			obj.interactionManager.onInteraction(result);
   		});
   		inputELement.renderTo($('body'));
   	};

   
    obj.setSocket = function(socket){
      var obj = this;
      console.log('mainView:setSocket');
      obj.socket = socket;
      obj.setSocketOptions();
    };
    obj.setSocketOptions = function(){
      var obj = this;
      console.log('mainView:setSocketOptions');
      if (obj.socket === false) {console.error('Trying to modify undefined socket');}
      else{
       
        obj.socket.on('notification',(data)=>{ console.log(data); });
        obj.socket.on('notification_playerName',(data)=>{ obj.onPlayerNameNotification(data); });
        obj.socket.on('notification_view',(data)=>{obj.onViewNotification(data); });
        obj.socket.on('notification_viewCreation',(data)=>{ obj.onCreateView(data);});

      }
    };
    obj.onCreateView = function(params){
      var obj = this;
      var newElement = PYC.Create(params.class,params.params);
      newElement.serverReflection = params.object;
      if (params.parent) {
        newElement.renderTo(obj.elementViewCollections[params.parent]);
      }else{
        newElement.renderTo($('body')); // <---- this depends on client type
      }
      obj.elementViewCollections[params.object] = newElement;
   };

    obj.onViewNotification = function(params){
      var obj = this;
       obj.elementViewCollections[params.object][params.action](params.params);
    };

    obj.onPlayerNameNotification = function(params){
      var obj = this;
      obj.selfPlayerName = params.playerName;
    };

    obj.isSelfPlayer = function(name){
      var obj = this;
      return name === obj.selfPlayerName;
    };
  }
});


