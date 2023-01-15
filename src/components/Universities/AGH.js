import React from "react";
import Navigation from "../Navigation/Navigation";
import styled from "styled-components";
import ContentWrapper from "../ContentWrapper";

const StyledHeader = styled.h2`
  margin-top: 5px;
  line-height: 1.2;
`;

const StyledParagraph = styled.p`
  margin-top: 10px;
  line-height: 1.2;
`;

const StyledLi = styled.li`
  margin-top: 4px;
  margin-left: 20px;
  line-height: 1.2;
`;

const AGH = (props) => {
  return (
    <>
      <Navigation universities history={props.history} />
      <ContentWrapper>
        <StyledHeader>AGH</StyledHeader>
        <StyledParagraph>Information: </StyledParagraph>
      </ContentWrapper>
    </>
  );
};

export default AGH;
