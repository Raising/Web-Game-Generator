let gameManipulationActions = {
	LOAD_CURRENT_GAME : (state, {gameConfig}) =>{
		state = {};
		state.gameModel = gameConfig;
        state.selectedMenuPath = [];
        state.selectedElement = {name: "No Element Selected"};
		return state;
	},
	SELECT_MENU_ELEMENT :(state, {elementId}) => {
        state = Object.assign({}, state);
        state.selectedMenuPath = elementId.split(".");
        let newSelectedElement = state.gameModel;    
		for (let subPathId of state.selectedMenuPath){
            newSelectedElement = newSelectedElement[subPathId];
        }
        if (newSelectedElement.description !== undefined){
            state.selectedElement = newSelectedElement; 
        }

		return state;
	},
}

let gameManipulationReducer = function (state = [], action){
	if (gameManipulationActions[action.type]){
		return gameManipulationActions[action.type](state,action.payload);
	}
	return state;
}

export default gameManipulationReducer;