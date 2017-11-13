import React from "react";
import {connect} from 'react-redux';

const ManipulationArea = function({element = {}}){
    console.log(JSON.stringify(element, null, 2));
    return(
      <div className="tab-content">
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