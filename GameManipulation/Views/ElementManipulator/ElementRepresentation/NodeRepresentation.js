import React from "react";
import {connect} from 'react-redux';
import InputParameters from ".\\Molecules\\InputParameters.js";
import OutputParameters from ".\\Molecules\\OutputParameters.js";

const NodeRepresentation = function({element = {}}){
    
    return (
        <div className="nodeSurface">
            <InputParameters />
            <OutputParameters />
        </div> 
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
       element: state.selectedElement
    };
}
  
const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        
    }
}
  
export default connect(
   mapStateToProps,
   mapDispatchToProps
)(NodeRepresentation);