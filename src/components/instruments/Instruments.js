import './Instruments.css';
import Frame from "../frame/Frame";
import {appdata, load, save} from "../AppData";
import {CountryDropdown} from "react-country-region-selector";
import React, {useState} from "react";
import {Paysera} from "./paysera/paysera";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {Spinner} from "react-bootstrap";

function useForceUpdate(){
    // eslint-disable-next-line no-unused-vars
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}
let busy = false
let errorMessage = "";
export function Instruments() {
    const history = useHistory();
    const forceUpdate = useForceUpdate();
    load();
    function selectCountry(val) {
        appdata.country = val;
        save();
        forceUpdate();
    }
    function selectPayPal() {
        errorMessage = "";
        if (busy) return;
        busy = true;
        forceUpdate();
        appdata.paymentMethod = "PAYPAL";
        appdata.paymentInstrument = "PayPal";
        axios.post('https://api.duoclassico.eu/functions/init', appdata)
            .then(response => {
                if (response.status != 200) {
                    errorMessage = response.statusText;
                    forceUpdate();
                    return;
                }
                // @ts-ignore
                appdata.orderId = response.data["orderId"];
                appdata.description = appdata.productName + "#" + appdata.orderId + "#";
                save();
                history.push("/paypal");
            })
            .catch((error) => {
                errorMessage = error.message;
                return Promise.reject(error)
            })
            .finally(() => {
                busy = false;
                forceUpdate();
            });
    }

    return (
        <div>
            <Frame>
                <br/>
                <CountryDropdown
                    valueType = "short"
                    value={appdata.country}
                    onChange={(val) => selectCountry(val)} />
                <h2 className="offer-pay__title">
                    Выберете способ оплаты
                </h2>
                <div className="App">
                </div>
                <br/>
                <Paysera/>
                <p className="app-text">
                    {errorMessage}
                </p>
                <div className="app-button d-flex justify-content-around">
                    <button  onClick={()=>selectPayPal()} className="app-btn1">
                        {busy ? <Spinner
                            as="span"
                            variant="dark"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            animation="border"/> : <span><img src="img/PayPal.PNG" alt=""/></span>}
                    </button>
                </div>
            </Frame>
        </div>
    );
}
export default Instruments;

