import React from "react";
import {connect} from 'react-redux';
import SideParameters from "..\\..\\Molecules\\SideParameters.js";
import NodeBodyCreate from "..\\..\\Molecules\\Nodes\\NodeBodyCreate.js";
import createReactClass from "create-react-class";

const NodeRepresentation = createReactClass({
    render: function() {
    let nodeBody = <NodeBodyCreate/>;
    return (
            <div className="nodeSurface">
                <SideParameters style="input" propertyName="inputNames"/>
                <SideParameters style="output" propertyName="outputNames" />
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