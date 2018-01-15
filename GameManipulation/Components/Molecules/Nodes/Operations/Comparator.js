import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";
import TextInput from "..\\..\\..\\Atoms\\TextInput.js";
import OperandWrapper from "..\\..\\..\\Molecules\\Nodes\\Operands\\OperandWrapper.js";
import Select from "..\\..\\..\\Atoms\\Select.js";

const Comparator = createReactClass({
  render: function() {
    return (
      <div>
        <Select className="" resource="comparators" propertyName={this.props.propertyName + ".operator"} />
        <OperandWrapper propertyName={this.props.propertyName + ".operands.0.attribute"}/>
        <OperandWrapper propertyName={this.props.propertyName + ".operands.1.attribute"}/>
      </div>
    );
  },
  defaultValueStructure : function(selectedElementState){
    return {
        operator:">",
        operands:[
          {type:"param",name:"current", attribute:""}, 
          {type:"param",name:"candidate",attribute:""}
        ]
    };
  },
});

const mapStateToProps = (state, ownProps) => {
  let modelValue = state.getCurrentElement().getPropertyDot(ownProps.propertyName);
  return {
      currentValue: modelValue !== undefined ? modelValue : ""
  };
};

const mapDispatchToProps = (dispatch,ownProps) => {
  return {
    onChange: (e) => {
      return dispatch({
        type: "CHANGE_SELECTED_ELEMENT_PROPERTY",
        payload: {
          newValue: e.currentTarget.value,
          propertyName: ownProps.propertyName
        }
      })
    }
  }
};
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comparator);