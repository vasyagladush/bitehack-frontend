import React, { useEffect, useState } from "react";
import Navigation from "../../components/Navigation/Navigation";
import styled from "styled-components";
import ContentWrapper from "../../components/ContentWrapper";
import jwt from "jsonwebtoken";
import axios from "axios";
import { url } from "../../ApiUrl.js";

const StyledHeader = styled.h2`
  margin-top: 5px;
  line-height: 1.2;
`;

const StyledParagraph = styled.p`
  margin-top: 5px;
  line-height: 1.2;
`;

const StyledParagraphExtendedMargin = styled.p`
  margin-top: 20px;
  margin-bottom: 20px;
  line-height: 1.2;
`;

const StyledLi = styled.li`
  margin-top: 2px;
  margin-left: 20px;
  line-height: 1.2;
`;

const Calculator = (props) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    if (
      localStorage.token &&
      !jwt.decode(localStorage.getItem("token"))?.isConsultant
    ) {
      const fetchCurrentUser = async () => {
        const { data } = await axios.get(
          url + `/user/${jwt.decode(localStorage.getItem("token"))?.id}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        setCurrentUser(data);
      };

      fetchCurrentUser().catch(console.error);
    }
  }, []);

  return (
    <>
      <Navigation calculator history={props.history} />
      <ContentWrapper>
        <StyledHeader>Recruitment Score Calculator</StyledHeader>

        {currentUser?.subjects ? (
          <>
            <StyledParagraphExtendedMargin>
              Your subjects:
            </StyledParagraphExtendedMargin>
            <StyledParagraphExtendedMargin>
              {currentUser.subjects.map((subject) => (
                <StyledParagraph>
                  {subject.name + " " + subject.percent + " " + subject.level}{" "}
                </StyledParagraph>
              ))}
            </StyledParagraphExtendedMargin>
          </>
        ) : localStorage.token ? null : (
          <StyledParagraph>
            Register an account so your subjects will be placed here
          </StyledParagraph>
        )}
      </ContentWrapper>
    </>
  );
};

export default Calculator;
