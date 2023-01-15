import React from "react";
import Navigation from "../Navigation/Navigation";
import styled from "styled-components";
import ContentWrapper from "../ContentWrapper";

const StyledHeader = styled.h2`
  margin-top: 5px;
  line-height: 1.2;
`;

const StyledParagraph = styled.p`
  margin-top: 5px;
  line-height: 1.2;
`;

const StyledLi = styled.li`
  margin-top: 2px;
  margin-left: 20px;
  line-height: 1.2;
`;

const about = (props) => {
  //this about tab in navigation
  return (
    <>
      <Navigation about history={props.history} />
      <ContentWrapper>
        <StyledHeader>Bitehack 2023</StyledHeader>
        <StyledParagraph>KlubR</StyledParagraph>
        <StyledParagraph>"Nauka dla wszystkich"</StyledParagraph>
        <StyledParagraph>
          we came up with an idea of a public web portal that contains
          information about Polish universities and helps candidates with their
          choice of where and what to study depending on their external
          assessment score, financial state and interests.
        </StyledParagraph>
        <StyledParagraph>Our project has the following parts:</StyledParagraph>
        <ul>
          <StyledLi style={{ marginTop: 5 + "px" }}>
            the informational portal itself
          </StyledLi>
          <StyledLi>
            the calculator of a recruitment score with its own public API
          </StyledLi>
          <StyledLi>
            the chats with consultants from the universities that collaborate
            with us
          </StyledLi>
        </ul>
      </ContentWrapper>
    </>
  );
};

export default about;
