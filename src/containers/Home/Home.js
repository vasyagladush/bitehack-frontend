import React, { useEffect } from "react";
import Navigation from "../../components/Navigation/Navigation";
import { connect } from "react-redux";
import styled from "styled-components";
import * as actions from "../../store/actions/index";
import ContentWrapper from "../../components/ContentWrapper";
import axios from "axios";
import {url} from "../../ApiUrl";

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

const Homepage = (props) => {
  useEffect(()=>{
    const func = async()=>{
      const response = await axios.get(url+"/chat/info/me",{
        headers: {
          "Authorization": "Bearer "+localStorage.getItem("token")
        }
      });
      console.log(response.data);
  
      props.setUser(response.data);
    }
    func();

  },[]);
  return (
    <>
      <Navigation home history={props.history} />
      <ContentWrapper>
        <StyledHeader>Bitehack 2023</StyledHeader>
        <StyledParagraph>KlubR</StyledParagraph>
        <StyledParagraph>What can you find here?</StyledParagraph>
        <ul>
          <StyledLi style={{ marginTop: 5 + "px" }}>
            see the information of a particular university about fields of
            study, scholarships, student activities they have etc.
          </StyledLi>
          <StyledLi>
            use the calculator of a recruitment score you can acquire for a
            specific field of study of a specific university
          </StyledLi>
          <StyledLi>
            chat with the universities' consultants about any questions you have
            about the university
          </StyledLi>
        </ul>
      </ContentWrapper>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    personId: state.personId,
    meId: state.meId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // setMe: (id) => dispatch(actions.addMe(id)),
    setUser: (user)=>dispatch(actions.setUser(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
