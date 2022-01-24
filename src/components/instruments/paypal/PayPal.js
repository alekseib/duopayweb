import Frame from "../../frame/Frame";
import PayPalButtons from "./PayPalButtons";

export function PayPal() {
    return (
        <div>
            <Frame>
                <br/>
                <h2 className="offer-pay__title">
                    Выберете вариант оплаты
                </h2>
                <br/>
                <br/>
                <br/>
                <PayPalButtons/>
            </Frame>
        </div>
    );
}
export default PayPal;

