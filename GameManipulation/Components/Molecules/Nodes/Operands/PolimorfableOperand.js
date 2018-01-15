import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";

import TextInput from "..\\..\\..\\Atoms\\TextInput.js";
import Select from "..\\..\\..\\Atoms\\Select.js";

//posible value representations
import ParamOperand from ".\\ParamOperand.js";
import RawOperand from ".\\RawOperand.js";
import EntityByNameOperand from ".\\EntityByNameOperand.js";
import ListOperand from ".\\ListOperand.js";
import GameOperand from ".\\GameOperand.js";
import ReduceOperand from ".\\ReduceOperand.js";

const valueClass = {
  param : ParamOperand,
  raw : RawOperand,
  entityByName : EntityByNameOperand ,
  list : ListOperand ,
  game : GameOperand ,
  reduce : ReduceOperand ,
};

const PolimorfableOperand = createReactClass({  
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
)(PolimorfableOperand);