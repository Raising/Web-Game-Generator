import baseReducer from ".\\BaseReducer.js";

let elementSelection = {
	SELECT_MENU_ELEMENT :(state, {elementId}) => {
        state.path = elementId;
		return state;
	},
}

export default Object.assign(Object.create(baseReducer),{
        stateNode:"selectedElement", 
        actions:elementSelection
});