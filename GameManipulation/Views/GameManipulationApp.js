import React from "react";
import TreeMenu from ".\\TreeMenu";



let GameManipulationApp = function({state = {}}) {

    return (
      <div>
       <TreeMenu
          basePath = "" 
          //children={state.gameModel}
          //selection={state.selectedMenuPath}
        />
      </div>
    );
};

export default GameManipulationApp;