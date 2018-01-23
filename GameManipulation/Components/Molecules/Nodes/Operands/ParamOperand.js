import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";
import { mapDispatchToProps} from ".\\BaseOperand.js";

import LineTo from "..\\..\\..\\Atoms\\LineTo.js";
import OperandWrapper from ".\\OperandWrapper.js";
import Select from "..\\..\\..\\Atoms\\Select.js";

const ParamOperand = createReactClass({

    render: function() {
        return (
          <div anchor="im an anchor" className={ "Anchor_" + this.$Id()}>
            <LineTo delay={50} from={"Anchor_" + this.props.currentValue.name} to ={"Anchor_" + this.$Id()} fromAnchor="center right" toAnchor = "center left"/>
            <Select className="" name="Input Param" resource="inputNames" propertyName={this.props.propertyName + ".name"} />
            <div  className="clearfix form-group">
              <label>Attribute:</label>
              <div className="pull-right">
                <OperandWrapper  name="Attribute" propertyName={this.props.propertyName + ".attribute"}/>
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
      currentValue: modelValue !== undefined ? modelValue : ""
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParamOperand);