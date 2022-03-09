import React, { useEffect, useState } from 'react';
import './App.css';
import { Services } from "./Services";
import { World } from './world';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faUser, faUnlock, faArrowUp, faEuro, faTimes } from '@fortawesome/free-solid-svg-icons'
import Product from './Product';
import { transform } from "./utils"
import { Button, Modal } from 'react-bootstrap';


export interface IsQtmulti {
  qtmulti: number;
}

function App() {
  const [services, setServices] = useState(new Services(""));
  const [world, setWorld] = useState(new World());
  const [username, setUsername] = useState("");
  let user = localStorage.getItem("username");

  useEffect(() => {
    if (username !== "") {
      let services = new Services(username)
      setServices(services)
      services.getWorld().then(response => {
        // let liste = compute_unlocks_list(response.data)
        setWorld(response.data)
        //setUnlockList(liste)
      }
      )
    }
  }, [username])
  useEffect(() => {
    let username = localStorage.getItem("username");
    // si pas de username, on génère un username aléatoire
    if (!username || username === "") {
      username = "FanDeShrek" + Math.floor(Math.random() * 10000);
    }
    localStorage.setItem("username", username);
    setUsername(username)
  }, [])

  // @ts-ignore
  function onProductionDone(p: Product): void {
    // calcul de la somme obtenue par la production du produit
    let gain = p.revenu;
    console.log("gain" + gain)
    // ajout de la somme à l’argent possédé
    addToScore(gain)
    //p.quantite++;
    services.putProduct(p)
  }

  function addToScore(gain: number): void {
    world.score += gain;
    world.money+=gain;
    console.log("argent du monde " + world.money)
    console.log("score du monde " + world.score)
    setWorld(world)
  }

  const [progress, setProgress] = useState(0);

  let [qtmulti, setQtmulti] = useState(1);
  let [value, setValue] = useState('Acheter 1');
  let [count, setCount] = useState(0);

  function boucle() {
    for (let produit in world.products.product) {
      console.log(world.products.product[produit].calcMaxCanBuy)
    }

    world.products.product.map((p) => {
      if (p != null) {
        //p.calcMaxCanBuy()

      }
      console.log(p.calcMaxCanBuy())
    })
  }

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
        setQtmulti(1000000);
        boucle();
        setCount(count + 1);
        break;
      case 3:
        setValue('Acheter 1');
        setQtmulti(1);
        setCount(0);
        break;
    }
  }

  //  function hireManager(m : World["managers"]){

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onUserNameChanged = (e: any) => {
    console.log("ok" + e.target.value)
    setUsername(e.target.value);
    localStorage.setItem("username", e.target.value);
  }


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
            <li><button onClick={() => handleShow()}><i className="fas fa-user"><FontAwesomeIcon icon={faUser} /></i>Managers</button></li>
            <li><button><i className="fas fa-unlock"><FontAwesomeIcon icon={faUnlock} /></i> Unlocks</button></li>
            <li><button><i className="fas fa-arow-up"><FontAwesomeIcon icon={faArrowUp} /></i>Upgrades</button></li>
            <li><button><i className="fas fa-euro"><FontAwesomeIcon icon={faEuro} /></i>Investisseurs</button></li>
          </ul>
        </nav>
      </div>
      <button id="boutonChgtValeur" onClick={ButtonHandler}>{value}</button>
      <label> Choisis ton pseudo :
        <input type="text" value={username} onChange={onUserNameChanged} id="inputUsername" /></label>

      <div className="products">
        {
          world.products.product.map((p) =>
            <div key={p.name}>
              <Product prod={p} onProductionDone={onProductionDone} qtmulti={qtmulti} services={services} />
            </div>
          )
        }
      </div>
      <div>
        <Modal show={show} className="modal">
          <div>
            <h1 className="title">Emploie des managers !</h1>
          </div>
          <div>
            <div className="managers">
              {world.managers.pallier.filter(manager => !manager.unlocked).map(
                manager => (
                  <div key={manager.idcible} className="managergrid">
                    <div className="composantGrid" id="managerLogo">
                      <img alt="manager logo" className="round" src={
                        services.server + manager.logo} />
                    </div>
                    <div className="composantGrid" id="infosManagers">
                      <div> {manager.name} </div>
                      <div> {world.products.product[manager.idcible - 1].name}</div>
                      <div className="composantGrid" id="managerSeuil"> {manager.seuil} </div>
                    </div>
                    <div className="divBoutonEngager">
                      <button className="boutonEngager" disabled={world.money < manager.seuil}>Engager !</button>
                    </div>
                  </div>
                ))}
            </div>
            <button className="boutonFermer" onClick={() => handleClose()}>Close</button>
          </div>
        </Modal>
      </div>
    </div>

  );
}
export default App;
