import Frame from "../common/Frame";
import React from "react";
import Footer from "../common/Footer";
import {appdata} from "../model/AppData";
import ReactPixel from "react-facebook-pixel";

export function ThankYouPage() {
    ReactPixel.init('325830968618472');
    ReactPixel.track( 'Purchase', {value: appdata.amount, currency: 'EUR'});
    return (
        <div>
            <Frame>
                <h2 className="offer-pay__title">
                    Ваш платеж успешно завершен! Спасибо за покупку!
                </h2>
                <br/>
                <h2 className="app-title">Я послал вам билет и ссылку на запись на электронную почту!</h2>
                <h2 className="app-title">{appdata.customerEmail}</h2>
                <br/>
                <h2 className="app-title">Приятного просмотра!</h2>
                <Footer></Footer>
            </Frame>
        </div>
    );
}
