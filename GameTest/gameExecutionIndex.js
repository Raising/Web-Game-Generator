import _ from "lodash";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import createReactClass from 'create-react-class';
import Classes from '..\\build\\js\\WGG_Classes';
import PYC from '..\\module\\PrototypeClass.js';
import STRIFEnodes from "..\\GameDescriptors\\STRIFE.js";


let actions = {
	ModifyAttribute: async function({entity = {},attibute = "",value = {}}){
		return entity[attibute] = value;
	}
}

PYC.store = {
	nodeAction:  async function({type = "", payload = {}}) {
		return actions[type](payload);
	},
	startGame: async function(){
		let game = PYC.Create({   dependencyTree:{}, dispatcher:{} })("Game",STRIFEnodes);
		game.startGame("main");	
	},
}

PYC.store.startGame();

//let NodeDefinitionApp = PYC.React("NodeDefinitionApp");
//ReactDOM.render(<NodeDefinitionApp nodes={STRIFEnodes.nodes} />, document.querySelector(".container"));