PYC.Describe('ElementView.ScoreBoard',{
  Extends:'ElementView',
  builder: function(obj,params){  
   
    obj.scoreSlots = {};
    obj.container = $('<div style="position:absolute;left:5%;width:250px;padding:25px;border-radius:10px;top:20px;text-align:right;background-color:grey;" class="" id=""></div>');
   
  },
  publ: function(obj,params){
  	obj.init = function(params){
  	   var obj = this;
  	   
  	};    
    obj.addScoreSlot = function(params){
      var obj = this;
      if (obj.scoreSlots[params.scoreSlotName] !== undefined){
      	 obj.scoreSlots[params.scoreSlotName].remove();
      }

      obj.scoreSlots[params.scoreSlotName] = $('<div style="float:left;height:50px;width:50px;border-radius:4px;background-color:white;" class="" id="">'+(params.value || 0)+'</div>');
  	  obj.container.append(obj.scoreSlots[params.scoreSlotName]);

    };
   
  }
});
