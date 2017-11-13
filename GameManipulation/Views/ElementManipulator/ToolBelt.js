import React from "react";
import {connect} from 'react-redux';

const ToolBetl = function({}){
    
    return(
        <div className="alert alert-warning">
            <strong>TOOL BELT!</strong> Soon To Be implemented
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
    };
}
  
const mapDispatchToProps = (dispatch,ownProps) => {
    return {
    };
}
  
export default connect(
   mapStateToProps,
   mapDispatchToProps
)(ToolBetl);