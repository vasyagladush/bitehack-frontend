import React, { useEffect, useState } from "react";
import Navigation from "../../components/Navigation/Navigation";
import styled from "styled-components";
import ContentWrapper from "../../components/ContentWrapper";
import jwt from "jsonwebtoken";
import axios from "axios";
import { url, maturaCalcUrl } from "../../ApiUrl.js";
import classes from "./Calculator.module.css";
import { Form, Button, Spinner } from "react-bootstrap";
import {
  UniversityConstants,
  SubjectConstants,
  SubjectLevelConstants,
  FieldOfStudyConstants,
} from "./Constants";

const StyledHeader = styled.h2`
  margin-top: 5px;
  line-height: 1.2;
`;

const StyledParagraph = styled.p`
  margin-top: 5px;
  line-height: 1.2;
`;

const ExtendedMarginDiv = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const StyledLi = styled.li`
  margin-top: 2px;
  margin-left: 20px;
  line-height: 1.2;
`;

const Calculator = (props) => {
  const [currentUser, setCurrentUser] = useState({});

  const [state, setState] = useState({
    university: "",
    fieldOfStudy: "",
    subjects: [],
    subjectName: "",
    subjectPercent: "",
    subjectLevel: "",
    error: undefined,
    loading: false,
  });

  const [result, setResult] = useState(-1);

  const addSubject = () => {
    const subjects = state.subjects;
    subjects.push({
      name: state.subjectName,
      level: state.subjectLevel,
      percent: state.subjectPercent,
    });
    setState((prevState) => {
      return {
        ...prevState,
        subjects: subjects,
      };
    });
  };

  const deleteSubject = (index) => {
    const real_subjects = [];
    const subjects = state.subjects;
    subjects.forEach((subject, index2) => {
      if (index2 !== index) {
        real_subjects.push(subject);
      }
    });
    setState((prevState) => {
      return {
        ...prevState,
        subjects: real_subjects,
      };
    });
  };

  const inputHandler = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const calculateResults = async () => {
    try {
      const requestData = {
        university: state.university,
        fieldOfStudy: state.fieldOfStudy,
        results: state.subjects.map((subject) => {
          return {
            subject: subject.name,
            level: subject.level,
            score: subject.percent,
          };
        }),
      };
      const response = await axios.post(maturaCalcUrl, requestData);
      setResult(response.data.result);
    } catch {
      setResult(-1);
    }
  };

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
            <ExtendedMarginDiv>Your subjects:</ExtendedMarginDiv>
            <ExtendedMarginDiv>
              {currentUser.subjects.map((subject) => (
                <StyledParagraph>
                  {subject.name + " " + subject.percent + " " + subject.level}
                </StyledParagraph>
              ))}
            </ExtendedMarginDiv>
          </>
        ) : localStorage.token ? null : (
          <StyledParagraph>
            Register an account so your subjects will be placed here
          </StyledParagraph>
        )}

        <div className={classes.Calculator}>
          <Form style={{ marginTop: "15px" }}>
            <Form.Group>
              <Form.Select
                size="lg"
                type="text"
                placeholder="Choose university"
                className={classes.input}
                style={{ width: "50%", marginTop: "10px" }}
                name="university"
                onChange={inputHandler}
                value={state.university}
              >
                <option>no university selected</option>
                {UniversityConstants.map((university) => (
                  <option value={university.maturaCalcCode}>
                    {university.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Select
                size="lg"
                type="text"
                placeholder="Choose field of study"
                className={classes.input}
                style={{ width: "50%", marginTop: "10px" }}
                name="fieldOfStudy"
                onChange={inputHandler}
                value={state.fieldOfStudy}
              >
                <option>no field of study selected</option>
                {FieldOfStudyConstants.map((field) => (
                  <option value={field.maturaCalcCode}>{field.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <h2 style={{ marginBottom: "10px", marginTop: "10px" }}>
              Add Subjects:
            </h2>

            <Form.Group>
              <Form.Select
                placeholder="subject"
                type="text"
                style={{ width: "50%", margin: "auto" }}
                name="subjectName"
                value={state.subjectName}
                onChange={inputHandler}
              >
                <option>no subject selected</option>
                {SubjectConstants.map((subject) => (
                  <option value={subject.maturaCalcCode}>{subject.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Control
                placeholder="subject percent"
                type="text"
                style={{
                  width: "50%",
                  margin: "auto",
                  marginBottom: "10px",
                  marginTop: "10px",
                }}
                name="subjectPercent"
                value={state.subjectPercent}
                onChange={inputHandler}
              />
            </Form.Group>
            <Form.Group>
              <Form.Select
                placeholder="subject level"
                type="text"
                style={{
                  width: "50%",
                  margin: "auto",
                  marginBottom: "10px",
                  marginTop: "10px",
                }}
                name="subjectLevel"
                value={state.subjectLevel}
                onChange={inputHandler}
              >
                <option>no subject level selected</option>
                {SubjectLevelConstants.map((subjectLevel) => (
                  <option value={subjectLevel.maturaCalcCode}>
                    {subjectLevel.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <div>
              <Button
                style={{ marginBottom: "10px", marginTop: "10px" }}
                onClick={addSubject}
              >
                Add Subject
              </Button>
            </div>
            <div>
              <h2>Subjects:</h2>
              {state.subjects.map((subject, index) => {
                return (
                  <div
                    style={{
                      border: "1px solid solid",
                      borderRadius: "10px",
                      marginBottom: "5px",
                      marginTop: "5px",
                    }}
                  >
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={() => deleteSubject(index)}
                    >
                      Delete
                    </p>
                    <h2>
                      {subject.name} {subject.level} {subject.percent}
                    </h2>
                  </div>
                );
              })}
            </div>
            {state.loading ? (
              <Spinner animation="border" variant="dark" />
            ) : (
              <Button
                variant="dark"
                className={classes.button}
                style={{ marginTop: 20 + "px", marginBottom: 20 + "px" }}
                onClick={calculateResults}
              >
                Calculate Results
              </Button>
            )}
            {state.error ? <p>Wrong login or password</p> : null}
          </Form>
        </div>
        {result >= 0 ? (
          <ExtendedMarginDiv>Your result: {result}</ExtendedMarginDiv>
        ) : null}
      </ContentWrapper>
    </>
  );
};

export default Calculator;
