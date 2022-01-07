import React from 'react';
import EmailPage from "./emailentering/EmailPage";
// @ts-ignore
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import queryString from "query-string"
import Instruments from "./instruments/Instruments";
import {appdata, parseParams} from "./AppData";
function App() {
    const queryParams = queryString.parse(window.location.search)
    // @ts-ignore
    parseParams(queryParams)
    return (
        <div>
            {/*<div>*/}
            {/*    <div>{appdata.errorMessage}</div>*/}
            {/*    <div>{appdata.price}</div>*/}
            {/*    <div>{appdata.name}</div>*/}
            {/*</div>*/}

            <BrowserRouter>
                <Switch>
                    <Route path="/start">
                        <EmailPage />
                    </Route>
                    <Route path="/payment">
                        <Instruments/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}
export default App;
