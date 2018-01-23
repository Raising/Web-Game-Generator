import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";
import LineToModule from 'react-lineto';

const OptionalLabel = createReactClass({
  render: function() {
    return React.createElement(LineToModule, this.props)
  }
});

const mapStateToProps = (state, ownProps) => {
    return {
       // currentValue: state.getCurrentElement().getPropertyDot(ownProps.propertyName) || ""
    };
};

const mapDispatchToProps = (dispatch,ownProps) => {
    return {
    }
};

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(OptionalLabel);