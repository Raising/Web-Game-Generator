import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";
import TextInput from ".\\TextInput.js";

const ParameterBubble = createReactClass({
    render: function() {
        return (
            <div  className={this.props.className +" parameter " + "Anchor_" + this.props.currentValue.key }>
              <TextInput propertyName = {this.props.propertyName + ".name"} />
            </div>
        );
    },

    defaultValueStructure : function(selectedElementState){
      return {
        baseValue:{
          type:"raw", 
          value:"set value"
        }
      };
    },
});


const mapStateToProps = (state, ownProps) => {
    return {
        currentValue: state.getCurrentElement().getPropertyDot(ownProps.propertyName) || ""
    };
};

const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        onChange: (e) => {
            return dispatch({
                type: "CHANGE_SELECTED_ELEMENT_PROPERTY",
                payload: {
                    newValue: e.currentTarget.value,
                    propertyName: ownProps.propertyName
                }
            })
        }
    }
};

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(ParameterBubble);