import Frame from "../common/Frame";
import React from "react";
import Footer from "../common/Footer";
import {appdata} from "../model/AppData";
import ReactPixel from "react-facebook-pixel";
import {useTranslation} from "react-i18next";

export function ThankYouPage() {
    const { t } = useTranslation();
    ReactPixel.init('325830968618472');
    ReactPixel.track( 'Purchase', {value: appdata.amount, currency: 'EUR'});
    return (
        <div>
            <Frame>
                <h2 className="offer-pay__title">
                    {t("YouPaymentOKThankYou!")}
                </h2>
                <br/>
                <h2 className="app-title">{t("ISendTicketsToEmail!")}</h2>
                <h2 className="app-title">{appdata.customerEmail}</h2>
                <br/>
                <h2 className="app-title">{t("SeeYouOnConcert!")}</h2>
                <Footer></Footer>
            </Frame>
        </div>
    );
}
