import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";

const MapList = createReactClass({
    render: function() {
        let valueView = this.props.ListElement.value;
        let elements = Object.keys(this.props.map).map( key => (
            <div key={key}>
                <div>{key}</div>
                <div><valueView listKey={key} propertyName={this.props.propertyName} /></div>
            </div>
        ));

        return (
            <div> Map List {elements}</div>
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
        
    }
}
  
export default connect(
   mapStateToProps,
   mapDispatchToProps
)(MapList);