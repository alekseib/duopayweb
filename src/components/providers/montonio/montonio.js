import {appdata} from "../../model/AppData";
import React from "react";
import montonioData from "./montonio.json";
export default function Montonio(props) {
    return <div className="App">
        <ul className="offer-pay__banks">
            {
                (montonioData[appdata.country] !== undefined) ?
                    montonioData[appdata.country].map((data) => {
                        return <li key={data.bic}>
                            <img src={data.logo_url} className="bank-logo"
                                 alt="" onClick={() => props.action(data.bic)}/>
                        </li>
                    }) : <div/>
            }
        </ul>
    </div>

}
