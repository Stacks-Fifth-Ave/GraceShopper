import React from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import {STRIPE_PUBLISHABLE} from '../../secrets.js';
const CURRENCY = 'USD';
const fromUSDToCent = amount => amount * 100;
import {paymentSuccess} from '../store/cart';
const onToken = (amount, description) => async token => {
  const data = await axios.post('./api/payment', {
    description,
    source: token.id,
    currency: CURRENCY,
    amount: fromUSDToCent(amount)
  });
  if (data.status === 200) {
    paymentSuccess();
  }
};

const Checkout = ({name, description, amount}) => (
  <StripeCheckout
    name={name}
    description={description}
    amount={fromUSDToCent(amount)}
    token={onToken(amount, description)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE}
  />
);

export default Checkout;
