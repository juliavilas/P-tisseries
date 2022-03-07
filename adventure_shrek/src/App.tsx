import { Input } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './App.css';
import { Services } from "./Services";
import { World } from './world';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faUser, faUnlock, faArrowUp, faEuro, faTimes } from '@fortawesome/free-solid-svg-icons'
import Product from './Product';
import { transform } from "./utils"
import Managers from './Managers'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


//function onProductionDone(p : Product): void {
// calcul de la somme obtenue par la production du produit
//let gain = p.calcScore();
// ajout de la somme à l’argent possédé
//addToScore(gain)

//}



function App() {
  const [services, setServices] = useState(new Services(""));
  const [world, setWorld] = useState(new World());

  const [progress, setProgress] = useState(0);



  // https://fr.reactjs.org/docs/handling-events.html

  const initialState = 'Acheter 1';
  let [value, setValue] = useState(initialState);
  let [count, setCount] = useState(0);

  function ButtonHandler() {
    switch (count) {
      case 0:
        setValue('Acheter 10');
        setCount(count+1);
        break;
      case 1:
        setValue('Acheter 100');
        setCount(count+1);
        break;
      case 2:
        setValue('Acheter max');
        setCount(count+1);
        break;
      case 3:
        setValue(initialState);
        setCount(0);
        break;
    }
  }


  // switch (i) {
  //   case 1:
  //     setValue('Acheter 10');
  //     i++;
  //     break;
  //   case 2:
  //     setValue('Acheter 100');
  //     i++;
  //     break;
  //   case 3:
  //     setValue('Acheter max');
  //     break;
  //   case 0:
  //     setValue(initialState);
  //     i++;
  //     break;
  // }
  // console.log(i)
  // if (i < 3) {
  //   i++
  // }
  // else {
  //   i = 0;
  // }


  // const savedCallback = useRef(calcScore)
  // useEffect(() => savedCallback.current = calcScore)
  // useEffect(() => {
  //   let timer = setInterval(() => savedCallback.current(), 100)
  //   return function cleanup() {
  //     if (timer) clearInterval(timer)
  //   }
  // }, [])


  useEffect(() => {
    let services = new Services("Agathe")
    setServices(services)
    services.getWorld().then(response => { setWorld(response.data) })
  }, []);
  return (
    <div className="App">
      <nav className="header">
        <img src={services.server + world.logo} />
        <label className="logo">{world.name}</label>
        <ul className="listeHeader">
          <li>{services.user}</li>
          <li>Score : {world.score}</li>
          <li>Money : <span dangerouslySetInnerHTML={{ __html: transform(world.money) }} /> $</li>
        </ul>
      </nav>
      <div className="wrapper">
        <input type="checkbox" id="btn" hidden />
        <label htmlFor="btn" className="menu-btn">
          <i className="fas fa-bars"><FontAwesomeIcon icon={faBars} /></i>
          <i className="fas fa-times"><FontAwesomeIcon icon={faTimes} /></i>
        </label>
        <nav id="sidebar">
          <div className="title">Menu
          </div>
          <Router>
            <ul className="list-items">
              <li><Link to="/Managers"><i className="fas fa-user"><FontAwesomeIcon icon={faUser} /></i>Managers</Link></li>
              <li><a href="#"><i className="fas fa-unlock"><FontAwesomeIcon icon={faUnlock} /></i> Unlocks</a></li>
              <li><a href="#"><i className="fas fa-arow-up"><FontAwesomeIcon icon={faArrowUp} /></i>Upgrades</a></li>
              <li><a href="#"><i className="fas fa-euro"><FontAwesomeIcon icon={faEuro} /></i>Investisseurs</a></li>
            </ul>
            {/* <Route path="/" element={<Managers />} /> */}
          </Router>
        </nav>
      </div>
      <button id="boutonChgtValeur" onClick={ButtonHandler}>{value}</button>
      <div className="products">
        <div><Product prod={world.products.product[0]} services={services} /> </div>
        <div><Product prod={world.products.product[1]} services={services} /></div>
        <div><Product prod={world.products.product[2]} services={services} /></div>
        <div><Product prod={world.products.product[3]} services={services} /></div>
        <div><Product prod={world.products.product[4]} services={services} /></div>
        <div><Product prod={world.products.product[5]} services={services} /></div>
      </div>
    </div>
  );
}

export default App;


