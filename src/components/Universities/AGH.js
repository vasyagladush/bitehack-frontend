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
        <StyledHeader>
          We are still in process of gathering the information about this
          university. Please come check this university later again.
        </StyledHeader>
        <StyledParagraph>Here are some useful links: </StyledParagraph>
        <ul>
          <StyledLi>
            <a href="https://www.international.agh.edu.pl/eng/centre-for-international-students/">
              AGH Internation Students Department
            </a>
          </StyledLi>
          <StyledLi>
            <a href="https://www.international.agh.edu.pl/eng/scholarships/">
              AGH Scholarships for Internation Students
            </a>
          </StyledLi>
          <StyledLi>
            <a href="https://nawa.gov.pl/studenci/studenci-zagraniczni">
              NAWA Scholarships for Internation Students
            </a>
          </StyledLi>
        </ul>
      </ContentWrapper>
    </>
  );
};

export default AGH;
