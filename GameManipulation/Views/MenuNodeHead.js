import React from "react";
import {connect} from 'react-redux';

const MenuNodeHead = function({basePath = "",selectThisElement}){
    if (basePath === "") return <div/>;
    let name = basePath.split(".").pop(); 
    return(
      <a onClick={selectThisElement} >{name}</a>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
       
    };
}
  
const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        selectThisElement : () => dispatch({
            type: "SELECT_MENU_ELEMENT",
            payload: {
                elementId: ownProps.basePath
            }
        })
    }
}
  

//export default TreeMenu;
export default connect(
   mapStateToProps,
   mapDispatchToProps
)(MenuNodeHead)

