import Frame from "../common/Frame";
import React, {useState} from "react";
import Footer from "../common/Footer";
import {appdata} from "../model/AppData";
import ReactPixel from "react-facebook-pixel";
import {MySpinner} from "../common/MySpinner";

let busy = false;

export function CashPage() {
    const [phone, setPhone] = useState();
    const [phoneError, setPhoneError] = useState("");
    const [error, setError] = useState();

    const handleSubmit= (e: any) => {
        e.preventDefault();
        if (validate())
        {
            console.log("OK");
        }
    }

    const handlePhoneChange= (value: any) => {
           setPhone(value);
           // @ts-ignore
           setPhoneError("");
    }
    function validate()
    {
        if (phone === undefined)
        { // @ts-ignore
            setPhoneError("Обязательно!");
            return false;
        }

        if (!telephoneCheck(phone))
        { // @ts-ignore
            setPhoneError("Не менее 5 цифр!");
            return false;
        }
        return true;
    }

    function telephoneCheck(str: any) {
        return (str.match(/\d/g) || []).length > 5;
    }



    // @ts-ignore
    return (
        <div>
            <Frame>
                <h2 className="offer-pay__title">
                    Пожалуйста, оставьте здесь ваш емайл, я свяжусь с вами и мы договоримся где и когда вы сможете получить билеты!
                </h2>
                <div>
                    <form className="app-form" method="post" id="lead_form" onSubmit={(e) => handleSubmit(e)}>
                        <h2 className="app-title">
                            Пожалуйста, введите имя и емайл.
                            <br/>
                            На этот емайл мы вышлем вам билет.
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
                                {busy ? <MySpinner/> : <span>Далее</span>}
                            </button>
                        </div>
                    </form>
                </div>

                <Footer></Footer>
            </Frame>
        </div>
    );
}
