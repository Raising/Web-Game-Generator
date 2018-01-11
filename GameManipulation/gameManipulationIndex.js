import _ from "lodash";
import React from "react";
import ReactDOM from "react-dom";
import {  createStore } from 'redux'
import { Provider } from "react-redux";
import createReactClass from 'create-react-class';
import STRIFE from "..\\GameDescriptors\\STRIFE.js";
import StructureEnchancements from ".\\Enchancements\\index.js";
import gameManipulationReducer from ".\\Reducers\\index.js";


import GameManipulationApp from ".\\Views\\GameManipulationApp"

window.store = createStore(gameManipulationReducer);

ReactDOM.render(
    <Provider store= {store}>
        <GameManipulationApp state={store.getState()} />
    </Provider>
, document.querySelector(".container"));

store.dispatch({
    type: "LOAD_CURRENT_GAME",
    payload: {
        gameConfig: STRIFE
    }
});

store.dispatch({
    type: "SELECT_MENU_ELEMENT",
    payload: {
      "elementId": "nodes"
    }
  });

store.dispatch({
  type: "SELECT_MENU_ELEMENT",
  payload: {
    "elementId": "nodes.champion3"
  }
});
// store.dispatch({
//   type: "CHANGE_SELECTED_ELEMENT_PROPERTY",
//   payload: {
//     newValue: "Flow",
//     propertyName: "nodeType",
//     elementId: "gameModel.nodes.champion3"
//   }
// });