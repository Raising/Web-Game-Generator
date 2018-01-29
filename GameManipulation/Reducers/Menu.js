import baseReducer from ".\\BaseReducer.js";

let elementSelection = {
	"MENU:SELECT_MENU_ELEMENT" :(state, {elementId}) => {
    state = state.setPropertyDot("path",elementId);
    return Object.assign({},state);
		
	},
}

export default Object.assign(Object.create(baseReducer),{
  stateNode:"selectedElement", 
  actions:elementSelection
});