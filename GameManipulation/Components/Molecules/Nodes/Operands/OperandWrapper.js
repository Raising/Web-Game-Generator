import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";

import PolimorfableOperand from ".\\PolimorfableOperand.js";
import List from "..\\..\\..\\Atoms\\List.js";
import Operation from "..\\..\\..\\Molecules\\Nodes\\Operations\\Operation.js";

const OperandWrapper = createReactClass({
  isStructured: function(){
    return this.props.currentValue.baseValue !== undefined;
  },

  valueWithOperations: function(){
    return (
      <div className="operand" >
        <PolimorfableOperand propertyName = { this.isStructured() ? this.props.propertyName + ".baseValue" : this.props.propertyName } />
        <List 
          propertyName = { this.props.propertyName + ".operations" }
          onAdd = {!this.isStructured() ? this.props.onAddOperation : undefined } 
          listElement = {{
            name:"Operation",
            type:Operation,
            defaultValue:Operation.WrappedComponent.prototype.defaultValueStructure()
          }} 
        />
      </div>
    );
  },

  render: function() {
    return this.valueWithOperations();
  }
});

const mapStateToProps = (state, ownProps) => {
    let modelValue = state.getCurrentElement().getPropertyDot(ownProps.propertyName); 
    return {
        currentValue: modelValue !== undefined ? modelValue : ""
    };
}
  
const mapDispatchToProps = (dispatch,ownProps) => {
  return {
    onAddOperation: (e) => {
      return dispatch({
        type: "CHANGE_SELECTED_ELEMENT_PROPERTY",
        payload: {
          newValue: (state) => { 
            return {baseValue : state.getPropertyDot(ownProps.propertyName), 
                    operations : []
                  }
              },
          propertyName: ownProps.propertyName
        }
      })
    }
  }
}
  
export default connect(
   mapStateToProps,
   mapDispatchToProps
)(OperandWrapper);