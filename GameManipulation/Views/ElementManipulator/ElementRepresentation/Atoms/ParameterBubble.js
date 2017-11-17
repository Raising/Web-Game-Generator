import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";

const ParameterBubble = createReactClass({
    render: function() {
        return (
            <div  className="parameter">{this.props.currentValue.name} </div>
        );
    }
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