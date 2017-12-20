const resources ={
    nodeTypes:[
        {  name:"Create",     value:"Create"},
        {  name:"Flow",       value:"Flow"},
        {  name:"Selector",   value:"Selector"},
        {  name:"Modify",     value:"Modify"}
    ],
    propertyTypes:[
        {  name:"param",     value:"param"},
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