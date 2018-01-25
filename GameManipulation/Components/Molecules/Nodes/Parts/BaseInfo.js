import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";
import styled from "styled-components";

import Select from "..\\..\\..\\Atoms\\Select.js";
import TextInput from "..\\..\\..\\Atoms\\Clusters\\LabelTextInput.js";

const BaseInfo = createReactClass({
  render: function() {
    return (
      <StyledBaseInfo className = {this.props.className}>
        <Select name="Node Type" propertyName="nodeType" resource="nodeTypes"/>
        <TextInput name = "Name" propertyName="name" maxSize="30" />
        <TextInput name = "Description" propertyName="description" maxSize="100" />
      </StyledBaseInfo>
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


const StyledBaseInfo = styled.div`
  background:rgba(200,200,200,0.6);
  padding: 10px;
  position: relative;
  
  border-bottom: 2px solid grey;
  border-radius: 5px 5px 0px 0px;
 `