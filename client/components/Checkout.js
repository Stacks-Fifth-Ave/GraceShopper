import React from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
// import STRIPE_PUBLISHABLE from './constants/stripe';
const CURRENCY = 'US';
const fromUSToCent = amount => amount * 100;
const successPayment = data => {
  alert('Payment Successful');
};
const errorPayment = data => {
  alert('Payment Error');
};
const onToken = (amount, description) => token =>
  axios
    .post('pay', {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromUSToCent(amount)
    })
    .then(successPayment)
    .catch(errorPayment);

const Checkout = ({name, description, amount}) => (
  <StripeCheckout
    name={name}
    description={description}
    amount={fromUSToCent(amount)}
    token={onToken(amount, description)}
    currency={CURRENCY}
    // stripeKey={STRIPE_PUBLISHABLE}
  />
);
export default Checkout;

{
  /* <div className="App">
            <div className="App-header">
              <h2>Welcome to React</h2>
            </div>
            <p className="App-intro">
              <Checkout
                name="The Road to learn React"
                description="Only the Book"
                amount={1}
              />
            </p>
          </div> */
}
