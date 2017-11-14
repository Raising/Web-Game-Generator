import elementSelectionReducer from ".\\ElementSelection.js";
import gameModelReducer from ".\\GameModel.js";

import selectors from "..\\Selectors\\Index.js";

const reducerCluster = [
    gameModelReducer,
    elementSelectionReducer
];

const defaultState = {
    gameModel:{},
    selectedElement:{path:"",splitedPath:[""]}
}

export default (state = defaultState, action) => {
    console.log(action);
    state = Object.assign(Object.create(selectors),state);

    for (let reducer of reducerCluster){
        if (reducer.actions[action.type]){
            state[reducer.stateNode] = reducer.actions[action.type](state[reducer.stateNode],action.payload);
        }
    }

	return state;
}