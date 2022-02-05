import Frame from "../common/Frame";
import React from "react";
import Footer from "../common/Footer";
import {appdata} from "../model/AppData";

export function ThankYouPageForRefresh() {
    return (
        <div>
            <Frame>
                <h2 className="offer-pay__title">
                    Спасибо!
                </h2>
                <br/>
                <h2 className="app-title">Я послал вам новою ссылку на запись на электронную почту!</h2>
                <h2 className="app-title">{appdata.customerEmail}</h2>
                <br/>
                <h2 className="app-title">Приятного просмотра!</h2>
                <Footer/>
            </Frame>
        </div>
    );
}
