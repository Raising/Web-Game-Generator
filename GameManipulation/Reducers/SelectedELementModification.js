import baseReducer from ".\\BaseReducer.js";

let selectedElementModification = {
	CHANGE_SELECTED_ELEMENT_PROPERTY :(state, {newValue ,propertyName = ""}) => {
        state.setPropertyDot(propertyName, newValue);
		return state;
    },
    ADD_CHILD_TO_SELECTED_ELEMENT_PROPERTY: (state,{newValue ,propertyName = ""}) => {
        let list = state.getPropertyDot(propertyName) || [];
        state.setPropertyDot(propertyName,[...list,newValue]);
        return state;
    },
    ADD_CHILDMAP_TO_SELECTED_ELEMENT_PROPERTY: (state,{elementKeyProperty = "",newValue ,propertyName = ""}) => {
        let map = state.getPropertyDot(propertyName) || {};
        let newKey = map.getPropertyDot(elementKeyProperty);
        newKey = newKey !== undefined ? newKey : "";
        
        let modifiedElements = { _error: ""};
        if (newKey === "" || map.hasOwnProperty(newKey) ){
            modifiedElements._error = "key value shoudn't be empty or already in use";
        }else{
            modifiedElements[newKey] = newValue;
            modifiedElements[elementKeyProperty] = "";
        }
        console.log(modifiedElements);
        state.setPropertyDot(propertyName,Object.assign({},map,modifiedElements));
        return state;
    },
};

export default  Object.assign(Object.create(baseReducer),{
    stateNode:"gameModel:#selectedElement.path", 
    actions:selectedElementModification
});