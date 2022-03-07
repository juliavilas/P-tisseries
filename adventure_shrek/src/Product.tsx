import './Product.css';
import { World, Product } from './world';
import { Services } from "./Services";
import React, { useEffect, useState } from 'react';
import ProgressBar from './ProgressBar';
import { Box } from '@mui/material';

type ProductProps = {
    prod: Product
    //onProductionDone: (product: Product) => void,
    services: Services
    qtmulti : number
};


export default function ProductComponent({ prod, services, qtmulti }: ProductProps) {
    // let qtmulti = useState(1);
    //const [progress, setProgress] = useState(0);
    // const savedCallback = useRef(calcScore);

    // useEffect(() => savedCallback.current = calcScore)
    // useEffect(() => {
    //     let timer = setInterval(() => savedCallback.current(), 100)
    //     return function cleanup() {
    //         if (timer) clearInterval(timer)
    //     }
    // }, [])

    //     function startFabrication(prod: Product){
    //         prod.timeleft=prod.vitesse;
    //         prod.lastupdate = Date.now();
    //  }

    // function calcScore(prod : Product){
    //     if(prod.timeleft == 0)
    //     else{
    //         prod.timeleft = Date.now() - prod.lastupdate - prod.timeleft;
    //         if (prod.timeleft <= 0)
    //             if (prod.timeleft<0){
    //                 onProductionDone(prod);
    //                 prod.timeleft=0;
    //             }
    //          else 
    //             prod.progressbarvalue = ((prod.vitesse - prod.timeleft) / prod.vitesse) * 100
    //     }

    //  }

    if (prod == undefined) {
        console.log("Prod bloqué")
        return (<div></div>)
    } else {
        // console.log(prod.name)
    }
    let achat="Acheter x "+ qtmulti +" pour "+ prod.cout +" $"
    return (
        <div className="product">
            <span>{prod.name}</span>
            <div className="grid">
                <div id="image"><img src={services.server + prod.logo} id="imageProduit" /><div className="composantGrid" id="quantite">{prod.quantite}</div></div>

                <div className="composantGrid" id="barreProgression">Box{/* <Box sx={{ width: '100%' }}>
                          <ProgressBar transitionDuration={"0.1s"} customLabel={" "}
                              completed={progress} />
                      </Box>  */}</div>

                <div className="composantGrid"><input type="button" id="boutonAcheter" value={achat} /></div>
                <div className="composantGrid">{prod.timeleft} s</div>
                {/* <span>Revenu : {prod.revenu}</span> */}
            </div>
        </div>
    )
}


