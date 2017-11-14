import React from "react";
import {connect} from 'react-redux';

const OutputParameters = function({element = {}}){
    let parameters = (element.outputNames || []).map(parameterName => {
        return <div key={parameterName} className="parameter">{parameterName} </div>;
    });
    
    return (
        <div className="parametersColumn output">
            {parameters}
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
       element: state.getCurrentElement()
    };
}
  
const mapDispatchToProps = (dispatch,ownProps) => {
    return {
        
    }
}
  
export default connect(
   mapStateToProps,
   mapDispatchToProps
)(OutputParameters);