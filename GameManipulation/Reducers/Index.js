import menuReducer from ".\\Menu.js";
import gameModelReducer from ".\\Game.js";
import selectedElementModificationReducer from ".\\SelectedElementModification.js";
import { manager as userInteractionManager , reducer as userInteractionReducer } from ".\\userInteractionManager.js";

import selectors from "..\\Selectors\\Index.js";

const reducerCluster = [
    gameModelReducer,
    menuReducer,
    selectedElementModificationReducer,
    userInteractionReducer,
];

const defaultState = Object.assign(Object.create(selectors),{
    gameModel:{},
    selectedElement:{path:""}
});

export default (state = defaultState, action) => {
  for (let reducer of reducerCluster){
    if (reducer.actions[action.type]){
      let stateNodePath = reducer.getStateNode(state,action);
      let stateNode = state.getPropertyDot(stateNodePath);
      
      action.payload = processPayload(stateNode,action.payload); 
      if (stateNodePath){
        state = state.setPropertyDot( stateNodePath, reducer.actions[action.type](stateNode, action.payload ));    
      }
      else{
        state = reducer.actions[action.type](stateNode, action.payload );
      }
    }
  }
  userInteractionManager.saveAction(action, state);
	return state;
}

const processPayload = (state,actionPayload ) => {
  for ( let key in actionPayload){
    if ( typeof actionPayload[key] === "function" ){
      actionPayload[key] = actionPayload[key](state);
    }
  }
  return actionPayload;
}