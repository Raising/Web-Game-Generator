import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";

const PloimorfValue = createReactClass({
    render: function() {
        return (
            <div> PolimorfValue </div>
        );
    }
});

const mapStateToProps = (state, ownProps) => {
    return {
      
    };
}
  
const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        
    }
}
  
export default connect(
   mapStateToProps,
   mapDispatchToProps
)(PloimorfValue);