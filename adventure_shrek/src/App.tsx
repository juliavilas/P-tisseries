import React, {useEffect, useState} from 'react';
import './App.css';
import { Services } from "./Services";
import { World } from './world';

function App() {
  const [services, setServices] = useState(new Services(""));
  const [world, setWorld] = useState(new World());
  useEffect(() => {
      let services = new Services("Agathe")
      setServices(services)
      services.getWorld().then(response => {setWorld(response.data)})
      }, []);
  return (
    <div className="App">
      <span>Bienvenue à {world.name} </span>
    </div>
  );
}

export default App;
