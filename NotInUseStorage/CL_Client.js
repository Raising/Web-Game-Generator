PYC.Describe('Client',{
  builder: function(obj,params){
    obj.loginServerPath = params.loginServerPath || 'http://localhost:5000';

    obj.user = PYC.Create('User',{});
  
  },

  publ: function(obj,params){  
    obj.startClient = function(){
      var obj = this;
      new PromiseChain()
        .while((sc)=>{
          return (sc.GS_ConectionInfo[sc.GS_ConectionInfo.length-1] === undefined  || sc.GS_ConectionInfo[sc.GS_ConectionInfo.length-1] === undefined || sc.GS_ConectionInfo[sc.GS_ConectionInfo.length-1].path === undefined );},
          (sc)=>{
          return new PromiseChain(sc)
            .continue((sc)=>{
              return obj.user.doSelection('LoginSelector');},
              'LoginInput')
            .continue((sc)=>{
              return obj.loginUser(sc.LoginInput);
            })
          .end();
        },'GS_ConectionInfo')
        .continue((sc)=>{
          sc.GS_ConectionInfo = sc.GS_ConectionInfo[sc.GS_ConectionInfo.length-1];
          obj.user.setToken(sc.GS_ConectionInfo.token);
          obj.gameServerSocket = obj.conectToGameServer(sc.GS_ConectionInfo.path);
          obj.user.setSocket(obj.gameServerSocket);
          MainView.setSocket(obj.gameServerSocket);
          obj.gameServerSocket.emit('clientToServer',{token:obj.user.getToken()});
        })
      .end();
    };
    obj.loginUser = function(loginData){
      var obj = this;
      obj.loginServerSocket = io.connect(obj.loginServerPath);
     
      var P1 =  new Promise((resolve,reject)=>{
         obj.loginServerSocket.loginSucces = resolve;
      });
      obj.loginServerSocket.on('gameServerCredentials',(data)=>{
          obj.loginServerSocket.loginSucces(data);
      });
      obj.loginServerSocket.emit('login',loginData);
      return P1;
      //socket.emit('login',{User:'Nacho',Password:'1234'});
    };
    obj.conectToGameServer = function(serverPath){
      var obj = this;
        obj.gameServerSocket = io.connect(serverPath); 

        return  obj.gameServerSocket;
    }; 
  }
});