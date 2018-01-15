import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";
import { mapDispatchToProps,mapStateToProps} from ".\\BaseOperand.js";

import OperandWrapper from ".\\OperandWrapper.js";
import Select from "..\\..\\..\\Atoms\\Select.js";

const ParamOperand = createReactClass({

    render: function() {
        return (
          <div>
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

  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParamOperand);