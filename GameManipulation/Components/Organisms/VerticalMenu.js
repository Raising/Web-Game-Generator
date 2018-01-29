import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";
import TreeMenu from "..\\Molecules\\TreeMenu\\TreeMenu.js";

const VerticalMenu = createReactClass({
  render: function() {
    return (
      <div className={this.props.className + " well no-padding"}>
        <label onClick = {this.props.undo}> UNDO </label>
        <label > _ </label>
        <label onClick = {this.props.redo}> REDO </label>
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
      undo : () => dispatch({
        type: "USER_INTERACTION:UNDO",
        payload: {}
      }),
      redo : () => dispatch({
        type: "USER_INTERACTION:REDO",
        payload: {}
      })
    };
}
  
//export default VerticalMenu;
export default connect(
   mapStateToProps,
   mapDispatchToProps
)(VerticalMenu)