import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";
import Select from "..\\..\\..\\Atoms\\Select.js";
import TextInput from "..\\..\\..\\Atoms\\Clusters\\LabelTextInput.js";
import OptionalLabel from "..\\..\\..\\Atoms\\OptionalLabel.js";
import styled from "styled-components";

import PrimitiveSimplifiedNode from ".\\PrimitiveSimplifiedNode.js";

const SimplifiedNode = createReactClass({

  render: function() {
    if (this.props.currentValue.nodeType === "Primitive"){
      return <StyledPrimitiveSimplifiedNode baseStyle={StyledSimplifiedNode} propertyName = { this.props.propertyName }/>
    }
    return (
      <StyledSimplifiedNode>
        <StyledTypeLabel propertyName = { this.props.propertyName + ".nodeType" } />
        <StyledNameLabel propertyName = { this.props.propertyName + ".id" } />
      </StyledSimplifiedNode>
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
)(SimplifiedNode);

const StyledSimplifiedNode = styled.div`
  background-color: rgba(207, 97, 158, 0.616);
  margin: 20px auto;
  width: 180px;
  padding: 10px;
  border-radius: 10px;
`;


const StyledPrimitiveSimplifiedNode = styled(PrimitiveSimplifiedNode)`
  background-color: rgba(207, 97, 158, 0.616);
  margin: 20px auto;
  width: 180px;
  padding: 10px;
  border-radius: 10px;
`

const StyleNodelLabel = styled(OptionalLabel)`
  border-radius: 5px;
  padding: 3px;
  margin: 5px;
`;

const StyledTypeLabel = styled(StyleNodelLabel)`
  background-color: rgba(129, 197, 97, 0.616);
`;

const StyledNameLabel = styled(StyleNodelLabel)`
  background-color: rgba(207, 181, 97, 0.616);
`;