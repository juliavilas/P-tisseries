import './Product.css';
import { World, Product } from './world';
import { Services } from "./Services";
import React, { useEffect, useState } from 'react';
import ProgressBar from './ProgressBar';
import { Box } from '@mui/material';

type ProductProps = {
    prod: Product
    services: Services
};

export default function ProductComponent({ prod, services }: ProductProps) {
    //const [progress, setProgress] = useState(0);
    // const savedCallback = useRef(calcScore);

    // useEffect(() => savedCallback.current = calcScore)
    // useEffect(() => {
    //     let timer = setInterval(() => savedCallback.current(), 100)
    //     return function cleanup() {
    //         if (timer) clearInterval(timer)
    //     }
    // }, [])
    if(prod==undefined){
        console.log("Prod bloqué")
        return(<div></div>)
    }else{
        console.log(prod.name)
    }
    return (
        <div className="product">
            <span>{prod.name}</span><br />
            <div className="grid">
                <div><img src={services.server + prod.logo} /></div>

                <div className="barreProgression">Box{/* <Box sx={{ width: '100%' }}>
                          <ProgressBar transitionDuration={"0.1s"} customLabel={" "}
                              completed={progress} />
                      </Box>  */}</div>
                <div>Quantité : {prod.quantite}</div>
                <div><input type="button" id="boutonAcheter" value="Acheter" /></div>
                <div>temps fabrication</div>
                {/* <span>Revenu : {prod.revenu}</span> */}
            </div>
        </div>
    )
}