import './Instruments.css';
import Frame from "../common/Frame";
import {appdata, load, save} from "../model/AppData";
import {CountryDropdown} from "react-country-region-selector";
import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import payseraData from "../providers/paysera/paysera.json";
import montonioData from "../providers/montonio/montonio.json";
import ReactPixel from "react-facebook-pixel";
import {MySpinner} from "../common/MySpinner";

function useForceUpdate() {
    // eslint-disable-next-line no-unused-vars
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}
let errorMessage = "";
let busy = "";


export function Instruments() {
    const history = useHistory();
    const forceUpdate = useForceUpdate();
    load();

    function registerInitialization()
    {
        ReactPixel.init('325830968618472');
        ReactPixel.track('InitiateCheckout');
    }

    function selectCountry(val) {
        appdata.country = val;
        save();
        forceUpdate();
    }

    function selectInstrument(paymentMethod,instrument,nextPage,spinnerKey) {
        errorMessage = "";
        if (busy === spinnerKey) return;
        busy = spinnerKey;
        forceUpdate();
        ReactPixel.init('325830968618472');
        ReactPixel.track('InitiateCheckout');

        appdata.paymentMethod = paymentMethod;
        appdata.paymentInstrument = instrument;
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
                registerInitialization();
                if (nextPage === "REDIRECT")
                {
                    window.open(appdata.redirectData, "_self");
                }
                else {
                    history.push(nextPage);
                }
            })
            .catch((error) => {
                errorMessage = error.message;
                return Promise.reject(error)
            })
            .finally(() => {
                busy = "";
                forceUpdate();
            });
    }
    return (
        <div>
            <Frame>
                <br/>
                <CountryDropdown
                    valueType="short"
                    value={appdata.country}
                    onChange={(val) => selectCountry(val)}/>
                <h2 className="offer-pay__title">
                    Выберете способ оплаты.
                </h2>
                <div className="App">
                </div>
                <br/>
                <p className="app-text">
                    {errorMessage}
                </p>
                {appdata.customerEmail === "paysera@duoclassico.eu" || !"EE,LV,LT".includes(appdata.country) ?
                    (busy === "PAYSERA") ? <MySpinner></MySpinner> :
                        <div>
                            <div className="App">
                                <ul className="offer-pay__banks">
                                    {
                                        (payseraData["data"][appdata.country.toLowerCase()] !== undefined) ?
                                            Object.keys(payseraData["data"][appdata.country.toLowerCase()]).map(function (name, index) {
                                                return <li key={index}>
                                                    <img
                                                        src={payseraData["data"][appdata.country.toLowerCase()][name]["url"]}
                                                        alt="" onClick={() => selectInstrument("PAYSERA",name,"REDIRECT", "PAYSERA")}
                                                        className="bank-logo"/>
                                                </li>
                                            }) : <div></div>
                                    }
                                </ul>
                            </div>
                        </div>
                    :
                    busy === "MONTONIO"? <MySpinner></MySpinner> :
                        <div className="App">
                            <ul className="offer-pay__banks">
                                {
                                    (montonioData[appdata.country] !== undefined) ?
                                    montonioData[appdata.country].map((data) => {
                                        return <li key={data.bic}>
                                            <img src={data.logo_url} className="bank-logo"
                                                 alt="" onClick={() => selectInstrument("MONTONIO",data.bic,"REDIRECT", "MONTONIO")}/>
                                        </li>
                                    }) : <div></div>
                                }
                            </ul>
                        </div>
                }
                <div className="app-button d-flex justify-content-around">
                    <button onClick={() => selectInstrument("STRIPE", "card", "/stripe", "STRIPE")} className="app-btn1">
                        {busy === "STRIPE"? <MySpinner/> : <span><img src="img/Cards.png" alt=""/></span>}
                    </button>
                </div>
                <div className="app-button d-flex justify-content-around">
                    <button onClick={() => selectInstrument("PAYPAL","Paypal","/paypal", "PAYPAL")} className="app-btn2">
                        {busy === "PAYPAL"? <MySpinner/> : <span><img src="img/PayPal.png" alt=""/></span>}
                    </button>
                </div>
                <div className="app-button d-flex justify-content-around">
                    <button onClick={() => selectInstrument("STRIPE", "card", "/stripe", "GOOGLE")} className="app-btn3">
                        {busy === "GOOGLE"? <MySpinner/> : <span><img src="img/GoogleApple.png" alt=""/></span>}
                    </button>
                </div>

            </Frame>
        </div>
    );
}

export default Instruments;

