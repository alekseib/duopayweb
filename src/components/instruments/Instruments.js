import './Instruments.css';
import Frame from "../frame/Frame";
import {appdata, load, save} from "../AppData";
import {CountryDropdown} from "react-country-region-selector";
import {useState} from "react";

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}
function Instruments() {
    const forceUpdate = useForceUpdate();
    const options = {
        clientSecret: 'pi_3KFlMXKNGtOWS9rw0kYh6Ni0_secret_a3rKNOqwSXc8qrG2Co9TikQQX'
    };
    load();
    function selectCountry(val) {
        appdata.country = val;
        save();
        forceUpdate();
    }
    return (
        <div>
            <Frame>
                <h2 className="offer-pay__title">
                    Выберете способ оплаты
                </h2>
                <div className="App">
                    AppDataCountry{appdata.country}---
                </div>
                <CountryDropdown
                    valueType = "short"
                    value={appdata.country}
                    onChange={(val) => selectCountry(val)} />

                <br/>
                <ul className="offer-pay__list">
                    <li className="offer-pay__item">
                        <div id="paypal-button-container" className="paypal"/>
                    </li>
                </ul>
                <div id="smart-button-container">
                    <div className="stripe">
                    </div>
                    <div className="paypal">
                    </div>
                </div>
            </Frame>
        </div>
    );
}

export default Instruments;

