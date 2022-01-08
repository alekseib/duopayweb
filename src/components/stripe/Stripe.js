import React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {CardElement, Elements, ElementsConsumer} from '@stripe/react-stripe-js';
import './Stripe.css';
class CheckoutForm extends React.Component {
    handleSubmit = async (event) => {
        event.preventDefault();
        const {stripe, elements} = this.props;

        if (elements == null) {
            return;
        }

        const {} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });
    };

    render() {
        const {stripe} = this.props;
        return (
            <form onSubmit={this.handleSubmit}>
                <CardElement />
                <button type="submit" disabled={!stripe}>
                    Pay
                </button>
            </form>
        );
    }
}

const InjectedCheckoutForm = () => (
    <ElementsConsumer>
        {({stripe, elements}) => (
            <CheckoutForm stripe={stripe} elements={elements} />
        )}
    </ElementsConsumer>
);

const stripePromise = loadStripe('pk_live_Ym4pj7nfoaBPMuFYyUI0nViM006gcwB8eD');

export const Stripe = () => (
    <Elements stripe={stripePromise}>
        <InjectedCheckoutForm />
    </Elements>
);

