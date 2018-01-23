import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";
import styled from "styled-components";

const Label = createReactClass({
  
  render: function() {  
    if (this.props.name === undefined || this.props.name ===  ""){
      return null;
    }else{
      return (<StyledLabel>{this.props.name} </StyledLabel>);
    }
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
  };
};

const mapDispatchToProps = (dispatch,ownProps) => {
  return {
  }
};

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Label);


const StyledLabel = styled.label`
  color: green;
`;