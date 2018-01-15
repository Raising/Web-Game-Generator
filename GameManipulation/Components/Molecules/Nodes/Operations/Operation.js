import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";
import OperandWrapper from "..\\..\\..\\Molecules\\Nodes\\Operands\\OperandWrapper.js";
import Select from "..\\..\\..\\Atoms\\Select.js";

const Operation = createReactClass({
  render: function() {
    return (
      <div className="operation">
        <Select className="" resource="operators" propertyName={this.props.propertyName + ".operator"} />
        <OperandWrapper propertyName={this.props.propertyName + ".operands.0"}/>
      </div>
    );
  },
  defaultValueStructure : function(selectedElementState){
    return {
        operator:"+",
        operands:[
          {baseValue:{type:"raw", value:"set value"}}, 
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
)(Operation);