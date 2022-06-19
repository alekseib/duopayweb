import Frame from "../common/Frame";
import Footer from "../common/Footer";
import {useTranslation} from "react-i18next";
import {useState} from "react";

export function CashOKPage() {
    const { t } = useTranslation();
    const [lang, setLang] = useState('ru');

    // @ts-ignore
    return (
        <div>
            <Frame>
                <h2 className="offer-pay__title">
                    {t("ThanksIConnectYou")}
                </h2>
                <Footer></Footer>
            </Frame>
        </div>
    );
}
