import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";

const OptionalLabel = createReactClass({
  render: function() {
    if (this.props.currentValue === ""){
      return null;
    }else{
      return (
        <label className={ this.props.className}>{this.props.currentValue}</label>
      );
    }
  }
});

const mapStateToProps = (state, ownProps) => {
    return {
        currentValue: state.getCurrentElement().getPropertyDot(ownProps.propertyName) || ""
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