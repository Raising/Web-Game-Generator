import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";

import MapList from "..\\..\\..\\Atoms\\MapList.js";
import OperandWrapper from "..\\..\\..\\Molecules\\Nodes\\Operands\\OperandWrapper.js";


const CreateNode = createReactClass({
  render: function() { 
    return (
        <MapList name = "Attributes" propertyName="attributes" listElement = {{type:OperandWrapper}} />
    );
  }
});

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
)(CreateNode);