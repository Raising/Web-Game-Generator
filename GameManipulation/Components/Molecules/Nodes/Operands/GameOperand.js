import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";
import TextInput from "..\\..\\..\\Atoms\\Clusters\\LabelTextInput.js";

const GameOperand = createReactClass({
  render: function() {
    return (
      <TextInput propertyName={this.props.propertyName + ".attribute"}/>
    );
  },
  defaultValueStructure : function(){
    return {attribute: "no value"};
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
)(GameOperand);