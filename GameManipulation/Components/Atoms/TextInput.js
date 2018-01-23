import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";
import styled from "styled-components";

const TextInput = createReactClass({
    render: function() {
      
        return (
            <div >
                {this.props.name !== undefined ? (<label>{this.props.name} </label>) : ""}
                <StyledInput onChange={this.props.onChange} value={this.props.currentValue} placeholder="InsertText"/> 
            </div>
        );
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
)(TextInput);


const StyledInput = styled.input`
  width: 140px;
  border: 2px solid green;
  border-radius: 4px;
  &:focus {
    border-color: purple;
  }
`;