import Frame from "../common/Frame";
import React, {useState} from "react";
import Footer from "../common/Footer";
import {appdata, save} from "../model/AppData";
import ReactPixel from "react-facebook-pixel";
import {MySpinner} from "../common/MySpinner";
import axios from "axios";
import {useHistory} from "react-router-dom";


export function CashOKPage() {
    // @ts-ignore
    return (
        <div>
            <Frame>
                <h2 className="offer-pay__title">
                    Спасибо, я свяжусь с вами!
                </h2>
                <Footer></Footer>
            </Frame>
        </div>
    );
}
