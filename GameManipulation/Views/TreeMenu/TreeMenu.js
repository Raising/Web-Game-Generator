import React from "react";
import {connect} from 'react-redux';
import MenuNodeHead from ".\\MenuNodeHead.js";
import MenuNodeChildren from ".\\MenuNodeChildren.js";

const TreeMenu = function ({basePath = ""}){  
if (basePath === ""){
    return (
        <div className="col-xs-2 well no-padding">
            <MenuNodeChildren basePath = {basePath}/>
        </div>
    )
}

return (
    <li>
        <MenuNodeHead basePath = {basePath}/>
        <MenuNodeChildren basePath = {basePath}/>
    </li>
  );
};

const mapStateToProps = (state, ownProps) => {
    return {

    };
};

const mapDispatchToProps = (dispatch,ownProps) => {
    return {};
}
  
//export default TreeMenu;
export default connect(
   mapStateToProps,
   mapDispatchToProps
)(TreeMenu)