import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";

import PolimorfableValue from ".\\PolimorfableValue.js";
import List from "..\\..\\Atoms\\List.js";

const PolimorfableValueWrapper = createReactClass({
    hasOperations: function(){
        return this.props.currentValue.baseValue !== undefined;
    },

    valueWithOperations: function(){
        return (
            <div className="" >
                <PolimorfableValue propertyName={this.props.propertyName + ".baseValue"}/>
            </div>
        );
        // <List propertyName={this.props.operations + ".operations"}  />
    },

    /// This case is to support handMade json that place a value without the baseValue wrapper  
    valueAlone: function(){
        return (
            <PolimorfableValue propertyName={this.props.propertyName}/>
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
)(PolimorfableValueWrapper);