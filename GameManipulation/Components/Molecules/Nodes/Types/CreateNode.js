import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";

import MapList from "..\\..\\..\\Atoms\\MapList.js";
import OperandWrapper from "..\\..\\..\\Molecules\\Nodes\\Operands\\OperandWrapper.js";

import BaseInfo from "..\\..\\..\\Molecules\\Nodes\\Parts\\BaseInfo.js";

const CreateNode = createReactClass({
  render: function() { 
    return (
      <div className="clearfix coreCreate">
        <BaseInfo />
        <MapList name = "Attributes" propertyName="attributes" listElement = {{type:OperandWrapper}} />
      </div> 
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