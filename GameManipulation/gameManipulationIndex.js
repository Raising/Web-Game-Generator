import _ from "lodash";
import React from "react";
import ReactDOM from "react-dom";
import { createStore } from 'redux'
import { Provider } from "react-redux";
import createReactClass from 'create-react-class';
import STRIFE from "..\\GameDescriptors\\STRIFE.js";
import gameManipulationReducer from ".\\gameManipulationReducer.js";

import GameManipulationApp from ".\\Views\\GameManipulationApp"

window.store = createStore(gameManipulationReducer);
store.dispatch({
	type: "LOAD_CURRENT_GAME",
	payload: {
		gameConfig: STRIFE
	}
});

ReactDOM.render(
    <Provider store= {store}>
        <GameManipulationApp state={store.getState()} />
    </Provider>
, document.querySelector(".container"));