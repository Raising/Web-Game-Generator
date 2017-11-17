import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";

import TextInput from ".\\TextInput.js";
import ErrorMessage from ".\\ErrorMessage.js";

const MapList = createReactClass({
    renderListItems: function() {
        return Object.keys(this.props.map).map( (elementKey) => {
            if (elementKey.startsWith("_")) return null;
            return (
                <div  key={elementKey} className="form-control">
                    <label>{elementKey}:</label>
                    {React.createElement(this.props.ListElement.type,
                        {   
                            className:"pull-right",
                            propertyName:this.props.propertyName + "."+ elementKey
                        }
                    )}
                </div>
            )
        });
    },
    render: function() {
        return (
            <div className="form-group">
                <label key="title">{this.props.name} 
                    <a key="title" onClick={this.props.addElement}>AddElement</a>
                </label> 
                <TextInput className="pull-right" propertyName={this.props.propertyName + "._newChildKey"}/>
                <ErrorMessage  propertyName={this.props.propertyName + "._error"}/>
                {this.renderListItems()}
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
                type: "ADD_CHILDMAP_TO_SELECTED_ELEMENT_PROPERTY",
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