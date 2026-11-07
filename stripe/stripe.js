import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  maxNetworkRetries: 2,
});

export const constructStripeWebhookEvent = (
  payload,
  signature,
  endpointSecret,
) => {
  return stripe.webhooks.constructEvent(payload, signature, endpointSecret);
};

export const createStripeCheckoutSession = async (stripeUID, priceId) => {
  const params = {
    customer: stripeUID,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: "subscription",
    currency: "usd",
    allow_promotion_codes: true,
    success_url: process.env.SUCCESS_URL,
    cancel_url: process.env.CANCEL_URL,
    billing_address_collection: "auto",
    automatic_tax: { enabled: JSON.parse(process.env.AUTOMATIC_TAX) },
  };

  return await stripe.checkout.sessions.create(params, {
    idempotencyKey: uuidv4(),
  });
};

export const createStripeCustomer = async (firebaseUID, email) => {
  const userParams = {
    email: email,
    metadata: {
      firebaseUID: firebaseUID,
    },
  };
  return await stripe.customers.create(userParams, {
    idempotencyKey: uuidv4(),
  });
};

export const findStripeCustomerByFirebaseUID = async (firebaseUID) => {
  const queryParams = { query: `metadata['firebaseUID']:'${firebaseUID}'` };
  return await stripe.customers.search(queryParams, {
    idempotencyKey: uuidv4(),
  });
};

export const findStripeCustomerSubscriptionInfo = async (stripeUID) => {
  /* subscription.data[0] on success */
  return await stripe.subscriptions.list({
    customer: stripeUID,
  });
};
