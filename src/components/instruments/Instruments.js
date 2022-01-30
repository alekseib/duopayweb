import './Instruments.css';
import Frame from "../frame/Frame";
import {appdata, load, save} from "../AppData";
import {CountryDropdown} from "react-country-region-selector";
import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import axios from "axios";
import {Spinner} from "react-bootstrap";
import payseraData from "./paysera/paysera.json";
import montonioData from "./montonio/montonio.json";

function useForceUpdate() {
    // eslint-disable-next-line no-unused-vars
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

let busy1 = false
let busy2 = false
let busy3 = false
let errorMessage = "";
let busyMontonio = false;
let busyPaysera = false;

function MySpinner() {
    return <Spinner
        as="span"
        variant="dark"
        size="sm"
        role="status"
        aria-hidden="true"
        animation="border"/>
}

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
        appdata.paymentInstrument = "card";
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

    function selectGoogleApple() {
        errorMessage = "";
        if (busy3) return;
        busy3 = true;
        forceUpdate();
        appdata.paymentMethod = "STRIPE";
        appdata.paymentInstrument = "card";
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
                busy3 = false;
                forceUpdate();
            });
    }

    function selectMontonio(bic) {
        errorMessage = "";
        if (busyMontonio) return;
        busyMontonio = true;
        forceUpdate();

        appdata.paymentMethod = "MONTONIO";
        appdata.paymentInstrument = bic;
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
                window.open(appdata.redirectData, "_self");
            })
            .catch((error) => {
                errorMessage = error.message;
                return Promise.reject(error)
            })
            .finally(() => {
                busyMontonio = false;
                forceUpdate();
            });
    }

    function selectPaysera(instrument) {
        errorMessage = "";
        if (busyPaysera) return;
        busyPaysera = true;
        forceUpdate();
        appdata.paymentMethod = "PAYSERA";
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
                window.open(appdata.redirectData, "_self");
            })
            .catch((error) => {
                errorMessage = error.message;
                return Promise.reject(error)
            })
            .finally(() => {
                busyPaysera = false;
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
                    Выберете способ оплаты
                </h2>
                <div className="App">
                </div>
                <br/>
                <p className="app-text">
                    {errorMessage}
                </p>
                {appdata.customerEmail === "paysera@duoclassico.eu" ?
                    (busyPaysera) ? <MySpinner></MySpinner> :
                        <div>
                            <div className="App">
                                <ul className="offer-pay__banks">
                                    {
                                        (payseraData["data"][appdata.country.toLowerCase()] !== undefined) ?
                                            Object.keys(payseraData["data"][appdata.country.toLowerCase()]).map(function (name, index) {
                                                return <li key={index}>
                                                    <img
                                                        src={payseraData["data"][appdata.country.toLowerCase()][name]["url"]}
                                                        alt="" onClick={() => selectPaysera(name)}
                                                        className="bank-logo"/>
                                                </li>
                                            }) : <div></div>
                                    }
                                </ul>
                            </div>
                        </div>
                    :
                    busyMontonio ? <MySpinner></MySpinner> :
                        <div className="App">
                            <ul className="offer-pay__banks">
                                {
                                    (montonioData[appdata.country] !== undefined) ?
                                    montonioData[appdata.country].map((data) => {
                                        return <li key={data.bic}>
                                            <img src={data.logo_url} className="bank-logo"
                                                 alt="" onClick={() => selectMontonio(data.bic)}/>
                                        </li>
                                    }) : <div></div>
                                }
                            </ul>
                        </div>
                }
                <div className="app-button d-flex justify-content-around">
                    <button onClick={() => selectStripe()} className="app-btn1">
                        {busy2 ? <MySpinner/> : <span><img src="img/Cards.png" alt=""/></span>}
                    </button>
                </div>
                <div className="app-button d-flex justify-content-around">
                    <button onClick={() => selectPayPal()} className="app-btn2">
                        {busy1 ? <MySpinner/> : <span><img src="img/PayPal.png" alt=""/></span>}
                    </button>
                </div>
                <div className="app-button d-flex justify-content-around">
                    <button onClick={() => selectGoogleApple()} className="app-btn3">
                        {busy3 ? <MySpinner/> : <span><img src="img/GoogleApple.png" alt=""/></span>}
                    </button>
                </div>

            </Frame>
            <script>
                fbq('track', 'Lead');
            </script>
        </div>
    );
}

export default Instruments;

