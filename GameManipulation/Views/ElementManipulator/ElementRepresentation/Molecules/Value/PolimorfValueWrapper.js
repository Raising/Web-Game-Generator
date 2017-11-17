import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";

import PolimorfValue from ".\\PolimorfValue.js";
import List from "..\\..\\Atoms\\List.js";

const PolimorfValueWrapper = createReactClass({
    hasOperations: function(){
        return this.props.currentValue.baseValue !== undefined;
    },

    valueWithOperations: function(){
        return (
            <div className="pull-right">
                <PolimorfValue propertyName={this.props.propertyName + ".baseValue"}/>
            </div>
        );
       // <List propertyName={this.props.operations + ".operations"}  />
    },

    valueAlone: function(){
        return (
            <div className="pull-right">
                <PolimorfValue propertyName={this.props.propertyName}/>
            </div>
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
)(PolimorfValueWrapper);