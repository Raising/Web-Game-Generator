import _ from "lodash";
import React from "react";
import ReactDOM from "react-dom";
import {  createStore } from 'redux'
import { Provider } from "react-redux";
import createReactClass from 'create-react-class';
import STRIFE from "..\\GameDescriptors\\STRIFE.js";
import StructureEnchancements from ".\\Enchancements\\index.js";
import gameManipulationReducer from ".\\Reducers\\index.js";

import GameManipulationApp from ".\\Components\\Templates\\GameManipulationApp"

window.store = createStore(gameManipulationReducer);

ReactDOM.render(
  <Provider store= {store}>
    <GameManipulationApp state={store.getState()} />
  </Provider>
, document.querySelector(".container"));

store.dispatch({
  type: "GAME:LOAD",
  payload: {
    gameConfig: STRIFE
  }
});

store.dispatch({
  type: "MENU:SELECT_MENU_ELEMENT",
  payload: {
    "elementId": "nodes.champion3"
  }
});
