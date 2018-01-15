var BaseOperand = {
  mapStateToProps : (state, ownProps) => {
    let modelValue = state.getCurrentElement().getPropertyDot(ownProps.propertyName);
    return {
        currentValue: modelValue !== undefined ? modelValue : ""
    };
  },
  
  mapDispatchToProps : (dispatch,ownProps) => {
    return {
      onChange: (e) => {
        debugger;
        return dispatch({
          type: "CHANGE_SELECTED_ELEMENT_PROPERTY",
          payload: {
            newValue: e.currentTarget.value,
            propertyName: ownProps.propertyName
          }
        })
      }
    }
  }
};

export default BaseOperand;