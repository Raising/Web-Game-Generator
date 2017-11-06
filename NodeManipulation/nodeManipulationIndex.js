import _ from "lodash";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { createStore } from 'redux'
import { Provider } from "react-redux";
import createReactClass from 'create-react-class';
import Classes from '..\\build\\js\\WGG_Classes';
import PYC from '..\\module\\PrototypeClass.js';
import STRIFEnodes from "..\\GameDescriptors\\STRIFE.js";



let NodeDefinitionApp = PYC.React("NodeDefinitionApp");
ReactDOM.render(<NodeDefinitionApp nodes={STRIFEnodes.nodes} />, document.querySelector(".container"));