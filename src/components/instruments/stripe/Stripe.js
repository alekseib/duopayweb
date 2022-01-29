import Frame from "../../frame/Frame";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import {appdata, load} from "../../AppData";
import {CheckoutForm} from "./CheckoutForm";
import './Stripe.css';
const stripePromise = loadStripe('pk_live_Ym4pj7nfoaBPMuFYyUI0nViM006gcwB8eD');


export default function Stripe() {
    load();
    console.log(appdata.redirectData)
    const options = {
        clientSecret: appdata.redirectData
    };
    return (
        <div>
            <Frame>
                <div id="smart-button-container">
                    <div className="stripe">
                        <Elements stripe={stripePromise} options={options} >
                            <CheckoutForm/>
                        </Elements>
                    </div>
                </div>
            </Frame>
        </div>
    );
}
