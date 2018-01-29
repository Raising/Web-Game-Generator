import baseReducer from ".\\BaseReducer.js";

let game = {
	"GAME:LOAD" : (state, {gameConfig}) =>{
		return gameConfig;
    },
}

export default  Object.assign(Object.create(baseReducer),{
    stateNode:"gameModel", 
    actions:game
});