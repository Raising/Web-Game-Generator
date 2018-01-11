import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";

import TextInput from "..\\..\\Atoms\\TextInput.js";
import Select from "..\\..\\Atoms\\Select.js";

//posible value representations
import ParamValue from ".\\ParamValue.js";
import RawValue from ".\\RawValue.js";
import EntityPropertyValue from ".\\EntityPropertyValue.js";
import EntityByNameValue from ".\\EntityByNameValue.js";
import ListValue from ".\\ListValue.js";
import GameValue from ".\\GameValue.js";
import ReduceValue from ".\\ReduceValue.js";

const valueClass = {
  param : ParamValue,
  raw : RawValue,
  entityProperty : EntityPropertyValue ,
  entityByName : EntityByNameValue ,
  list : ListValue ,
  game : GameValue ,
  reduce : ReduceValue ,
};

const PolimorfableValue = createReactClass({  
    composedValue: function(){
      return (
        <div className="">
          <Select onChange={this.props.onChangeType}  className="valueTypeSelector" name="(T)" resource="propertyTypes" propertyName={this.props.propertyName + ".type"} />
          {React.createElement(valueClass[this.props.currentValue.type || "raw"], { propertyName:this.props.propertyName })}
        </div>
      );
    },

    render: function() {
      return this.composedValue();
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
      onChangeType: (e) => {
        let newStaticValueClass = valueClass[e.currentTarget.value].WrappedComponent.prototype; 
        
        return dispatch({
          type: "CHANGE_SELECTED_ELEMENT_PROPERTY",
          payload: {
            newValue: (selectedElementState) => Object.assign({type:e.currentTarget.value}, newStaticValueClass.defaultValueStructure(selectedElementState)),
            
            propertyName: ownProps.propertyName
          }
        })
      }
    }
}
  
export default connect(
   mapStateToProps,
   mapDispatchToProps
)(PolimorfableValue);