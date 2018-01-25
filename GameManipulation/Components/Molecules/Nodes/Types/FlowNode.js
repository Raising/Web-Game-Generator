import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";

import SimplifiedNode from "..\\..\\..\\Molecules\\Nodes\\SimplifiedNodes\\SimplifiedNode.js";

const FlowNode = createReactClass({
  renderFlow: function(){
    return this.props.flowNodes.map( (element,index) => {
      return React.createElement(SimplifiedNode,
        {
          key:index,
          propertyName:"nodes."+ index 
        }
      )
    });
  },
  render: function() { 
    return (
      <div>
        {this.renderFlow()}
      </div>
    );
  }
});

const mapStateToProps = (state, ownProps) => {
    return {
      flowNodes: state.getCurrentElement().nodes
    };
}
  
const mapDispatchToProps = (dispatch,ownProps) => {
    return {};
}
  
export default connect(
   mapStateToProps,
   mapDispatchToProps
)(FlowNode);

