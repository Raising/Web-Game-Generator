import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";

const List = createReactClass({
  renderListItems: function() {
    return this.props.elements.map( (element,index) => {
      return React.createElement(this.props.listElement.type,
        Object.assign(this.props.listElement,
        {
          key:index,
          propertyName:this.props.propertyName + "."+ index + (this.props.attributeName !== undefined ?  "." + this.props.attributeName : ""),
        })
      )
    });
  },
  render: function() {
    return (
      <div className = { this.props.className }>
        <label>{this.props.name}<a onClick={this.props.addElement}>Add {this.props.listElement.name}</a></label> 
        {this.renderListItems()} 
      </div>
    );
  }
});

const mapStateToProps = (state, ownProps) => {
    let elements = state.getCurrentElement().getPropertyDot(ownProps.propertyName);
    if (elements === undefined){
        elements = [];
    } 
    if (ownProps.attributeName !== undefined){
        elements = elements.map( element => element.getPropertyDot(ownProps.attributeName));
    }
    return {
      elements : (state.getCurrentElement().getPropertyDot(ownProps.propertyName) || [] )
    };
}
  
const mapDispatchToProps = (dispatch,ownProps) => {
  return {
    addElement: (e) => {
      ownProps.onAdd ? ownProps.onAdd(e) : null; 

      return dispatch({
        type: "ADD_CHILD_TO_SELECTED_ELEMENT_PROPERTY",
        payload: {
          keyAttribute: "key",
          newValue: ownProps.listElement.defaultValue,
          propertyName: ownProps.propertyName
        }
      });
    }
  }
}
  
export default connect(
   mapStateToProps,
   mapDispatchToProps
)(List);