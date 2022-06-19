import React, { useState } from 'react';
import EmailPage from "./lead/Lead";
import { useTranslation } from 'react-i18next'
// @ts-ignore
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import queryString from "query-string"
import Instruments from "./instruments/Instruments";
import {appdata} from "./model/AppData";
import {ThankYouPage} from "./instruments/ThankYouPage";
import PayPal from "./providers/paypal/PayPal";
import Stripe from "./providers/stripe/Stripe";
import Refresh from "./refresh/Refresh";
import {ThankYouPageForRefresh} from "./refresh/ThankYouPageForRefresh";
import {parseParams} from "./model/Setup";
import Amounts from "./amounts/Amounts";
import {CashPage} from "./instruments/CashPage";
import {CashOKPage} from "./instruments/CashOKPage";
import {SoldPage} from "./instruments/SoldPage";
import {ThankYouShortPage} from "./instruments/ThankYouShortPage";

// Contains the value and text for the options
const languages = [
    { value: '', text: "Options" },
    { value: 'en', text: "English" },
    { value: 'hi', text: "Hindi" },
    { value: 'bn', text: "Bengali" }
]


function Home() {
    const { t } = useTranslation();
    const [lang, setLang] = useState('ru');
    // @ts-ignore
    const handleChange = e => {
        setLang(e.target.value);
        let loc = "http://localhost:3000/home/";
        window.location.replace(loc + "?lng=" + e.target.value);
    }
    return (
        <div>

            <select value={lang} onChange={handleChange}>
                {languages.map(item => {
                    return (<option key={item.value}
                                    value={item.value}>{item.text}</option>);
                })}
            </select>
            <ul>
                <li><a href="/amt?productCode=HOPNER20220515&key=7D748A1500A1600A399B1200B1300B8233456">HOPNER2022</a></li>
                <li><a href="/amt?productCode=NOVIKOV2022&key=7D748A1500A1600A399B1200B1300B8233456">NOVIKOV2022</a></li>
                <li><a href="/start?productCode=SILVER1&key=7D748A500A611A399">SILVER1</a></li>
                <li><a href="/start?productCode=SILVER2&key=7D748A500A611A399">SILVER2</a></li>
                <li><a href="/start?productCode=SILVER3&key=7D748A500A611A399">SILVER3</a></li>
                <li><a href="/start?productCode=FR&key=7D748A500A611A399">FR</a></li>
                <li><a href="/start?productCode=ONEGIN1&key=7D748A500A611A399">ONEGIN1</a></li>
                <li><a href="/start?productCode=ONEGIN2&key=7D748A500A611A399">ONEGIN2</a></li>
                <li><a href="/refresh?productCode=ONEGIN2&order=768568987759399">REFRESH</a></li>
            </ul>
        </div>
    );
}

function Tilda() {
    window.open("https://duoclassico.eu", "_self")
    return null;
}

function App() {
    const queryParams = queryString.parse(window.location.search)
    parseParams(queryParams)
    if ("InvalidKey" === appdata.errorMessage) {
        console.log(appdata.errorMessage)
        window.open("https://duoclassico.eu/systemerror", "_self")
    }
    if ("InvalidEventCode" === appdata.errorMessage) {
        console.log(appdata.errorMessage)
        window.open("https://duoclassico.eu/systemerror", "_self")
    }
    return (
        <div>

            <BrowserRouter>
                <Switch>
                    <Route path="/home">
                        <Home />
                    </Route>
                    <Route path="/amt">
                        <Amounts />
                    </Route>
                    <Route path="/start">
                        <EmailPage />
                    </Route>
                    <Route path="/payment">
                        <Instruments/>
                    </Route>
                    <Route path="/paypal">
                        <PayPal/>
                    </Route>
                    <Route path="/stripe">
                        <Stripe/>
                    </Route>
                    <Route path="/ok">
                        <ThankYouPage/>
                    </Route>
                    <Route path="/cash">
                        <CashPage/>
                    </Route>
                    <Route path="/cashok">
                        <CashOKPage/>
                    </Route>
                    <Route path="/refresh">
                        <Refresh/>
                    </Route>
                    <Route path="/sold">
                        <SoldPage/>
                    </Route>
                    <Route path="/thankyoushort">
                        <ThankYouShortPage/>
                    </Route>
                    <Route path="/refreshthankyou">
                        <ThankYouPageForRefresh/>
                    </Route>
                    <Route path="/">
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}
export default App;
