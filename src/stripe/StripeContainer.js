import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "./CheckoutForm";
const PUBLIC_KEY =
  "pk_test_51L1UkuAD238KB5cWe2e5O4Kxlmpj5KkelEzv9AaUPeWsRQyHVzH4APVNrM76F7vx6s7jvgLJ4xsueHV8xrtb7B410022lyM5Em";
const stripeTestPromise = loadStripe(PUBLIC_KEY);

const StripeContainer = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default StripeContainer;
