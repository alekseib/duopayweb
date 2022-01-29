import React from 'react';
import EmailPage from "./emailentering/EmailPage";
// @ts-ignore
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import queryString from "query-string"
import Instruments from "./instruments/Instruments";
import {appdata, parseParams} from "./AppData";
import {ThankYouPage} from "./thankyoupage/ThankYouPage";
import PayPal from "./instruments/paypal/PayPal";
import Stripe from "./instruments/stripe/Stripe";

function Home() {
    return (
        <div>
            <ul>
                <li><a href="/start?productCode=SILVER1&key=7D748A500A611A399">SILVER1</a></li>
                <li><a href="/start?productCode=SILVER2&key=7D748A500A611A399">SILVER2</a></li>
                <li><a href="/start?productCode=SILVER3&key=7D748A500A611A399">SILVER3</a></li>
                <li><a href="/start?productCode=FR&key=7D748A500A611A399">FR</a></li>
                <li><a href="/start?productCode=ONEGIN1&key=7D748A500A611A399">ONEGIN1</a></li>
                <li><a href="/start?productCode=ONEGIN2&key=7D748A500A611A399">ONEGIN2</a></li>
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
    // @ts-ignore
    parseParams(queryParams)
    if ("InvalidKey" === appdata.errorMessage) {
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
                    <Route path="/">
                        <Tilda/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}
export default App;
