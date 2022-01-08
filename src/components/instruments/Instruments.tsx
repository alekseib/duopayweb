import React from 'react';
import './Instruments.css';
import Frame from "../frame/Frame";
import {appdata, load} from "../AppData";
import ReactPayPal from './PayPalButtons';
import { Stripe } from '../stripe/Stripe';

function Instruments() {
    load();
    // @ts-ignore
    return (
        <div>
            <Frame>
                <h2 className="offer-pay__title">
                    Выберете способ оплаты
                </h2>
                <br/>
                <ul className="offer-pay__list">
                    <li className="offer-pay__item">
                        <div id="paypal-button-container" className="paypal"/>
                    </li>
                </ul>
            <div id="smart-button-container">
                <div className="stripe">
                    <Stripe></Stripe>
                </div>
                <div className="paypal">
                    <ReactPayPal></ReactPayPal>
                </div>
            </div>
            </Frame>
        </div>
    );
}

export default Instruments;
