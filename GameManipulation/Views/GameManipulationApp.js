import React from "react";
import TreeMenu from ".\\TreeMenu\\TreeMenu.js";
import ElementManipulator from ".\\ElementManipulator\\ElementManipulator.js";

let GameManipulationApp = function({state = {}}) {

    return (
      <div >    
       <TreeMenu  basePath = "" />
       <ElementManipulator />
      </div>
    );
};

export default GameManipulationApp;