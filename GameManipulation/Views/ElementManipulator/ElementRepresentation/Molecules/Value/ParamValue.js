import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";

import TextInput from "..\\..\\Atoms\\TextInput.js";
import Select from "..\\..\\Atoms\\Select.js";

const ParamValue = createReactClass({

    render: function() {
        return (
            <div>
                <Select name="Input Param" resource="inputNames" propertyName={this.props.propertyName + ".name"} />
                
            </div>
        );

        if (typeof this.props.currentValue === "object"){
            return this.composedValue();
        }else{
            return this.rawValue();
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
)(ParamValue);