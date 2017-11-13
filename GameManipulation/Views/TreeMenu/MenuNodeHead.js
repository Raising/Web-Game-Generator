import React from "react";
import {connect} from 'react-redux';

const MenuNodeHead = function({basePath = "",onClick}){
    let name = basePath.split(".").pop(); 
    return(
      <a onClick={onClick} >{name}</a>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
       
    };
}
  
const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        onClick : () => dispatch({
            type: "SELECT_MENU_ELEMENT",
            payload: {
                elementId: ownProps.basePath
            }
        })
    }
}
  
export default connect(
   mapStateToProps,
   mapDispatchToProps
)(MenuNodeHead);