import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";

const ErrorMessage = createReactClass({
    render: function() {
        if (this.props.currentValue === ""){
            return null;
        }else{
            return (
                <div className="alert alert-danger">
                    <strong>Error: </strong>{this.props.currentValue}
                </div>
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