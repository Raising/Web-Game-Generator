import React from "react";
import {connect} from 'react-redux';
import SideParameters from "..\\..\\Molecules\\Nodes\\Parts\\SideParameters.js";
import CreateNode from "..\\..\\Molecules\\Nodes\\Types\\CreateNode.js";
import FlowNode from "..\\..\\Molecules\\Nodes\\Types\\FlowNode.js";
import createReactClass from "create-react-class";

const NodeRepresentation = createReactClass({
  nodeType:{
    Flow:FlowNode,
    Create:CreateNode,
  },

  renderNode: function(){
    let currentNodeREpresentation = this.nodeType[this.props.currentValue.nodeType];
    return currentNodeREpresentation !== undefined ? React.createElement(currentNodeREpresentation,{}) : "div";
  },

  render: function() {
  return (
    <div className="nodeSurface">
      <SideParameters style="input" propertyName="inputNames"/>
      <SideParameters style="output" propertyName="outputNames" />
      {this.renderNode()}
    </div> 
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