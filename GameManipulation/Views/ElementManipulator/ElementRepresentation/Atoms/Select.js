import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";

const Select = createReactClass({
    
    claculateOptions: function(){
        return this.props.options.map( option => {
            return (
                <option key={option.name} value={option.value} >
                    {option.name}
                </option>
            )
        });
    },
    render: function() {
        return (
            <div>
                <label>{this.props.name}: </label>
                <select value={this.props.currentValue} onChange ={this.props.onChange}>
                    {this.claculateOptions()}
                </select> 
            </div>
        );
    }
});

const mapStateToProps = (state, ownProps) => {
    return {
      options: state.getResource(ownProps.resource),
      currentValue: state.getCurrentElement().getPropertyDot(ownProps.propertyName)
    };
}
  
const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        onChange: (e) => {
            return dispatch({
                type: "CHANGE_ELEMENT_PROPERTY",
                payload: {
                    newValue: e.currentTarget.value,
                    propertyName: ownProps.propertyName
                }
            })
        }
    }
}
  
export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Select);