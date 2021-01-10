import React, {Fragment, useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Home from './components/home';
import Login from './components/login';
import Register from './components/register';

function App() {
  const [isAuth, setIsAuth] = useState<Boolean>(false)

  const setAuth = (bool:Boolean) => {
    setIsAuth(bool)
  }

  return (
    <Fragment>
      <Router>
        <Switch>
          <Route exact path="/login" render={props => !isAuth ? <Login {...props} setAuthProp={setAuth}/> : <Redirect to="/home"/>}/>
          <Route exact path="/register" render={props => !isAuth ? <Register {...props} setAuthProp={setAuth}/> : <Redirect to="/login" />}/>
          <Route exact path="/home" render={props => isAuth ? <Home {...props} setAuthProp={setAuth}/> : <Redirect to="/login"/>}/>
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
