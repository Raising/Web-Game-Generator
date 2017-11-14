import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";

const List = createReactClass({
    renderListItems: function() {
        return this.props.elements.map( (element,index) => {
            return React.createElement(this.props.ListElement.type,
                    {
                        key:index,
                        propertyName:this.props.propertyName + "."+ index
                    }
                )    
          
        });
    },
    render: function() {
        return (
            <div><label>{this.props.name}</label> {this.renderListItems()} </div>
        );
    }
});

const mapStateToProps = (state, ownProps) => {
    return {
      elements : state.getCurrentElement().getProperty(ownProps.propertyName) || []
      
    };
}
  
const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        
    }
}
  
export default connect(
   mapStateToProps,
   mapDispatchToProps
)(List);