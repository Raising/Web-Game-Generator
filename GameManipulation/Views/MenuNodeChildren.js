import React from "react";
import {connect} from 'react-redux';
import TreeMenu from ".\\TreeMenu.js";

const MenuNodeChildren = function({basePath = "",children}){
    return (
    <ul>
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
    let childrenElements = [];
    let splitedPathIndex = ownProps.basePath.split(".").length -1 ;


    if (  typeof children === "object" && 
        children.description === undefined && 
            (ownProps.basePath === "" || 
            state.selectedMenuPath.indexOf(ownProps.basePath.split(".").pop()) === splitedPathIndex)
    ){
        childrenElements = Object.keys(children).map((childrenKey) => {
            let childrenSelection = [];
            if (state.selectedMenuPath[0] === childrenKey){
            childrenSelection = state.selectedMenuPath.slice();
            childrenSelection.shift();
            }
            return (
            <TreeMenu
                key = {childrenKey}
                basePath = {(ownProps.basePath !== "" ? ownProps.basePath + "." : "" ) + childrenKey}
            /> 
            );
        });
    } 


    return {
      children : childrenElements
    };
};

const mapDispatchToProps = (dispatch,ownProps) => {
    return {};
};
  
export default connect(
   mapStateToProps,
   mapDispatchToProps
)(MenuNodeChildren)