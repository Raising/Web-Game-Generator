import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";
import styled from "styled-components";

import SideParameters from "..\\..\\Molecules\\Nodes\\Parts\\SideParameters.js";
import CreateNode from "..\\..\\Molecules\\Nodes\\Types\\CreateNode.js";
import FlowNode from "..\\..\\Molecules\\Nodes\\Types\\FlowNode.js";
import BaseInfo from "..\\..\\Molecules\\Nodes\\Parts\\BaseInfo.js";

const NodeRepresentation = createReactClass({
  nodeType:{
    Flow:FlowNode,
    Create:CreateNode,
  },

  renderNode: function(){
    let currentNodeRepresentation = this.nodeType[this.props.currentValue.nodeType];
    return currentNodeRepresentation !== undefined ? React.createElement(currentNodeRepresentation,{}) : "div";
  },

  render: function() {
  return (
    <StyledNodeCanvas >
      <SideParameters side="left" propertyName="inputNames"/>
      <SideParameters side="right" propertyName="outputNames" />
      <BaseInfo />
        <StyledNodeRepresentation>
          {this.renderNode()}
        </StyledNodeRepresentation> 
    </StyledNodeCanvas> 
  );
  }
});

const mapStateToProps = (state, ownProps) => {
    return {
      currentValue: state.getCurrentElement() || ""
    };
}
  
const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NodeRepresentation);

const StyledNodeCanvas = styled.div`
  position: relative;
  height: 800px;
  width : 90%;
  left: 5%;
  background-color: rgb(242, 254, 241);
  border: 1px solid #3bb61c;
  border-radius: 10px;
`;

const StyledNodeRepresentation = styled.div`
  background: #ffeebf;
  width: 100%;
  position: relative;
  top: 2px;
  border-radius: 0px;
  padding: 10px;
  box-sizing: border-box;
`;

const StyledBaseInfo = styled(BaseInfo)`
  left:5%;
  width: 90%;
`;
