import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { World } from "./world";
import { Services } from "./Services";

function App() {
  const [services, setServices] = useState(new Services(""));
  const [world, setWorld] = useState(new World());
  /*useEffect(() => {
      let services = new Services(username)
      setServices(services)
      services.getWorld().then(response => {setWorld(response.data)})
      }, []);*/
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
