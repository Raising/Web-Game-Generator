import React from "react";
import {connect} from 'react-redux';

const TabHeader = function({title = "Element with no Name"}){
    return(
      <div>
        <ul className="nav nav-tabs">
            <li className="active"><a >{title} </a></li>
        </ul>
      </div>  
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
       title: state.getCurrentElement().name ? state.getCurrentElement().name : state.getCurrentElement().description
    };
}
  
const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        
    };
}
  
export default connect(
   mapStateToProps,
   mapDispatchToProps
)(TabHeader);