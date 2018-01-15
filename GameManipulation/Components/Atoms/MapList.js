import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";

import TextInput from ".\\TextInput.js";
import ErrorMessage from ".\\ErrorMessage.js";

const MapList = createReactClass({
  renderMapItems: function() {
    return Object.keys(this.props.map).map( (elementKey) => {
      if (elementKey.startsWith("_")) return null;
      return (
        <div  key={elementKey} className="clearfix form-group">
          <label>{elementKey}:</label>
          <div className="pull-right">
          {React.createElement(this.props.listElement.type,
            {   
              propertyName:this.props.propertyName + "." + elementKey
            }
          )}
          </div>
        </div>
      )
    });
  },
  renderAddElement: function(){
    return (
      <div className="clearfix form-group">
        <label key="title">{this.props.name} 
          <a key="title" onClick={this.props.addElement}>(+)</a>
        </label> 
        <TextInput className="pull-right" propertyName={this.props.propertyName + "._newChildKey"}/>
        <ErrorMessage  propertyName={this.props.propertyName + "._error"}/>
      </div>
    ); 
  },
  render: function() {
    return (
      <div className="mappedGroup"> 
        {this.renderAddElement()}
        {this.renderMapItems()}
      </div>
    );
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    map : state.getCurrentElement().getPropertyDot(ownProps.propertyName) || {}
  };
}
  
const mapDispatchToProps = (dispatch,ownProps) => {
  return {
    addElement: (e) => {
      return dispatch({
        type: "ADD_MAPPED_CHILD_TO_SELECTED_ELEMENT_PROPERTY",
        payload: {
          elementKeyProperty: "_newChildKey",
          newValue: undefined,
          propertyName: ownProps.propertyName
        }
      })
    }
  }
}
  
export default connect(
   mapStateToProps,
   mapDispatchToProps
)(MapList);