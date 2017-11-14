let elementSelection = {
	SELECT_MENU_ELEMENT :(state, {elementId}) => {
        state.path = elementId;
        state.splitedPath = elementId.split(".");

		return state;
	},
}

export default {stateNode:"selectedElement", actions:elementSelection};