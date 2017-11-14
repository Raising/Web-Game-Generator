import React from "react";
import {connect} from 'react-redux';

import TitleHeader from ".\\TitleHeader.js";
import ToolBelt from ".\\ToolBelt.js";
import ManipulationArea from ".\\ManipulationArea.js";


const ElementManipulator = function({element = {}}){
    
    return(
      <div className="col-xs-10">
        <ToolBelt />
        <TitleHeader  />
        <ManipulationArea />
      </div>  
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
       element: state.getCurrentElement()
    };
}
  
const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        
    }
}
  
export default connect(
   mapStateToProps,
   mapDispatchToProps
)(ElementManipulator);