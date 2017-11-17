import elementSelectionReducer from ".\\ElementSelection.js";
import gameModelReducer from ".\\GameModel.js";
import selectedElementModificationReducer from ".\\SelectedElementModification.js";

import selectors from "..\\Selectors\\Index.js";

const reducerCluster = [
    gameModelReducer,
    elementSelectionReducer,
    selectedElementModificationReducer,
];

const defaultState = {
    gameModel:{},
    selectedElement:{path:""}
}

export default (state = defaultState, action) => {
    console.log(action);
    window.actionHistory = window.actionHistory ||[];
    window.actionHistory.push(action);
    state = Object.assign(Object.create(selectors),state);

    for (let reducer of reducerCluster){
        if (reducer.actions[action.type]){
            state.setPropertyDot(reducer.getStateNode(state,action), reducer.actions[action.type](state.getPropertyDot(reducer.getStateNode(state,action)),action.payload));
        }
    }

	return state;
}