const {stripe_publishable} = require('../../secrets');
const configureStripe = require('stripe');
const router = require('express').Router();

const stripeKey = stripe_publishable || process.env.stripe_publishable;
const stripe = configureStripe(stripeKey);

const postStripeCharge = res => (stripeErr, stripeRes) => {
  //   if (stripeErr) {
  //     res.status(500).send({ error: stripeErr });
  //   } else {
  res.status(200).send({success: stripeRes});
  //   }
};

router.post('/', (req, res) => {
  stripe.charges.create(req.body, postStripeCharge(res));
});

module.exports = router;
