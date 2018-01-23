import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";

import OptionalLabel from "..\\..\\..\\Atoms\\OptionalLabel.js";

const CreateSimplifiedNode = createReactClass({

  render: function() {
    return (
      <div className="simplifiedNode">
        <OptionalLabel className="nodeType" propertyName = { this.props.propertyName + ".nodeType" } />
        <OptionalLabel className="nodeName" propertyName = { this.props.propertyName + ".id" } />
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
)(CreateSimplifiedNode);