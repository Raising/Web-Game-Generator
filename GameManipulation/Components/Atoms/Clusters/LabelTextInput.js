import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";
import styled from "styled-components";
import Container from "..\\..\\Atoms\\Container.js";
import TextInput from "..\\..\\Atoms\\TextInput.js";
import Label from "..\\..\\Atoms\\Label.js";

const LabelTextInput = createReactClass({
    render: function() {
      return (
        <div>
          <Label key="Name" name = {this.props.name} />
          <TextInput key= "Input" propertyName= {this.props.propertyName}/>
        </div>
        // <Container elements={[
        //     <Label key="Name" name = {this.props.currentValue.name} />,
        //     <TextInput key= "Input" propertyName= {this.props.propertyName}/>
        // ]}/>
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
    }
};

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(LabelTextInput);
