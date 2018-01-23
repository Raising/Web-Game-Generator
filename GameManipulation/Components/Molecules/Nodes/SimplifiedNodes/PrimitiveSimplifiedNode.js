import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";

import OptionalLabel from "..\\..\\..\\Atoms\\OptionalLabel.js";
import OperandWrapper from "..\\..\\..\\Molecules\\Nodes\\Operands\\OperandWrapper.js";

const PrimitiveSimplifiedNode = createReactClass({

  render: function() {
    return (
      <div className="simplifiedNode primitive">
        <OperandWrapper propertyName ={this.props.propertyName + ".value"} />
      </div>
    );
  },
});

const mapStateToProps = (state, ownProps) => {
  return {
    currentValue : state.getCurrentElement().getPropertyDot(ownProps.propertyName),
  };
};

const mapDispatchToProps = (dispatch,ownProps) => {
  return {};
};
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrimitiveSimplifiedNode);