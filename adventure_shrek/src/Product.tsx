import './Product.css';
import { World, Product } from './world';
import { Services } from "./Services";
import React, { useEffect, useState, useRef } from 'react';
import ProgressBar from './ProgressBar';

type ProductProps = {
    prod: Product
    onProductionDone: (product: Product) => void,
    onAchatDone: (p: Product, money: number) => void,
    services: Services,
    qtmulti: number,
    money: number
};

let estEnProd : boolean = false;

export default function ProductComponent({ prod, onProductionDone, services, qtmulti, money, onAchatDone }: ProductProps) {
    const [progress, setProgress] = useState(0);
    //const [qtebuy, setQtebuy] = useState(0);
    let qtebuy=1;
    const savedCallback = useRef(calcScore);
    /*if(!estEnProd){
        prod.timeleft=prod.vitesse
    }*/

    function startFabrication() {
        prod.timeleft = prod.vitesse;
        prod.lastupdate = Date.now();
        prod.progressbarvalue = 0;
        estEnProd=true;
    }

    useEffect(() => savedCallback.current = calcScore)
    useEffect(() => {
        let timer = setInterval(() => savedCallback.current(), 100)
        return function cleanup() {
            if (timer) clearInterval(timer)
        }
    }, [])

    function calcScore() {
        let tpsEcoule: number;
        if (prod.timeleft != 0) {
            tpsEcoule = Date.now() - prod.lastupdate
            prod.timeleft -= tpsEcoule;
            prod.lastupdate = Date.now();
            if (prod.timeleft <= 0) {
                if (prod.timeleft < 0) {
                    prod.timeleft = 0;
                    prod.progressbarvalue = 0;
                }
                onProductionDone(prod);
                estEnProd=false;
               // prod.timeleft=prod.vitesse

            } else {
                prod.progressbarvalue = Math.round(((prod.vitesse - prod.timeleft) / prod.vitesse) * 100)
            }
            setProgress(prod.progressbarvalue);
        } else {
            setProgress(0)
        }
    }

    if (prod == undefined) {
        console.log("Prod bloqué")
        return (<span></span>)
    }

    let prix = Math.round(prod.cout * ((Math.pow(prod.croissance, qtebuy) - 1) / (prod.croissance - 1)));
    let achat = "Acheter x " + qtebuy + " pour " + prix + " $"

    // résoudre équation : u0 (1-c^n)/(1-c) < world.money --> log... trouver n
    function calcMaxCanBuy() {
        let n = Math.trunc(Math.log(1 + money * (prod.croissance - 1) / prod.cout) / (Math.log(prod.croissance)))
        /*let n=2;*/

        //console.log('test' + n);
        return n;
    }
    let estPasAchetable: boolean =false;

    changeQteBuy()
    function changeQteBuy() {
        estPasAchetable=prix>money
        switch (qtmulti) {
            case 0: {
                qtebuy=10;
                break;
            }
            case 1: {
                qtebuy=100;
                break;
            }
            case 2:{
                qtebuy=calcMaxCanBuy();
                break;
            }
            case 3:{
                qtebuy=1;
                break;
            }
            default:{
                console.log("Somebody once told me I wasn't the sharpest tool in the shed.");
            break;
        }
        }
        prix = Math.trunc(prod.cout * ((Math.pow(prod.croissance, qtebuy) - 1) / (prod.croissance - 1)));
        // si le max n'est pas atteignable
        if(qtebuy==0){
            estPasAchetable=true;
        }else{
            estPasAchetable=prix>money
        }
        achat = "Acheter x " + qtebuy + " pour " + prix + " $";
        //console.log("change "+qtmulti+"prod"+prod.name+" pas achetable "+estPasAchetable)
    }

    function startAchat() {
        console.log("qtebuy "+qtebuy+" qute "+prod.quantite)
        prod.quantite+=qtebuy;
        money-=prix;
        console.log("monye here"+money)
        onAchatDone(prod, money);
    }

    return (

        <div className="product">
            <span className="titreProduit">{prod.name}</span>
            <div className="grid">
                <div id="image"><a href={prod.quantite==0?undefined:"#"} onClick={startFabrication} style={estEnProd?{pointerEvents: "none"} : undefined}><img src={services.server + prod.logo} id="imageProduit" /></a>
                    <div className="composantGrid" id="quantite">{prod.quantite}</div>
                </div>

                <div className="composantGrid" id="barreProgression">
                    {/*<Box sx={{width: '100%'}}>*/}
                    {<ProgressBar transitionDuration={"0.1s"} customLabel={prod.revenu*prod.quantite+"\u00a0$"} completed={progress} />}
                    {/*</Box>*/}
                </div>
                <div className="composantGrid"><input type="button" id="boutonAcheter" value={achat} onClick={startAchat} disabled={estPasAchetable} /></div>
                <div className="composantGrid">{estEnProd?prod.timeleft:prod.vitesse} s</div>
                <div className="composantGrid">revenu :{prod.revenu*prod.quantite}</div>
                {/* <span>Revenu : {prod.revenu}</span> */}
            </div>
        </div>
    )
}


