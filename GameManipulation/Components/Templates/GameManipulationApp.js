import React from "react";
import VerticalMenu from "..\\Organisms\\VerticalMenu.js";
import ElementManipulator from "..\\Organisms\\ElementManipulator.js";
import createReactClass from "create-react-class";

const GameManipulationApp = createReactClass({
  render: function() {
    return (
      <div >    
        <VerticalMenu  className = "col-xs-2" />
        <ElementManipulator className = "col-xs-10" />
      </div>
    );
  }
});


export default GameManipulationApp;