import _ from "lodash";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from 'redux';
import createReactClass from 'create-react-class';
import Classes from '..\\build\\js\\WGG_Classes';
import PYC from '..\\module\\PrototypeClass.js';
import STRIFE from "..\\GameDescriptors\\STRIFE.js";

PYC.store = createStore((state = [], action) =>{
	if (PYC.storeActions[action.type]){
		PYC.storeActions[action.type](action.payload);
	}
	return state;
});

PYC.store.dispatch({
  type: 'START_GAME',
  payload:{
  	gameDescription:STRIFE
  }
});

//let NodeDefinitionApp = PYC.React("NodeDefinitionApp");
//ReactDOM.render(<NodeDefinitionApp nodes={STRIFEnodes.nodes} />, document.querySelector(".container"));