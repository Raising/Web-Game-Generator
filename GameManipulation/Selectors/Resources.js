const resources ={
    nodeTypes:[
      { name:"Flow",       value:"Flow"},
      { name:"Create",     value:"Create"},
      { name:"Selector",   value:"Selector"},
      { name:"Modify",     value:"Modify"}
    ],
    propertyTypes:[
      { name:"raw",     value:"raw"},
      { name:"param",     value:"param"},
      { name:"entityByName", value:"entityByName"},
      { name:"list", value:"list"},
      { name:"game", value:"game"},
      { name:"reduce", value:"reduce"},
    ],
    comparators:[
      {name:"==", value:"=="},
      {name:"<", value:"<"},
      {name:"<=", value:"<="},
      {name:">", value:">"},
      {name:">=", value:">="},
    ],

    operators:[
      {name:"+", value: "+"},
      {name:"-", value: "-"},
      {name:"/", value: "/"},
      {name:"*", value: "*"},
      {name:"^", value: "pow"},
    ],

    inputNames: function(){
      return this.getCurrentElement().inputNames;
    }
};
    
export default { getResource: function (resourceName){
    if (resources[resourceName] !== undefined){
      if (typeof resources[resourceName] === "function"){
        return resources[resourceName].call(this);
      }else{
        return resources[resourceName];
      }
    }
    console.error("Triying to access undefined resource: '" + resourceName + "'");
    return false;
  }
};