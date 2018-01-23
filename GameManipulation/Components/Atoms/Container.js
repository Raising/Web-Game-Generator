import React from "react";
import {connect} from 'react-redux';
import createReactClass from "create-react-class";
import styled from "styled-components";

const Container = createReactClass({
    renderElements: function(){
      return this.props.elements.map( (element) => {
        return element;
      });
    },

    render: function() {
        return (
            <StyledContainer >
                {this.renderElements}
            </StyledContainer>
        );
    }
});

const mapStateToProps = (state, ownProps) => {
  return {
  };
};

const mapDispatchToProps = (dispatch,ownProps) => {
  return {
  }
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);



const StyledContainer = styled.div`
  
`;