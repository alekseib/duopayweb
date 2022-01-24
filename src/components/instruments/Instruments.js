import './Instruments.css';
import Frame from "../frame/Frame";
import {appdata, load, save} from "../AppData";
import {CountryDropdown} from "react-country-region-selector";
import {useState} from "react";
import {Paysera} from "./paysera/paysera";
import { useHistory } from "react-router-dom";

function useForceUpdate(){
    // eslint-disable-next-line no-unused-vars
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}
export function Instruments() {
    const history = useHistory();
    const forceUpdate = useForceUpdate();
    load();
    function selectCountry(val) {
        appdata.country = val;
        save();
        forceUpdate();
    }

    function selectPayPal() {
        history.push("/paypal");
    }

    return (
        <div>
            <Frame>
                <br/>
                <CountryDropdown
                    valueType = "short"
                    value={appdata.country}
                    onChange={(val) => selectCountry(val)} />
                <h2 className="offer-pay__title">
                    Выберете способ оплаты
                </h2>
                <div className="App">
                </div>
                <br/>
                <Paysera/>
                <div>
                    <img src="img/PayPal.PNG" alt="" onClick={()=>selectPayPal()}/>
                </div>
            </Frame>
        </div>
    );
}
export default Instruments;

