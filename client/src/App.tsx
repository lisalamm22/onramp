import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button'

function App() {
  const [data, setData] = React.useState<any|null>(null);

  const getData = () => {
    fetch('/api')
      .then((result) => result.text())
      .then((res) => setData(res));
  };
  return (
    <div className="App">
      <header className="App-header">
        <Button>HELLO WORLD</Button>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={getData}>Click Me For Data</button>
        {data}
      </header>
    </div>
  );
}

export default App;
