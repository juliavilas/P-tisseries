import { Button, Input } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './App.css';
import { Services } from "./Services";
import { World } from './world';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faUser, faUnlock, faArrowUp, faEuro, faTimes } from '@fortawesome/free-solid-svg-icons'
import Product from './Product';
import { transform } from "./utils"
import Manager from './Manager'


//function onProductionDone(p : Product): void {
// calcul de la somme obtenue par la production du produit
//let gain = p.calcScore();
// ajout de la somme à l’argent possédé
//addToScore(gain)

//}

export interface IsQtmulti {
  qtmulti: number;
}

function App() {
  const [services, setServices] = useState(new Services(""));
  const [world, setWorld] = useState(new World());

  const [progress, setProgress] = useState(0);

  let [showManagers,setShowManagers] = useState(true);

  let [qtmulti, setQtmulti] = useState(1);
  let [value, setValue] = useState('Acheter 1');
  let [count, setCount] = useState(0);

  function ButtonHandler() {
    switch (count) {
      case 0:
        setValue('Acheter 10');
        setQtmulti(10);
        setCount(count + 1);
        break;
      case 1:
        setValue('Acheter 100');
        setQtmulti(100);
        setCount(count + 1);
        break;
      case 2:
        setValue('Acheter max');
        setQtmulti(10000000);
        setCount(count + 1);
        break;
      case 3:
        setValue('Acheter 1');
        setQtmulti(1);
        setCount(0);
        break;
    }
  }

 

  // const savedCallback = useRef(calcScore)
  // useEffect(() => savedCallback.current = calcScore)
  // useEffect(() => {
  //   let timer = setInterval(() => savedCallback.current(), 100)
  //   return function cleanup() {
  //     if (timer) clearInterval(timer)
  //   }
  // }, [])

  // function hireManager(m : world.managers.pallier){
  //   passer la production en automatique ?
    
  // }


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
          <ul className="list-items">
            <li><a href="#"><i className="fas fa-user"><FontAwesomeIcon icon={faUser} /></i>Managers</a></li>
            <li><a href="#"><i className="fas fa-unlock"><FontAwesomeIcon icon={faUnlock} /></i> Unlocks</a></li>
            <li><a href="#"><i className="fas fa-arow-up"><FontAwesomeIcon icon={faArrowUp} /></i>Upgrades</a></li>
            <li><a href="#"><i className="fas fa-euro"><FontAwesomeIcon icon={faEuro} /></i>Investisseurs</a></li>
          </ul>
        </nav>
      </div>
      <button id="boutonChgtValeur" onClick={ButtonHandler}>{value}</button>
      <div className="products">
        <div><Product prod={world.products.product[0]} qtmulti={qtmulti} services={services} /> </div>
        <div><Product prod={world.products.product[1]} qtmulti={qtmulti} services={services} /></div>
        <div><Product prod={world.products.product[2]} qtmulti={qtmulti} services={services} /></div>
        <div><Product prod={world.products.product[3]} qtmulti={qtmulti} services={services} /></div>
        <div><Product prod={world.products.product[4]} qtmulti={qtmulti} services={services} /></div>
        <div><Product prod={world.products.product[5]} qtmulti={qtmulti} services={services} /></div>
      </div>
      <div> {showManagers &&
        <div className="modal">
          <div>
            <h1 className="title">Managers make you feel better !</h1>
          </div>
          <div>
            <div>
              {world.managers.pallier.filter(manager => !manager.unlocked).map(
                manager => (
                  <div key={manager.idcible} className="managergrid">
                    <div className="composantGrid" id="managerLogo">
                      <img alt="manager logo" className="round" src={
                        services.server + manager.logo} />
                    </div>
                    <div className="composantGrid" id="infosManagers">
                      <div> {manager.name} </div>
                      {/* <div> {world.products.product[manager.idcible-1].name}</div> */}
                      <div className="composantGrid" id="managerSeuil"> {manager.seuil} </div>
                    </div>
                    {/* <div id="boutonEngager" onClick={() => hireManager(manager)}> */}
                    <div id="boutonEngager">
                      <button disabled={world.money < manager.seuil}>Engager !</button>
                    </div>
                  </div>
                ))}
            </div>
            <button onClick={() => setShowManagers(false)}>Close</button>
          </div>
        </div>
      } </div>
    </div >

  );
}

export default App;


