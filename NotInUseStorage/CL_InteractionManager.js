PYC.Describe('InteractionManager',{
  builder: function(obj,params){
    obj.user  = params.user;
    obj.selectorList = {};
    MainView.setInteractionManager(obj);
    //obj.socketOptions = params.socketOptions || {};
    
  //  PYC.Create('SelectorManager',params.selectorManager,params.selectorManager.accountableClass);


  },
  publ: function(obj,params){   
    obj.onInteraction = function(input){
      var obj = this;
      var resolved = false;
      for (selectorToken in obj.selectorList){
        if (!resolved){
          var selector = obj.selectorList[selectorToken];
          if (selector.process(input)){
            if (selector.done()){
              delete obj.selectorList[selectorToken];  
            }
            return true;
          }
        }
      }
    } 
     obj.activateSelector = function(selectorType,selectorParams){
      var obj = this;
      console.log('IM-fun:activateSelector:'+selectorType+' => '+selectorParams);
      return new PromiseChain()
      .continue((sc)=>{
        return PYC.Create('Selector.'+selectorType,selectorParams);
      },'selector')
      .continue((sc)=>{
        sc.selectorToken = sc.selector.getToken();
        obj.selectorList[sc.selectorToken] = sc.selector;
        return sc.selector.getPromisedResult();
      }).end();
     
    };
    
  }
});