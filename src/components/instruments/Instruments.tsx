import React,{useState,useEffect} from 'react';
import './Instruments.css';
import Frame from "../frame/Frame";
import {load, payseraData} from "../AppData";
import ReactPayPal from './PayPalButtons';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { CheckoutForm } from '../stripe/CheckoutForm';
const stripePromise = loadStripe('pk_live_Ym4pj7nfoaBPMuFYyUI0nViM006gcwB8eD');

function Instruments() {
    const options = {
        // passing the client secret obtained from the server
        clientSecret: 'pi_3KFlMXKNGtOWS9rw0kYh6Ni0_secret_a3rKNOqwSXc8qrG2Co9TikQQX'
    };

    load();
    // @ts-ignore
    return (
        <div>
            <Frame>
                <h2 className="offer-pay__title">
                    Выберете способ оплаты
                </h2>
                <div className="App">
                    <ul>
                        {
                            // @ts-ignore
                            Object.keys(payseraData["data"]["ee"]).map(function(name, index){
                            return <li key={ index }>{name} {payseraData["data"]["ee"][name]["url"]}</li>;
                        })}
                    </ul>
                </div>

                <br/>
                <ul className="offer-pay__list">
                    <li className="offer-pay__item">
                        <div id="paypal-button-container" className="paypal"/>
                    </li>
                </ul>
                <div id="smart-button-container">
                    <div className="stripe">
                        <Elements stripe={stripePromise} options={options} >
                            <CheckoutForm/>
                        </Elements>
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

