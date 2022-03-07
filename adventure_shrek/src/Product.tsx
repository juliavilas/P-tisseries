import './Product.css';
import {World, Product} from './world';
import {Services} from "./Services";
import React, {useEffect, useState, useRef} from 'react';
import ProgressBar from './ProgressBar';
import Box from '@mui/material/Box';

type ProductProps = {
    prod: Product
    /*onProductionDone: (product: Product) => void,*/
    services: Services
};

/*function calcScore() {
    if (this.product.timeleft != 0) {
        this.product.timeleft = Date.now() - this.lastupdate - this.product.timeleft;
        if (this.product.timeleft <= 0)
            if (this.product.timeleft < 0) {
                onProductionDone(product);
                this.product.timeleft = 0;
            } else
                this.product.progressbarvalue = ((this.product.vitesse -
    }
}*/

export default function ProductComponent({prod,/*onProductionDone,*/ services}: ProductProps) {
    const [progress, setProgress] = useState(0);
    let progressbarvalue : number
    function startFabrication() {
        prod.timeleft=prod.vitesse;
        prod.lastupdate=Date.now();
        console.log("click");
        progressbarvalue=0;
    }

    const savedCallback = useRef(calcScore);

    useEffect(() => savedCallback.current = calcScore)
    useEffect(() => {
        let timer = setInterval(() => savedCallback.current(), 100)
        return function cleanup() {
            if (timer) clearInterval(timer)
        }
    }, [])

    /*function startFabrication(prod: Product){
        prod.timeleft=prod.vitesse;
        prod.lastupdate = Date.now();
 }*/

    function calcScore(){
        let tpsEcoule:number;
        if (prod.timeleft != 0) {
            tpsEcoule=Math.floor((Date.now()-prod.lastupdate)/1000)
            prod.timeleft -= tpsEcoule;
            console.log(prod.timeleft)
            if (prod.timeleft <= 0){
                if (prod.timeleft < 0) {
                    //onProductionDone(prod);
                    prod.timeleft = 0;
                    progressbarvalue=0;
                } 
            }else{
                    progressbarvalue=((prod.vitesse - prod.timeleft) / prod.vitesse) * 100
            }
            setProgress(progressbarvalue);
            console.log("progress "+progressbarvalue)
        }else{
            setProgress(0)
        }
       // prod.quantite++
     }

    if (prod == undefined) {
        console.log("Prod bloqué")
        return (<span></span>)
    } else {
        console.log(prod.name)
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


