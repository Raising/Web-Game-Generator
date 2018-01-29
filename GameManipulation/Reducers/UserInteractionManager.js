import baseReducer from ".\\BaseReducer.js";
import selectors from "..\\Selectors\\Index.js";

export const manager = {
  actionHistory:[],
  currentAction:-1,
  saveAction : function (action, state) {
    console.log(action);
    if (action.type.startsWith("USER_INTERACTION")) return;
    action.state = Object.assign(Object.create(selectors),state);
    this.currentAction++;
    this.actionHistory[this.currentAction] = action;
  },

  undo : function (){
    if (this.currentAction > 0) {
      this.currentAction-- ;
    };

    return this.actionHistory[this.currentAction].state;
  },
  redo : function (){
    if (this.currentAction < this.actionHistory.length - 1) {
      this.currentAction++ ;
    };

    return this.actionHistory[this.currentAction].state;
  },
};

const userInteractionActions = {
	"USER_INTERACTION:UNDO" : (state, {}) =>{
		return manager.undo();
  },
  "USER_INTERACTION:REDO" : (state, {}) =>{
		return manager.redo();
  }
};

export const reducer =  Object.assign(Object.create(baseReducer),{
                            stateNode:"", 
                            actions:userInteractionActions
                          }) ;
