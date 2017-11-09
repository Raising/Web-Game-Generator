let gameManipulationActions = {
	LOAD_CURRENT_GAME : (state, {gameConfig}) =>{
		state = {};
		state.gameModel = gameConfig;
		state.selectedMenuPath = [];
		return state;
	},
	SELECT_MENU_ELEMENT :(state, {elementId}) => {
        state = Object.assign({}, state);
		state.selectedMenuPath = elementId.split(".");
		state.selectedElement = state.gameModel;    
		for (let subPathId of state.selectedMenuPath){
			state.selectedElement = state.selectedElement[subPathId];
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