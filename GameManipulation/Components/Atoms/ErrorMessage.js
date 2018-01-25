import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";
import styled from "styled-components";

const ErrorMessage = createReactClass({
  render: function() {
    if (this.props.currentValue === ""){
      return null;
    }else{
      return (
        <DangerAlert >
          <strong>Error: </strong>{this.props.currentValue}
        </DangerAlert>
      );
    }
  }
});

const mapStateToProps = (state, ownProps) => {
    let modelValue = state.getCurrentElement().getPropertyDot(ownProps.propertyName); 
    return {
        currentValue: modelValue !== undefined ? modelValue : ""
    };
};

const mapDispatchToProps = (dispatch,ownProps) => {
    return {
    }
};

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(ErrorMessage);

const AlertStyle = styled.div`
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid transparent;
  border-radius: 4px;
`;

const DangerAlert = styled(AlertStyle)`
  color: #a94442;
  background-color: #f2dede;
  border-color: #ebccd1;
`;

