import React from "react";
import {connect} from 'react-redux';
import NodeRepresentation from "..\\Molecules\\Nodes\\NodeRepresentation.js";

const ManipulationArea = function({element = {}}){
    return(
      <div className="tab-content">
        <NodeRepresentation />
        <pre >{ element.description ? JSON.stringify(element, null, 2): "ELEMENT PLACEHOLDER"} </pre>
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
)(ManipulationArea);