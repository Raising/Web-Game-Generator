import React from "react";
import {connect} from 'react-redux';

import ParameterBubble from "..\\Atoms\\ParameterBubble.js";

const SideParameters = function({elements = [],propertyName = "", style = "input"}){
    let parameters = elements.map((parameterName,index) => {
        return <ParameterBubble key={index} propertyName={propertyName + "." + index}/>;
    });
    
    let styleClasses = "parametersColumn " + style; 

    return (
        <div className={styleClasses}>
            {parameters}
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
       elements: state.getCurrentElement().getPropertyDot(ownProps.propertyName) || []
    };
}
  
const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        
    }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(SideParameters);