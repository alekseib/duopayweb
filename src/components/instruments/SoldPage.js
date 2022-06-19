import Frame from "../common/Frame";
import React, {useState} from "react";
import Footer from "../common/Footer";
import {appdata, save} from "../model/AppData";
import ReactPixel from "react-facebook-pixel";
import {MySpinner} from "../common/MySpinner";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";


export function SoldPage () {
    const { t } = useTranslation();
    const [lang, setLang] = useState('ru');
    const history = useHistory();
    const [busy, setBusy] = useState();
    const [phone, setPhone] = useState();
    const [phoneError, setPhoneError] = useState("");
    const [error, setError] = useState();

    const handleSubmit= (e) => {
        e.preventDefault();
        if (validate())
        {
            console.log("OK");
            selectCash();
        }
    }

    const handlePhoneChange= (value) => {
           setPhone(value);
           // @ts-ignore
           setPhoneError("");
    }
    function validate()
    {
        if (phone === undefined)
        { // @ts-ignore
            setPhoneError(t("Mandatory!"));
            return false;
        }

        if (!telephoneCheck(phone))
        { // @ts-ignore
            setPhoneError(t("5DigitsMin!"));
            return false;
        }
        return true;
    }

    function telephoneCheck(str) {
        return (str.match(/\d/g) || []).length > 5;
    }
    function selectCash() {
        if (busy) return;
        // @ts-ignore
        setBusy(true);
        // @ts-ignore
        setError("");
        ReactPixel.init('325830968618472');
        ReactPixel.track('InitiateCheckout');
        appdata.paymentMethod = "CASH";
        appdata.paymentInstrument = "CASH";
        // @ts-ignore
        appdata.customerPhone = phone;
        axios.post('https://api.duoclassico.eu/functions/init', appdata)
            .then(response => {
                if (response.status !== 200) {
                    // @ts-ignore
                    setError(response.statusText);
                    return;
                }
                // @ts-ignore
                appdata.orderId = response.data["orderId"];
                appdata.redirectData = response.data["redirectData"];
                save();
                // @ts-ignore
                history.push("/thankyoushort");
            })
            .catch((error) => {
                return Promise.reject(error)
            })
            .finally(() => {
                // @ts-ignore
                setBusy(false);
            });
    }

    // @ts-ignore
    return (
        <div>
            <Frame>
              <h2 className="offer-pay__title">
                  {t("AllTicketsSold")}
             </h2>
                <h2 className="offer-pay__title">
                    {t("SomeOneCanReturnTickets")}
                </h2>

                <div>
                    <form className="app-form" method="post" id="lead_form" onSubmit={(e) => handleSubmit(e)}>
                        <h2 className="app-title">
                            {t("PleaseLeavePhoneIWillCallYouIfTickets")}
                        </h2>
                        <div>
                            <input
                                type="text"
                                name="phone"
                                onChange={e => handlePhoneChange(e.target.value)}
                                className="form-control"
                                placeholder="Phone"
                                id="phone"/>
                            <div className="text-danger">{phoneError}</div>
                        </div>
                        <p className="app-text">
                            {error}
                        </p>
                        <div className="app-button d-flex justify-content-around">
                            <button type="submit" className="app-btn app-btn-further next-step-btn">
                                {busy ? <MySpinner/> : <span>{t("NextButton")}</span>}
                            </button>
                        </div>
                    </form>
                </div>

                <Footer></Footer>
            </Frame>
        </div>
    );
}
