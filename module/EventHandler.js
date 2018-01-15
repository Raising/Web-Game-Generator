let REH = {
  author:'Ignacio Medina Castillo',
  contact:'ignacio.medina.castillo@gmail.com',
  description: 'this piece of code implement a event handler functionality in the' +
               'object prototype to enable objects to suscribe to other object events'
};


//AuxiliarFunctions

Object.$ID_COUNTER = 0;

Object.defineProperty(Object.prototype, '$Id',{
  value :function(){
    if (this['[[ID]]'] === undefined){
      Object.$ID_COUNTER ++;
      var str = "" + Object.$ID_COUNTER;
      var pad = "0000000000";
   
      Object.defineProperty(this, '[[ID]]',{
      value : pad.substring(0, pad.length - str.length) + str
      });
    }
    return this['[[ID]]'];
  }
});

Object.defineProperty(Object.prototype, '$readyEventHandler',{
  value :function(eventName, functionName){
    if (this.eventListeners === undefined){
      this.eventListeners = {};
    }
    if ( this.eventListeners[eventName] === undefined ){
      this.eventListeners[eventName] = {};
    }
    if (functionName && this.eventListeners[eventName][functionName] === undefined ){
      this.eventListeners[eventName][functionName] = {};
    }
    return this.eventListeners;
  }
});

Object.defineProperty(Object.prototype, '$listenEvent',{
  value :function(listenedObject,eventName,functionName,scope){
    var listenerSpot;
    scope = scope ? scope : this;
    listenerSpot = listenedObject.$readyEventHandler(eventName,functionName)[eventName][functionName];
    if (listenerSpot[scope.$Id()] !== undefined){
       console.warn('the trigger in the object "'+ listenedObject.$Id() + '" for the event "'+eventName+'" to trigger the function "'+ functionName+'" of the object "'+ scope.$Id() +'" is already setted, consider remove the redundance');
    }
    listenerSpot[scope.$Id()] = scope;
  }
});

Object.defineProperty(Object.prototype, '$unListenEvent',{
  value :function(listenedObject,eventName,functionName,scope){
    var listenerSpot;
    scope = scope ? scope : this;
    
    listenerSpot = listenedObject.$readyEventHandler(eventName,functionName)[eventName][functionName];
    if (listenerSpot[scope.$Id()] === undefined){
       console.warn('the trigger in the object "'+ listenedObject.$Id() +
       '" for the event "'+ eventName +
       '" to trigger the function "'+ functionName +
       '" of the object "'+ scope.$Id() +
       '" wasen`t setted you may be missing something');
    }
    
    delete listenerSpot[scope.$Id()];
  }
});

Object.defineProperty(Object.prototype, '$fireEvent',{
  value :function(eventName,params){
    var listOfObjectsListening,
        listOfFunctionsListening,
        objectId,
        functionName;
  
    listOfFunctionsListening = this.$readyEventHandler(eventName)[eventName];
    
    for (functionName in listOfFunctionsListening){
      listOfObjectsListening = listOfFunctionsListening[functionName];
      
      for (objectId in listOfObjectsListening) {
        listOfObjectsListening[objectId][functionName](params);
      }
    }
  }
});
// funcion que llama a si mismo
Object.defineProperty(Function.prototype, 'selfCall',{
  value :function(params){
     return this(params);  
  }
});

Object.defineProperty(Object.prototype, 'reduce',{
  value :function(reduceFunction){
    return Object.values(this).reduce(reduceFunction);  
  }
});

Object.defineProperty(Object.prototype, 'first',{
  get :function(){
    return this.children[0];
  }
});

Object.defineProperty(Object.prototype, 'last',{
  get :function(){
    return this.children[this.children.length -1];
  }
});