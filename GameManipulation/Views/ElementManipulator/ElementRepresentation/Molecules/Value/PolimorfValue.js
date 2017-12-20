import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";

import TextInput from "..\\..\\Atoms\\TextInput.js";
import Select from "..\\..\\Atoms\\Select.js";
import ParamValue from ".\\ParamValue.js";

const PolimorfValue = createReactClass({  
    rawValue: function(){
        return <TextInput  propertyName={this.props.propertyName}  />
    },

    composedValue: function(){
      if (this.props.currentValue.type !== undefined)  {
        return (
            <div>
              <Select name="Type" propertyName={this.props.propertyName + ".type"} resource="propertyTypes"/>
              <ParamValue propertyName={this.props.propertyName} />
            </div>
        );
      }
      // switch (this.props.currentValue.type) {
          
      //       case "param":
      //           return <ParamValue propertyName={this.props.propertyName} />
      //       break;
        
      //       default:
      //       break;
      //   }
        return(
            <div/>
        )
    },

    render: function() {

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
)(PolimorfValue);