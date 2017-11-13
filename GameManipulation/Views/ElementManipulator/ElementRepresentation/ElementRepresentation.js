import React from "react";
import {connect} from 'react-redux';
import NodeRepresentation from ".\\NodeRepresentation.js";

const ElementRepresentation = function({element = {}}){
    let representation = <div/>;
    
    if (element.nodeType !== undefined){
        representation = <NodeRepresentation/>;
    }
    
    return representation;
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
)(ElementRepresentation);