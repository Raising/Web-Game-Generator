import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";

import TabHeader from "..\\Molecules\\TabHeader.js";
import ToolBelt from "..\\Molecules\\ToolBelt.js";
import ManipulationArea from "..\\Molecules\\ManipulationArea.js";

const ElementManipulator = createReactClass({
  render: function() {
    return (
      <div className={this.props.className}>
        <ToolBelt />
        <TabHeader />
        <ManipulationArea />
      </div>
    );
  }
});

const mapStateToProps = (state, ownProps) => {
    return {
       element: state.getCurrentElement()
    };
}
  
const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        
    }
}
  
export default connect(
   mapStateToProps,
   mapDispatchToProps
)(ElementManipulator);