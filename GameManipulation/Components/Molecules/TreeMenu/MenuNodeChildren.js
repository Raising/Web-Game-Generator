import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";
import styled from "styled-components";
import TreeMenu from ".\\TreeMenu.js";

const MenuNodeChildren = createReactClass({
  render: function(){
    return (
      <StyledChildrenContainer selected={this.props.isSelected} >
          {this.props.children}
      </StyledChildrenContainer>);
  },
})

const getTreeElementFromPath = (tree,path) => {
    let result = tree;
    if (path === "") return result;
    for (let subPathId of path.split(".")){
        result = result[subPathId];
    }
    return result;
};

const mapStateToProps = (state, ownProps) => {
    let children = getTreeElementFromPath(state.gameModel,ownProps.basePath);
    let childrenElements  = [];
    if (children.description === undefined ){
        childrenElements = Object.keys(children).map((childrenKey) => {
            return (
            <TreeMenu
                key = {childrenKey}
                basePath = {(ownProps.basePath !== "" ? ownProps.basePath + "." : "" ) + childrenKey}
            /> 
            );
        });
    }
    
    let splitedPath = state.selectedElement.path.split(".");
    let splitedPathIndex = ownProps.basePath.split(".").length -1;
   
    return {
      children : childrenElements,
      isSelected : (ownProps.basePath === "" || splitedPath.indexOf(ownProps.basePath.split(".").pop()) === splitedPathIndex)
    };
};

const mapDispatchToProps = (dispatch,ownProps) => {
    return {};
};
  
export default connect(
   mapStateToProps,
   mapDispatchToProps
)(MenuNodeChildren);


const StyledChildrenContainer = styled.ul`
  list-style:none; 
  padding: 0px; 
  padding-left: 5px; 
  margin:0px;
  
  &>li>a{
    max-height: ${props => {return props.selected ? '50px' : '0px'}};
    
  }
`;
