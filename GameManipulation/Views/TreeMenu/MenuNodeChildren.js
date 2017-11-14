import React from "react";
import {connect} from 'react-redux';
import TreeMenu from ".\\TreeMenu.js";

const MenuNodeChildren = function({isSelected = false,basePath = "",children}){
    let className = "nav nav-list nav-menu-list-style ";
    if (isSelected){
        className += " selected"; 
    }

    return (
    <ul className={className}>
        {children}
    </ul>);
};

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

    let splitedPathIndex = ownProps.basePath.split(".").length -1;

    return {
      children : childrenElements,
      isSelected : (ownProps.basePath === "" || state.selectedElement.splitedPath.indexOf(ownProps.basePath.split(".").pop()) === splitedPathIndex)
    };
};

const mapDispatchToProps = (dispatch,ownProps) => {
    return {};
};
  
export default connect(
   mapStateToProps,
   mapDispatchToProps
)(MenuNodeChildren);