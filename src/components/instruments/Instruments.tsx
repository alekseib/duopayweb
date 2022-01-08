import React from 'react';
import Footer from "../footer/Footer";

import './Instruments.css';
import Frame from "../frame/Frame";
import {appdata, load} from "../AppData";
import {Simulate} from "react-dom/test-utils";

function Instruments() {
    load();
    return (
        <Frame>
            <div>
                <br/>
                <div>{appdata.customerEmail}</div>
                </div>
                <Footer></Footer>
        </Frame>
    );
}

export default Instruments;
