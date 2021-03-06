import Frame from "../common/Frame";
import Footer from "../common/Footer";
import {useTranslation} from "react-i18next";

export function CashOKPage() {
    const { t } = useTranslation();
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
