import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";
import TextInput from "..\\..\\..\\Atoms\\Clusters\\LabelTextInput.js";
import OperandWrapper from "..\\..\\..\\Molecules\\Nodes\\Operands\\OperandWrapper.js";
import Select from "..\\..\\..\\Atoms\\Select.js";

const Comparator = createReactClass({
  render: function() {
    return (
      <div className="operation">
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
  }
};
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comparator);