import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import LandingPage from './containers/LandingPage/LandingPage';
import About from './components/About/About';
import NotFind from './components/NotFind/NotFind';
import Panel from './containers/Panel/Panel';
import Social from './containers/Social/Social';
import Register from './containers/RegisterPage/RegisterPage';
import Chat from "./containers/Chat/Chat";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        { localStorage.token ?
        <Route path="/" exact component={Panel}/> :
        <Route path="/" exact component={LandingPage}/>
        }

<Route path="/chat" exact component={Chat}/>
        <Route path="/about" component={About}/>

        {/* <Route path="/social" component={Social}/> */}
        <Route path="/register" component={Register}/>
        <Route component={NotFind}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
