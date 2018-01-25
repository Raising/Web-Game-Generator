import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";
import styled from "styled-components";

import List from "..\\..\\..\\Atoms\\List.js";
import ParameterBubble from "..\\..\\..\\Atoms\\ParameterBubble.js";

const SideParameters = createReactClass({
  render: function() {
    return (
      <StyledList 
        side= {this.props.side}
        propertyName = { this.props.propertyName }
        listElement = {{
          name:"Param",
          side:this.props.side,
          type:ParameterBubble,
          defaultValue:ParameterBubble.WrappedComponent.prototype.defaultValueStructure()
        }} 
      />
    );
  },
});

const mapStateToProps = (state, ownProps) => {
  return {
  };
}
  
const mapDispatchToProps = (dispatch,ownProps) => {
  return {  
  };
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(SideParameters);

const StyledList = styled(List)`
  height: 99%;
  width: 10px;
  background-color: rgb(245, 245, 245);
  position: absolute;
  border-radius: 5px;
  top: 0.5%;
  box-shadow: inset ${props => props.side === "right" ? "-" : "" }1px 1px 1px 1px #AAA;
  ${props => props.side }:-7.5%;
`;