import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";
import Select from "..\\..\\..\\Atoms\\Select.js";
import TextInput from "..\\..\\..\\Atoms\\Clusters\\LabelTextInput.js";

const BaseInfo = createReactClass({
  render: function() {
    return (
      <div className="baseInfo">
        <Select name="Node Type" propertyName="nodeType" resource="nodeTypes"/>
        <TextInput name = "Name" propertyName="name" maxSize="30" />
        <TextInput name = "Description" propertyName="description" maxSize="100" />
      </div>
    );
  },
});

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch,ownProps) => {
  return {};
};
  
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BaseInfo);