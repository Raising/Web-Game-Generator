import baseReducer from ".\\BaseReducer.js";

let gameModel = {
	LOAD_CURRENT_GAME : (state, {gameConfig}) =>{
		return gameConfig;
    },
}

export default  Object.assign(Object.create(baseReducer),{
    stateNode:"gameModel", 
    actions:gameModel
});