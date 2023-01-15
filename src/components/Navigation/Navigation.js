import React, { useState } from "react";
import classes from "./Navigation.module.css";
import Backdrop from "../Backdrop/Backdrop";
import DrawerToggle from "../DrawerToggle/DrawerToggle";
import styled from "styled-components";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const LogoutButton = styled.button`
  position: absolute;
  margin-left: calc(100vw - 22%);
  width: 20%;
  height: 30px;
`;

const NavigationBar = (props) => {
  const [show, setShow] = useState(false);

  const changeRoute = (url) => {
    props.history.push(url);
  };

  const handleSidebar = () => {
    setShow((prevstate) => !prevstate);
  };

  return (
    <>
      {localStorage.getItem("token") ? (
        <LogoutButton
          onClick={() => {
            localStorage.removeItem("token");
            window.location.reload(false);
          }}
        >
          Log Out
        </LogoutButton>
      ) : (
        <Link to="/login">
          <LogoutButton>Log In</LogoutButton>
        </Link>
      )}
      <div style={{ marginTop: 5 + "px" }}>
        <div className={classes.navDesktop}>
          {props.universities ? (
            <p className={classes.active}>Universities</p>
          ) : (
            <p onClick={() => changeRoute("/universities")}>Universities</p>
          )}
          {props.chat ? (
            <p className={classes.active}>Chat</p>
          ) : (
            <p onClick={() => changeRoute("/chat")}>Chat</p>
          )}
          {props.home ? (
            <p className={classes.active}>Home</p>
          ) : (
            <p onClick={() => changeRoute("/")}>Home</p>
          )}
          {props.calculator ? (
            <p className={classes.active}>Calculator</p>
          ) : (
            <p onClick={() => changeRoute("/calculator")}>Calculator</p>
          )}
          {props.about ? (
            <p className={classes.active}>About</p>
          ) : (
            <p onClick={() => changeRoute("/about")}>About</p>
          )}
        </div>
        <DrawerToggle clicked={handleSidebar} />
        <ul
          className={
            show
              ? [classes.open, classes.mobile].join(" ")
              : [classes.close, classes.mobile].join(" ")
          }
        >
          <li>
            <img
              src={require("../../images/icon_1.png")}
              alt="messenger logo"
              width="50%"
              height="50%"
              style={{ marginLeft: 10, marginBottom: 10 }}
            />
          </li>

          <li>
            {props.universities ? (
              <p className={classes.active}>Universities</p>
            ) : (
              <p onClick={() => changeRoute("/universities")}>Universities</p>
            )}
          </li>
          <li>
            {props.chat ? (
              <p className={classes.active}>Chat</p>
            ) : (
              <p onClick={() => changeRoute("/chat")}>Chat</p>
            )}
          </li>
          <li>
            {props.home ? (
              <p className={classes.active}>Home</p>
            ) : (
              <p onClick={() => changeRoute("/")}>Home</p>
            )}
          </li>
          <li>
            {props.calculator ? (
              <p className={classes.active}>Calculator</p>
            ) : (
              <p onClick={() => changeRoute("/calculator")}>Calculator</p>
            )}
          </li>
          <li>
            {props.about ? (
              <p className={classes.active}>About</p>
            ) : (
              <p onClick={() => changeRoute("/about")}>About</p>
            )}
          </li>
        </ul>
        <Backdrop show={show} clicked={handleSidebar} />
      </div>
    </>
  );
};

export default NavigationBar;
