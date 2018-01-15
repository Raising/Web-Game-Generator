import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";
import TreeMenu from "..\\Molecules\\TreeMenu\\TreeMenu.js";

const VerticalMenu = createReactClass({
  render: function() {
    return (
      <div className={this.props.className + " well no-padding"}>
        <label> hello world</label>
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
    return {};
}
  
//export default VerticalMenu;
export default connect(
   mapStateToProps,
   mapDispatchToProps
)(VerticalMenu)