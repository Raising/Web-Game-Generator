import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";
import Select from "..\\Atoms\\Select.js";
import TextInput from "..\\Atoms\\TextInput.js";
import List from "..\\Atoms\\List.js";
import MapList from "..\\Atoms\\MapList.js";
import PolimorfValueWrapper from "..\\Molecules\\Value\\PolimorfValueWrapper.js";

const NodeBodyCreate = createReactClass({
    render: function() {
        return (
            <div className="coreCreate">
                <Select name="Node Type" propertyName="nodeType" resource="nodeTypes"/>
                <TextInput name = "Name" propertyName="name" maxSize="30" />
                <TextInput name = "Description" propertyName="description" maxSize="100" />
                <List name = "InputNames" propertyName="inputNames" attributeName="name" ListElement =   {{type:TextInput,defaultValue:{name:undefined,key:undefined}}} />
                <List name = "OutputNames" propertyName="outputNames" attributeName="name" ListElement=   {{type:TextInput,defaultValue:{name:undefined,key:undefined}}} />
                <MapList name = "Attributes" propertyName="attributes" ListElement =   {{type:PolimorfValueWrapper}} />
            </div> 
        );
    }
});

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
)(NodeBodyCreate);