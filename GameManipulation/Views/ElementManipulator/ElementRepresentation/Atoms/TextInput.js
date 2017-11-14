import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";

const TextInput = createReactClass({
    render: function() {
        return (
            <div><label>{this.props.name}: </label>{this.props.currentValue} </div>
        );
    }
});

const mapStateToProps = (state, ownProps) => {
    return {
        currentValue: state.getCurrentElement().getPropertyDot(ownProps.propertyName)
    };
}
  
const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        
    }
}
  
export default connect(
   mapStateToProps,
   mapDispatchToProps
)(TextInput);