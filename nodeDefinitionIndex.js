import _ from "lodash";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import createReactClass from 'create-react-class';
import Classes from '.\\build\\js\\WGG_Classes';
import PYC from '.\\module\\PrototypeClass';

let NodeDefinitionApp = PYC.React("NodeDefinitionApp");

ReactDOM.render(<NodeDefinitionApp />, document.querySelector(".container"));