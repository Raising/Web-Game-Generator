import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";

const Select = createReactClass({
    
    claculateOptions: function(){
        return this.props.options.map( (option,index) => {
          option = this.preProcessOptionObject(option,index);

          return (
            <option  value={option.key || option.value} key={option.key || option.value }  >
              {option.name}
            </option>
          )
        });
    },
    render: function() {
      return (
        <div className={this.props.className} >
            <label>{this.props.name}: </label>
            <select value={this.props.currentValue} onChange ={this.props.onChange}>
              {this.claculateOptions()}
            </select>
        </div>
      );
    },

    preProcessOptionObject : function(option,index){
      option = this.parseUndefinedOption(option,index);
      option = this.parsePlainStringToOptionObject(option);
      
      return option;
    },

    parsePlainStringToOptionObject : function(option){
      if (typeof option === "string"){
        option = {
          name: option,
          key: option
          };
      }
      return option;
    },

    parseUndefinedOption : function(option,index){
      if (option === undefined) {
        option = "no Value" + index;
      }
      return option;
    },
});

const mapStateToProps = (state, ownProps) => {
    return {
      options: state.getResource(ownProps.resource),
      currentValue: state.getCurrentElement().getPropertyDot(ownProps.propertyName)
    };
}
  
const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        onChange: ownProps.onChange !== undefined ? ownProps.onChange : (e) => {
            return dispatch({
                type: "CHANGE_SELECTED_ELEMENT_PROPERTY",
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