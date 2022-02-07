import payseraData from "./paysera.json";
import {appdata} from "../../model/AppData";
import React from "react";
export default function Paysera(props) {
    return <div>
        <div className="App">
            <ul className="offer-pay__banks">
                {
                    (payseraData["data"][appdata.country.toLowerCase()] !== undefined) ?
                        Object.keys(payseraData["data"][appdata.country.toLowerCase()]).map(function (name, index) {
                            return <li key={index}>
                                <img
                                    src={payseraData["data"][appdata.country.toLowerCase()][name]["url"]}
                                    alt="" onClick={() => props.onClick(name)}
                                    className="bank-logo"/>
                            </li>
                        }) : <div/>
                }
            </ul>
        </div>
    </div>

}
