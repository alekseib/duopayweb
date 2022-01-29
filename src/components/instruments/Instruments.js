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
let busy1 = false
let busy2 = false
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
        if (busy1) return;
        busy1 = true;
        forceUpdate();
        appdata.paymentMethod = "PAYPAL";
        appdata.paymentInstrument = "PayPal";
        axios.post('https://api.duoclassico.eu/functions/init', appdata)
            .then(response => {
                if (response.status !== 200) {
                    errorMessage = response.statusText;
                    forceUpdate();
                    return;
                }
                // @ts-ignore
                appdata.orderId = response.data["orderId"];
                save();
                history.push("/paypal");
            })
            .catch((error) => {
                errorMessage = error.message;
                return Promise.reject(error)
            })
            .finally(() => {
                busy1 = false;
                forceUpdate();
            });
    }
    function selectStripe() {
        errorMessage = "";
        if (busy2) return;
        busy2 = true;
        forceUpdate();
        appdata.paymentMethod = "STRIPE";
        appdata.paymentInstrument = "googlepay";
        axios.post('https://api.duoclassico.eu/functions/init', appdata)
            .then(response => {
                if (response.status !== 200) {
                    errorMessage = response.statusText;
                    forceUpdate();
                    return;
                }
                // @ts-ignore
                appdata.orderId = response.data["orderId"];
                appdata.redirectData = response.data["redirectData"];
                save();
                history.push("/stripe");
            })
            .catch((error) => {
                errorMessage = error.message;
                return Promise.reject(error)
            })
            .finally(() => {
                busy2 = false;
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
                    <button  onClick={()=>selectStripe()} className="app-btn2">
                        {busy2 ? <Spinner
                            as="span"
                            variant="dark"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            animation="border"/> : <span><img src="img/Cards.png" alt=""/></span>}
                    </button>
                </div>


                <div className="app-button d-flex justify-content-around">
                    <button  onClick={()=>selectPayPal()} className="app-btn1">
                        {busy1 ? <Spinner
                            as="span"
                            variant="dark"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            animation="border"/> : <span><img src="img/PayPal.png" alt=""/></span>}
                    </button>
                </div>
            </Frame>
        </div>
    );
}
export default Instruments;

