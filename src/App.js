import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./containers/LandingPage/LandingPage";
import About from "./components/About/About";
import NotFind from "./components/NotFind/NotFind";
import Panel from "./containers/Panel/Panel";
import Register from "./containers/RegisterPage/RegisterPage";
import Consultants from "./containers/Chat/Consultants";
import Chats from "./containers/Chat/Chats";
import jwt from "jsonwebtoken";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {localStorage.token ? (
          <Route path="/" exact component={Panel} />
        ) : (
          <Route path="/" exact component={LandingPage} />
        )}

        {localStorage.token && jwt.decode(localStorage.token)?.isConsultant ? (
          <Route path="/chat" exact component={Chats} />
        ) : (
          <Route path="/chat" exact component={Consultants} />
        )}

        <Route path="/about" component={About} />

        {/* <Route path="/social" component={Social}/> */}
        <Route path="/register" component={Register} />
        <Route component={NotFind} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
