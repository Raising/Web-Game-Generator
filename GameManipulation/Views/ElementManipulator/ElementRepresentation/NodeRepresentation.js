import React from "react";
import {connect} from 'react-redux';
import InputParameters from ".\\Molecules\\InputParameters.js";
import OutputParameters from ".\\Molecules\\OutputParameters.js";
import NodeBodyCreate from ".\\NodeBody\\NodeBodyCreate.js";
import createReactClass from "create-react-class";

const NodeRepresentation = createReactClass({
    render: function() {
    let nodeBody = <NodeBodyCreate/>;
    return (
            <div className="nodeSurface">
                <InputParameters />
                <OutputParameters />
                {nodeBody}
            </div> 
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
)(NodeRepresentation);