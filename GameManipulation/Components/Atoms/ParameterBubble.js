import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";
import TextInput from ".\\TextInput.js";
import styled from "styled-components";

const ParameterBubble = createReactClass({
  render: function() {
    return (
      <StyledParameter side = {this.props.side} >
        <TextInput propertyName = {this.props.propertyName + ".name"} />
      </StyledParameter>
    );
  },

  defaultValueStructure : function(selectedElementState){
    return {
      baseValue:{
        type:"raw", 
        value:"set value"
      }
    };
  },
});


const mapStateToProps = (state, ownProps) => {
    return {
        currentValue: state.getCurrentElement().getPropertyDot(ownProps.propertyName) || ""
    };
};

const mapDispatchToProps = (dispatch,ownProps) => {
  return {
    onChange: (e) => {
      return dispatch({
        type: "CHANGE_SELECTED_ELEMENT_PROPERTY",
        payload: {
          newValue: e.currentTarget.value,
          propertyName: ownProps.propertyName
        }
      })
    }
  }
};

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(ParameterBubble);

const StyledParameter = styled.div`
  position: relative;
  max-width: 50px;
  padding: 2px;
  background: #f3edae;

  margin-top: 50px;
  border: 1px #857c12 solid;

  overflow: hidden;
  transition: 0.7s cubic-bezier(0.58, 0.21, 0.29, 0.94);
  padding:2px 8px;
  z-index:100;

  &:hover,  &:focus-within{
    max-width: 160px;
  }

  border-radius: ${ props => props.side === "left" ? "0px 15px 15px 0px" : "15px 0px 0px 15px" };
  float:${ props => props.side};
  ${ props => props.side}: 2px;
  border-${ props => props.side}: 0px;
  text-align: ${ props => props.side === "left" ? "right" : "left"};
  &>span{
    float:${ props => props.side === "left" ? "right" : "left"};
  }
`;