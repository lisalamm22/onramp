import React, {Fragment} from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './components/home';
import Login from './components/login';
import Register from './components/register';

function App() {
  // const [data, setData] = React.useState<any|null>(null);

  // const getData = () => {
  //   fetch('/api')
  //     .then((result) => result.text())
  //     .then((res) => setData(res));
  // };
  return (
    <Fragment>
      <header className="App-header">
        <Button>HELLO WORLD</Button>
      </header>

      <Router>
        <Switch>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/home" component={Home}/>
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
