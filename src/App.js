import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./containers/LandingPage/LandingPage";
import About from "./components/About/About";
import Universities from "./components/Universities/Universities";
import AGH from "./components/Universities/AGH";
import NotFound from "./components/NotFound/NotFound";
import Homepage from "./containers/Home/Home";
import Register from "./containers/RegisterPage/RegisterPage";
import Consultants from "./containers/Chat/Consultants";
import Chats from "./containers/Chat/Chats";
import Calculator from "./containers/Calculator/Calculator";
import jwt from "jsonwebtoken";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Homepage} />

        {localStorage.token ? (
          jwt.decode(localStorage.token)?.isConsultant ? (
            <Route path="/chat" exact component={Chats} />
          ) : (
            <Route path="/chat" exact component={Consultants} />
          )
        ) : (
          <Route path="/chat" exact component={LandingPage} />
        )}

        <Route path="/about" component={About} />

        <Route path="/universities/agh" component={AGH} />
        <Route path="/universities" component={Universities} />

        <Route path="/calculator" component={Calculator} />

        {/* <Route path="/social" component={Social}/> */}
        <Route path="/register" component={Register} />
        <Route path="/login" component={LandingPage} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
