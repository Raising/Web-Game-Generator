import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";

const List = createReactClass({
    renderListItems: function() {
        return this.props.elements.map( (element,index) => {
            return React.createElement(this.props.ListElement.type,
                    {
                        key:index,
                        propertyName:this.props.propertyName + "."+ index + (this.props.attributeName !== undefined ?  "." + this.props.attributeName : "")
                    }
                )
        });
    },
    render: function() {
        return (
            <div><label>{this.props.name}<a onClick={this.props.addElement}>AddElement</a></label> {this.renderListItems()} </div>
        );
    }
});

const mapStateToProps = (state, ownProps) => {
    let elements = state.getCurrentElement().getProperty(ownProps.propertyName);
    if (elements === undefined){
        elements = [];
    } 
    if (ownProps.attributeName !== undefined){
        elements = elements.map( element => element[ownProps.attributeName]);
    }
    return {
      elements : (state.getCurrentElement().getProperty(ownProps.propertyName) || [] )
      
    };
}
  
const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        addElement: (e) => {
            return dispatch({
                type: "ADD_CHILD_TO_SELECTED_ELEMENT_PROPERTY",
                payload: {
                    newValue: ownProps.ListElement.defaultValue || undefined,
                    propertyName: ownProps.propertyName
                }
            })
        }
    }
}
  
export default connect(
   mapStateToProps,
   mapDispatchToProps
)(List);