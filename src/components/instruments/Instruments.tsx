import React from 'react';
import Footer from "../footer/Footer";

import './Instruments.css';
import Frame from "../frame/Frame";
import {appdata} from "../AppData";

function Instruments() {
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
