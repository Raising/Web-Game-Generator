PYC.Describe('User',{
  builder: function(obj,params){
    obj.socket  = false;
    obj.token  = params.token;
    params.interactorManager = params.interactorManager === undefined ? {} : params.interactorManager;
    params.interactorManager.user = obj;
    //obj.socketOptions = params.socketOptions || {};
    obj.interactorManager = PYC.Create('InteractionManager',params.interactorManager);
  //PYC.Create('SelectorManager',params.selectorManager,params.selectorManager.accountableClass);
    nacho = obj.interactorManager;

  },
  publ: function(obj,params){    
    obj.setSocket = function(socket){
      var obj = this;
      console.log('ufun:setSocket');
      obj.socket = socket;
      obj.setSocketOptions();
    };
    obj.setSocketOptions = function(){
      var obj = this;
      console.log('ufun:setSocketOptions');
      obj.socket.on('doSelection', function(data) {  
        console.log('doSelection',data);
        
        obj.interactorManager.activateSelector(data.type,data.params)
        .then((result)=>{
          obj.socket.emit('selector',{selectorToken:data.selectorToken,result:result});
        });
        /*
        var option = 0;
        if (data.type === 'GS_Selector.RockPaperScissors') option = Math.floor(Math.random()*3);
       

        obj.socket.emit('selector',{selectorToken:data.selectorToken,result:data.params.options[option]});*/
      });
    };

    obj.doSelection = function(selectorType,selectorParams){
      var obj = this;
      return obj.interactorManager.activateSelector(selectorType,selectorParams);
      //return {user:"Nacho",password:"1234"};
    };

    obj.setToken = function(token){
      obj.token = token;
    }

    obj.getToken = function(){
      return obj.token;
    }
  }
});