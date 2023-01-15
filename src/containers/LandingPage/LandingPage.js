import React, { useState } from "react";
import classes from "./LandingPage.module.css";
import Navigation from "../../components/Navigation/Navigation";
import { Form, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { url } from "../../ApiUrl.js";

const LandingPage = (props) => {
  const [state, setState] = useState({
    email: "",
    password: "",
    error: undefined,
    loading: false,
  });

  const inputHandler = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const login = async () => {
    const response = await axios.post(url + "/auth/login", {
      email: state.email,
      password: state.password,
    });

    localStorage.setItem("token", response.data.token);
    window.location.href = "/";
  };

  return (
    <>
      <Navigation home history={props.history} />
      <div style={{ margin: "auto", marginTop: "30px", textAlign: "center" }}>
        <h1 style={{ fontSize: "2em" }}>Login</h1>
      </div>
      <div className={classes.LandingPage}>
        <Form style={{ marginTop: "25px" }}>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="Enter Email"
              className={classes.input}
              style={{ width: "50%" }}
              name="email"
              onChange={inputHandler}
              value={state.email}
            />
          </Form.Group>
          <Form.Group style={{ marginTop: "25px" }} controlId="formBasicLogin">
            <Form.Control
              type="password"
              placeholder="Enter Password"
              className={classes.input}
              style={{ width: "50%" }}
              name="password"
              onChange={inputHandler}
              value={state.password}
            />
          </Form.Group>
          {state.loading ? (
            <Spinner animation="border" variant="dark" />
          ) : (
            <Button
              variant="dark"
              className={classes.button}
              style={{ marginTop: 20 + "px", marginBottom: 20 + "px" }}
              onClick={login}
            >
              Login
            </Button>
          )}
          {state.error ? <p>Wrong login or password</p> : null}
        </Form>
      </div>
      <div style={{ textAlign: "center", marginTop: 20 + "px" }}>
        <Link to="/register">Don't have an account?</Link>
      </div>
    </>
  );
};

export default LandingPage;
