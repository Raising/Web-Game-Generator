import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";
import { mapDispatchToProps} from ".\\BaseValue.js";

import TextInput from "..\\..\\Atoms\\TextInput.js";
import Select from "..\\..\\Atoms\\Select.js";
import PolimorfableValue from ".\\PolimorfableValue.js";

const ParamValue = createReactClass({

    render: function() {
        return (
          <div>
            <Select className="" name="Input Param" resource="inputNames" propertyName={this.props.propertyName + ".name"} />
            <div  className="clearfix form-group">
              <label>Attribute:</label>
              <div className="pull-right">
                <PolimorfableValue  name="Attribute" propertyName={this.props.propertyName + ".attribute"}/>
              </div>
            </div>
          </div>
        );
    },
    defaultValueStructure : function(selectedElementState){
      return {name: selectedElementState.inputNames[0] !== undefined ? selectedElementState.inputNames[0].key : ""};
    },
});

const mapStateToProps = (state, ownProps) => {
  let modelValue = state.getCurrentElement().getPropertyDot(ownProps.propertyName);
  return {
      currentValue: modelValue !== undefined ? modelValue : "",
      defaultValue: state.getResource("inputNames")[0],
  };
};
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParamValue);