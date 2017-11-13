import React from "react";
import {connect} from 'react-redux';
import ElementRepresentation from ".\\ElementRepresentation\\ElementRepresentation.js";

const ManipulationArea = function({element = {}}){
    return(
      <div className="tab-content">
        <ElementRepresentation />
        <pre >{ element.description ? JSON.stringify(element, null, 2): "ELEMENT PLACEHOLDER"} </pre>
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
)(ManipulationArea);