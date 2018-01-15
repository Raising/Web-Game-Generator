import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";
import Select from "..\\..\\Atoms\\Select.js";
import TextInput from "..\\..\\Atoms\\TextInput.js";
import List from "..\\..\\Atoms\\List.js";
import MapList from "..\\..\\Atoms\\MapList.js";
import OperandWrapper from "..\\..\\Molecules\\Nodes\\Operands\\OperandWrapper.js";

const NodeBodyCreate = createReactClass({
  render: function() {
    return (
      <div className="clearfix coreCreate">
        <Select name="Node Type" propertyName="nodeType" resource="nodeTypes"/>
        <TextInput name = "Name" propertyName="name" maxSize="30" />
        <TextInput name = "Description" propertyName="description" maxSize="100" />
        <List name = "InputNames" propertyName="inputNames" attributeName="name" listElement =   {{name: "param",type:TextInput,defaultValue:{name:undefined,key:undefined}}} />
        <List name = "OutputNames" propertyName="outputNames" attributeName="name" listElement=   {{name: "param",type:TextInput,defaultValue:{name:undefined,key:undefined}}} />
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
)(NodeBodyCreate);