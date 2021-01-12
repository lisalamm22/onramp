import React, {Fragment, useState, useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Home from './components/home';
import Login from './components/login';
import Register from './components/register';

function App() {
  const [isAuth, setIsAuth] = useState<Boolean>(false);

  const setAuth = (bool:Boolean) => {
    setIsAuth(bool);
  }

  async function isStillAuth() {
    try {
      const res = await fetch('/auth/verify', {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseRes = await res.json();
      parseRes === true ? setIsAuth(true) : setIsAuth(false)
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    isStillAuth()
  })

  return (
    <Fragment>
      <Router>
        <Switch>
          <Route exact path="/" render={ () => <Redirect to="/home"/> } />
          <Route exact path="/login" render={props => isAuth ? <Redirect to="/home"/> : <Login {...props} setAuthProp={setAuth}/>}/>
          <Route exact path="/register" render={props => isAuth ? <Redirect to="/home"/> : <Register {...props} setAuthProp={setAuth}/>}/>
          <Route exact path="/home" render={props => isAuth ? <Home {...props} setAuthProp={setAuth}/> : <Redirect to="/login" />}/>
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
