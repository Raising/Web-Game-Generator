import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";


import TextInput from "..\\..\\..\\Atoms\\Clusters\\LabelTextInput.js";
import PolimorfableOperand from ".\\PolimorfableOperand.js";

const EntityByNameOperand = createReactClass({
  render: function() {
    return (
      <div>
        <TextInput propertyName={this.props.propertyName  + ".name"}/>
        <div  className="clearfix form-group">
          <label>Attribute:</label>
          <div className="pull-right">
            <PolimorfableOperand  name="Attribute" propertyName={this.props.propertyName + ".attribute"}/>
          </div>
        </div>
      </div>
    );
  },
  defaultValueStructure : function(){
    return {name: "entityName", attribute: ""};
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
)(EntityByNameOperand);