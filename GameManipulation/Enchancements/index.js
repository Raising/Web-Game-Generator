Object.defineProperty(Object.prototype, 'getProperty',{
    value :function(propertyName,separator){
        if (separator === undefined){
            return this[propertyName];
        }
        else {
            let splitedProperty = propertyName.split(separator); 
            if (splitedProperty.length === 1){
                return this[propertyName];
            }
            let property = this;
            for (let subName of splitedProperty){
                property = property[subName];
            }
            return property;
        }
    }
});

Object.defineProperty(Object.prototype, 'getPropertyDot',{
    value : function(propertyName){
        return this.getProperty(propertyName,".");
    }
});