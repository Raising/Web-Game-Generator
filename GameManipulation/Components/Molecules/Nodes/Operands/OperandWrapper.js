import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";

import PolimorfableOperand from ".\\PolimorfableOperand.js";
import List from "..\\..\\..\\Atoms\\List.js";
import OperationWrapper from "..\\..\\..\\Molecules\\Nodes\\Operations\\OperationWrapper.js";

const OperandWrapper = createReactClass({
    hasOperations: function(){
        return this.props.currentValue.baseValue !== undefined;
    },

    valueWithOperations: function(){
        return (
            <div className="" >
                <PolimorfableOperand propertyName={this.props.propertyName + ".baseValue"}/>
                <List propertyName={this.props.operations + ".operations"} ListElement = {{type:OperationWrapper}} />
            </div>
        );
    },

    /// This case is to support handMade json that place a value without the baseValue wrapper  
    valueAlone: function(){
        return (
            <PolimorfableOperand propertyName={this.props.propertyName}/>
        );
    },
    
    render: function() {
        if (this.hasOperations()){
           return this.valueWithOperations();
        }else{
           return this.valueAlone();
        }
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
}
  
export default connect(
   mapStateToProps,
   mapDispatchToProps
)(OperandWrapper);