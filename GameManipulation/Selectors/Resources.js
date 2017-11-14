const resources ={
    nodeTypes:[
        {  name:"Create",     value:"Create"},
        {  name:"Flow",       value:"Flow"},
        {  name:"Selector",   value:"Selector"},
        {  name:"Modify",     value:"Modify"}
    ]
};
    
export default { getResource: function (resourceName){
        if (resources[resourceName] !== undefined){
            return resources[resourceName];
        }
        console.error("Triying to access undefined resource: '" + resourceName + "'");
        return false;
    }
};