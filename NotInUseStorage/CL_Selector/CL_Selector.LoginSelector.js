PYC.Describe('Selector.LoginSelector',{
  Extends:'Selector',
  builder: function(obj,params){   
  	obj.view = PYC.Create('Selector.LoginSelectorView',{});
  },
  publ: function(obj,params){    
   	obj.getPromisedResult = function(){
      var obj = this;
      obj.view.readyInput();
      return new Promise((resolve,reject)=>{
        obj.resolve = resolve;
        obj.reject  = reject;
      });
    };
    obj.validate = function(result){
      var obj = this;
      try{
        if (result.User !== undefined  && result.Password !== undefined){
          return true;
        }
      }catch (error){
        return false;
      }
      return false;
    };
   
  }
});


PYC.Describe('Selector.LoginSelectorView',{
  builder: function(obj,params){   
  	
  },
  publ: function(obj,params){    
    
   	obj.readyInput = function(){
      var obj = this;
     
      MainView.addInput('Form',{
        fields:[
          {key:'User',title:'User',type:'text'},
          {key:'Password',title:'Password',type:'Password'},
        ],
        buttons:['ok']
      });

    }
  }
});


