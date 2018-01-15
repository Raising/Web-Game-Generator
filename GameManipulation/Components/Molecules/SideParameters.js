import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";

import List from "..\\Atoms\\List.js";
import ParameterBubble from "..\\Atoms\\ParameterBubble.js";

const SideParameters = createReactClass({
  render: function() {
    let styleClasses = "parametersColumn " + this.props.style; 

    return (
      <List className={styleClasses}
        propertyName = { this.props.propertyName }
        listElement = {{
          name:"Param",
          type:ParameterBubble,
          defaultValue:ParameterBubble.WrappedComponent.prototype.defaultValueStructure()
        }} 
      />
    );
  },
  
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
)(SideParameters);