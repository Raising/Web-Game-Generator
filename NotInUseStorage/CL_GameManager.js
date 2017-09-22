PYC.Describe('GameManager',{
  builder: function(obj,params){  
    obj.socket = false; 
    obj.gameList = {};
    obj.game = params.game || 'GS_Game';
  },
  publ: function(obj,params){ 
    obj.setGame = function(gameName){
      var obj = this;
      obj.game = obj.gameList[gameName];
    }

    obj.addPlayer = function(user){
      var obj = this;
      var player = PYC.Create('GS_Player',{user:user}); // se pueden crear jugadores de forma asincrona?
      obj.idlePlayers[player.$Id()] = player;
      obj.runMatchMaker();
      
    };

    
  }
});