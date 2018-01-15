import baseReducer from ".\\BaseReducer.js";

let selectedElementModification = {
	  CHANGE_SELECTED_ELEMENT_PROPERTY :(state, {newValue ,propertyName = ""}) => {
      state.setPropertyDot(propertyName, typeof newValue === "function" ? newValue(state) : newValue);
		  return state;
    },

    STRUCTURE_SELECTED_ELEMENT_PROPERTY:(state, {currentValuePath,structure ,propertyName = ""}) => {
      let currentValue = "";

      structure.setPropertyDot(propertyName,currentValue);
      state.setPropertyDot(propertyName, structure);
    },

    ADD_CHILD_TO_SELECTED_ELEMENT_PROPERTY: (state,{keyAttribute = "", newValue ,propertyName = ""}) => {
        let list = state.getPropertyDot(propertyName) || [];

        state.setPropertyDot(propertyName,[
          ...list,
          initializeNewValue({keyAttribute ,newValue,list})
        ]);
        return state;
    },

    ADD_MAPPED_CHILD_TO_SELECTED_ELEMENT_PROPERTY: (state,{elementKeyProperty = "",newValue ,propertyName = ""}) => {
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

function initializeNewValue({keyAttribute = "", newValue = {}, list = [] } ){
  let initValue = Object.assign({},newValue);
  
  if (keyAttribute !== ""){
    let baseKey = "elementKey_";
    let currentIndex = list.length;
    let newKey = baseKey + currentIndex;
    let currentKeys = list.map( e => e.getPropertyDot(keyAttribute));
    
    while (currentKeys.indexOf(newKey) !== -1){
      currentIndex++;
      newKey = baseKey + currentIndex;
    }
    initValue.setPropertyDot(keyAttribute,newKey);
  }
  return initValue;
}