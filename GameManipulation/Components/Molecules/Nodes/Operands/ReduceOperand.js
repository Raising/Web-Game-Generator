import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";
import TextInput from "..\\..\\..\\Atoms\\TextInput.js";
import OperandWrapper from ".\\OperandWrapper.js";
import Comparator from "..\\..\\..\\Molecules\\Nodes\\Operations\\Comparator.js";

const ReduceOperand = createReactClass({
  render: function() {
    return (
      <div>
        <div>
          <label>Group:</label>
          <div className="pull-right">
            <OperandWrapper  name="group" propertyName={this.props.propertyName + ".group"}/>
          </div>
        </div>
        <div>
          <label>Comparator:</label>
          <div className="pull-right">
            <Comparator name="comparator" propertyName={this.props.propertyName + ".comparator"}/>
          </div>
        </div>
      </div>
    );
  },
  defaultValueStructure : function(selectedElementState){
    return {
      group: {type:"game", attribute:"players"}, 
      comparator: Comparator.WrappedComponent.prototype.defaultValueStructure(selectedElementState)
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
)(ReduceOperand);