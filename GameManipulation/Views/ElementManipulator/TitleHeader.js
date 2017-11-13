import React from "react";
import {connect} from 'react-redux';

const TitleHeader = function({title = "Element with no Name"}){
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
       title: state.selectedElement.name ? state.selectedElement.name : state.selectedElement.description
    };
}
  
const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        
    };
}
  
export default connect(
   mapStateToProps,
   mapDispatchToProps
)(TitleHeader);