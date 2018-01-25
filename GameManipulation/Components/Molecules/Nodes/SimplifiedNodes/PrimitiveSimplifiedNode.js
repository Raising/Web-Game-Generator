import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";
import styled from "styled-components";

import OptionalLabel from "..\\..\\..\\Atoms\\OptionalLabel.js";
import OperandWrapper from "..\\..\\..\\Molecules\\Nodes\\Operands\\OperandWrapper.js";

const PrimitiveSimplifiedNode = createReactClass({

  render: function() {
    return (
      <StyledSimplifiedPrimitive className={this.props.className}>
        <OperandWrapper propertyName ={this.props.propertyName + ".value"} />
      </StyledSimplifiedPrimitive>
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

const StyledSimplifiedPrimitive = styled.div`
  margin-left: 0px !important; 
`;