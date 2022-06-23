import Frame from "../common/Frame";
import Footer from "../common/Footer";
import {useTranslation} from "react-i18next";
import {useState} from "react";

export function ThankYouShortPage() {
    const { t } = useTranslation();
    // @ts-ignore
    return (
        <div>
            <Frame>
                <h2 className="offer-pay__title">
                    {t("ThankYou!")}
                </h2>
                <Footer></Footer>
            </Frame>
        </div>
    );
}
