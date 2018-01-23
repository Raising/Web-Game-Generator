import React from "react";
import {connect} from 'react-redux';
import styled from "styled-components";

const MenuNodeHead = function({basePath = "",onClick}){
    let name = basePath.split(".").pop(); 
    return(
      <StyledMenuText onClick={onClick}> {name} </StyledMenuText>
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

const StyledMenuText = styled.a`
  position: relative;
  display: block;
  overflow: hidden; 
  border: 0px ; 
  cursor: pointer;
  transition: 0.5s;
`;