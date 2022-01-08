import React from "react";
import { useHistory } from "react-router-dom";
import {appdata} from "../AppData";



export default function ReactPayPal() {
    const [paid, setPaid] = React.useState(false);
    const [error] = React.useState(null);
    const paypalRef = React.useRef();

    // To show PayPal buttons once the component loads
    React.useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                description: appdata.productName,
                                amount: {
                                    currency_code: "EUR",
                                    value: appdata.price,
                                },
                            },
                        ],
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    setPaid(true);
                    console.log(order);
                },
                onError: (err) => {
                    //   setError(err),
                    console.error(err);
                },
            })
            .render(paypalRef.current);
    }, []);

    // If the payment has been made
    if (paid) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        let history = useHistory();
        history.push('/ok')
        return <div>Платеж успешен!</div>;
    }

    // If any error occurs
    if (error) {
        return <div>Что-то пошло не так! Пожалуйста попробуйте еще.</div>;
    }
    // Default Render
    return (
        <div>
            <div ref={paypalRef} />
        </div>
    );
}
