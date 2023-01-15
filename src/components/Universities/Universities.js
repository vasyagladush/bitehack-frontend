import React from "react";
import Navigation from "../Navigation/Navigation";
import styled from "styled-components";
import ContentWrapper from "../ContentWrapper";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

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

const Universities = (props) => {
  return (
    <>
      <Navigation universities history={props.history} />
      <ContentWrapper>
        <StyledHeader>
          Here you can find the information we gathered about what universities
          can suggest you.
        </StyledHeader>
        <StyledParagraph>List of Universities:</StyledParagraph>
        <ul>
          <StyledLi>
            <Link to="/universities/agh">AGH</Link>
          </StyledLi>
        </ul>
      </ContentWrapper>
    </>
  );
};

export default Universities;
