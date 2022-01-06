import React from 'react';
import EmailPage from "./emailentering/EmailPage";
// @ts-ignore
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Instruments from "./instruments/Instruments";
import Test1 from "./test1/Test1";
function App() {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path="/email">
                        <EmailPage />
                    </Route>
                    <Route path="/payment">
                        <Instruments/>
                    </Route>
                </Switch>
                <Test1></Test1>
            </BrowserRouter>
        </div>
    );
}
export default App;
