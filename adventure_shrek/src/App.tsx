import React, { useEffect, useState } from 'react';
import './App.css';
import { Services } from "./Services";
import { World } from './world';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faUser, faUnlock, faArrowUp, faEuro, faTimes, faLessThan } from '@fortawesome/free-solid-svg-icons'
import Product from './Product';
import { transform } from "./utils"
import { Button, Modal } from 'react-bootstrap';
import { letterSpacing } from '@mui/system';
import Toast from 'react-bootstrap/Toast';
import 'bootstrap/dist/css/bootstrap.css';
import { off } from 'process';
import { badgeClasses, Snackbar } from '@mui/material';

/*export interface IsQtmulti {
  qtmulti: number;
}*/

function App() {
  const [services, setServices] = useState(new Services(""));
  const [world, setWorld] = useState(new World());
  const [username, setUsername] = useState("");
  let user = localStorage.getItem("username");
  //const [progress, setProgress] = useState(0);
  let [qtmulti, setQtmulti] = useState(3);
  let [value, setValue] = useState('Acheter 1');
  let [count, setCount] = useState(0);
  // let estEngage=false;
  //const [estEngage, setEstEngage] = useState(false);
  const [show, setShow] = useState(false);
  const [showA, setShowA] = useState(false);
  const toggleShowA = () => setShowA(!showA);
  const handleShow = () => setShow(true);
  let [nbManagersAchetables, setNbManagersAchetables] = useState(0);
  const [style, setStyle] = useState("avant");

  const onUserNameChanged = (e: any) => {
    setUsername(e.target.value);
    localStorage.setItem("username", e.target.value);
  }

  function handleClose() {
    setShow(false);
    setShowA(false);
  }

  function changerValeurManagers(){
     if (world.money >= world.managers.pallier[5].seuil) {
       setNbManagersAchetables(6);
     }
     else if (world.money >= world.managers.pallier[4].seuil) {
       setNbManagersAchetables(5);
     }
     else if (world.money >= world.managers.pallier[3].seuil) {
       setNbManagersAchetables(4);
     }
     else if (world.money >= world.managers.pallier[2].seuil) {
       setNbManagersAchetables(3);
     }
     else if (world.money >= world.managers.pallier[1].seuil) {
       setNbManagersAchetables(2);
     }
     else if(world.money >= world.managers.pallier[0].seuil){
       setNbManagersAchetables(1);
     }
     else{
      setNbManagersAchetables(0);
     }
  }

  function hireManager(p: number) {
    console.log(p)
    if(world.money>=world.managers.pallier[p - 1].seuil){
      //onManagerBought(world.products.product[p-1]);
      world.managers.pallier[p - 1].unlocked = true;
      world.products.product[p-1].managerUnlocked = true;
      services.putManager(world.managers.pallier[p - 1]);
      setNbManagersAchetables(nbManagersAchetables-1);
      changerValeurManagers();
    }


  }

  function wrapperFunction(p: number) {
    hireManager(p);
    toggleShowA();
  }

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
    let gain = p.revenu * p.quantite;
    //console.log("gain" + gain)
    // ajout de la somme à l’argent possédé
    addToScore(gain)
    services.putProduct(p)
  }

  // @ts-ignore
  function onAchatDone(p: Product, money: number): void {
    world.money = money;
    services.putProduct(p)
    setWorld(world => ({ ...world, money: world.money }));
  }

  function addToScore(gain: number): void {
    world.score += gain;
    world.money += gain;
    //console.log("argent du monde " + world.money)
    //console.log("score du monde " + world.score)
    changerValeurManagers();
    setWorld(world => ({ ...world, money: world.money, score: world.score}));
  }

  function BoutonCommutateur() {
    switch (count) {
      case 0:
        setValue('Acheter 10');
        setQtmulti(0);
        setCount(count + 1);
        break;
      case 1:
        setValue('Acheter 100');
        setQtmulti(1);
        setCount(count + 1);
        break;
      case 2:
        setValue('Acheter max');
        setQtmulti(2);
        setCount(count + 1);
        break;
      case 3:
        setValue('Acheter 1');
        setQtmulti(3);
        setCount(0);
        break;
      default:
        console.log("I ain't the sharpest tool in the shed.")
        break;
    }
  }

  return (
    <div className="App">
      <nav className="header">
        <img src={services.server + world.logo} className="imgLogo" />
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
            <li>
              <button onClick={() => handleShow()}>
                <i className="fas fa-user"><FontAwesomeIcon icon={faUser} /></i>
                Managers
                <span className="badge badge-pill badge-primary" >{nbManagersAchetables}</span>
              </button>
            </li>
            <li><button><i className="fas fa-unlock"><FontAwesomeIcon icon={faUnlock} /></i> Unlocks</button></li>
            <li><button><i className="fas fa-arow-up"><FontAwesomeIcon icon={faArrowUp} /></i>Upgrades</button></li>
            <li><button><i className="fas fa-euro"><FontAwesomeIcon icon={faEuro} /></i>Investisseurs</button></li>
          </ul>
        </nav>
      </div>
      <div>
        <div className="debut">
          <label id="labelBoutonCommutateur"> Choisis ton pseudo : 
            <input type="text" value={username} onChange={onUserNameChanged} id="inputUsername" /></label>
          <button id="boutonCommutateur" onClick={BoutonCommutateur}>{value}</button>
        </div>
      </div>
      {/* <audio src="shrekmusic.mp3" controls autoPlay>  Your browser does not support the <code>audio</code> element.</audio> */}
      <div className="products">
        {
          world.products.product.map((p) =>
            <div key={p.name}>
              <Product prod={p} onProductionDone={onProductionDone} qtmulti={qtmulti} money={world.money} services={services} onAchatDone={onAchatDone}/>
            </div>
          )
        }
      </div>
      <div>
        <Modal show={show} className="modal">
          <div className="divTitleModal">
            <h1>Emploie des managers !</h1>
            <div className="divToast">
              <Toast show={showA} onClose={toggleShowA}>
                <Toast.Header >
                  <strong className="me-auto">Félicitations !</strong>
                </Toast.Header>
                <Toast.Body>Vous avez acquis un nouveau manager !</Toast.Body>
              </Toast>
            </div>
          </div>
          <div className="divModal">
            <div className="managers">
              {world.managers.pallier.filter(manager => !manager.unlocked).map(
                manager => (
                  <div key={manager.idcible} className="managergrid">
                    <div className="composantGrid" id="managerLogo">
                      <img alt="manager logo" className="imgManagerLogo" src={
                        services.server + manager.logo} />
                    </div>
                    <div className="composantGrid" id="infosManagers">
                      <div className="nomManager"> {manager.name} </div>
                      <div> {world.products.product[manager.idcible - 1].name}</div>
                      <div className="composantGrid" id="managerSeuil"> {manager.seuil} </div>
                    </div>
                    <div className="divBoutonEngager" >
                      <button className="boutonEngager" disabled={world.money < manager.seuil} onClick={() => wrapperFunction(world.products.product[manager.idcible - 1].id)}>
                        Engager !</button>
                    </div>
                  </div>
                ))}
            </div>
            <button className="boutonFermer" onClick={handleClose}>Close</button>
          </div>
        </Modal>
      </div>
    </div>

  );
}
export default App;
