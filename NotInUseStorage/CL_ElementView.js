PYC.Describe('ElementView',{
  builder: function(obj,params){   
    obj.game = params.game;
    obj.owner  = params.owner;
  },
  publ: function(obj,params){    
    obj.getView = function(){
      var obj = this;
      return obj.container;
    };

    obj.renderTo = function(parent){
      var obj = this;
      parent.append(obj.container);
    };
  }
});
