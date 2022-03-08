import './Product.css';
import {World, Product} from './world';
import {Services} from "./Services";
import React, {useEffect, useState, useRef} from 'react';
import ProgressBar from './ProgressBar';
import Box from '@mui/material/Box';

type ProductProps = {
    prod: Product
    onProductionDone: (product: Product) => void,
    services: Services
};

export default function ProductComponent({prod, onProductionDone, services}: ProductProps) {
    const [progress, setProgress] = useState(0);
    let progressbarvalue : number
    function startFabrication() {
        prod.timeleft=prod.vitesse;
        prod.lastupdate=Date.now();
        console.log("click");
        prod.progressbarvalue=0;
    }

    const savedCallback = useRef(calcScore);

    useEffect(() => savedCallback.current = calcScore)
    useEffect(() => {
        let timer = setInterval(() => savedCallback.current(), 100)
        return function cleanup() {
            if (timer) clearInterval(timer)
        }
    }, [])

    function calcScore(){
        let tpsEcoule:number;
        if (prod.timeleft != 0) {
            tpsEcoule=Date.now()-prod.lastupdate
            prod.timeleft -= tpsEcoule;
            prod.lastupdate=Date.now();
            console.log(prod.timeleft)
            if (prod.timeleft <= 0){
                if (prod.timeleft < 0) {
                    prod.timeleft = 0;
                    prod.progressbarvalue=0;
                } 
                onProductionDone(prod);
            }else{
                    prod.progressbarvalue=Math.round(((prod.vitesse - prod.timeleft) / prod.vitesse) * 100)
            }
            setProgress(prod.progressbarvalue);
            console.log("progress "+prod.progressbarvalue)
        }else{
            setProgress(0)
        }
        //return prod.revenu;
        //prod.quantite
     }

    if (prod == undefined) {
        console.log("Prod bloqué")
        return (<span></span>)
    }
    let achat="Acheter x1   "+prod.cout+"$"
    return (
        <div className="product">
            <span>{prod.name}</span>
            <div className="grid">
                <div id="image"><a href="#" onClick={startFabrication}><img src={services.server + prod.logo} id="imageProduit"/></a>
                    <div className="composantGrid" id="quantite">{prod.quantite}</div>
                </div>

                <div className="composantGrid" id="barreProgression">
                    {/*<Box sx={{width: '100%'}}>*/}
                    {<ProgressBar transitionDuration={"0.1s"} customLabel={" "} completed={progress}/>}
                    {/*</Box>*/}
                </div>
                <div className="composantGrid"><input type="button" id="boutonAcheter" value={achat}/></div>
                <div className="composantGrid">{prod.timeleft} s</div>
                {/* <span>Revenu : {prod.revenu}</span> */}
            </div>
        </div>
    )
}


