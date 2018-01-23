import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";
import Select from "..\\..\\..\\Atoms\\Select.js";
import TextInput from "..\\..\\..\\Atoms\\Clusters\\LabelTextInput.js";
import OptionalLabel from "..\\..\\..\\Atoms\\OptionalLabel.js";

import PrimitiveSimplifiedNode from ".\\PrimitiveSimplifiedNode.js";

const SimplifiedNode = createReactClass({

  render: function() {
    if (this.props.currentValue.nodeType === "Primitive"){
      return <PrimitiveSimplifiedNode propertyName = { this.props.propertyName }/>
    }
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
)(SimplifiedNode);