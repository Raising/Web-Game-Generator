import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";
import TreeMenu from "..\\Molecules\\TreeMenu\\TreeMenu.js";

const VerticalMenu = createReactClass({
  render: function() {
    return (
      <div className={this.props.className + " well no-padding"}>
        <label onClick = {this.props.onClick}> DESHACER </label>
        <TreeMenu />
      </div>
    );
  }
});

const mapStateToProps = (state, ownProps) => {
    return {

    };
};

const mapDispatchToProps = (dispatch,ownProps) => {
    return {
      onClick : () => dispatch({
        type: "USER_INTERACTION:UNDO",
        payload: {}
      })
    };
}
  
//export default VerticalMenu;
export default connect(
   mapStateToProps,
   mapDispatchToProps
)(VerticalMenu)