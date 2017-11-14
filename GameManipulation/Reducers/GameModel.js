let gameModel = {
	LOAD_CURRENT_GAME : (state, {gameConfig}) =>{
		return gameConfig;
    },
}

export default  {stateNode:"gameModel", actions:gameModel};