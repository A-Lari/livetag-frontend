import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      console.log("Token généré :", paymentMethod);
      try {
        const { id } = paymentMethod;
        const response = await axios.post(
          "https://livetag-backend.osc-fr1.scalingo.io/stripe/charge",
          {
            amount: 1000,
            id: id,
          }
        );
        if (response.data.success) console.log("Paiement réussi");
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <CardElement options={{ hidePostalCode: true }} />
      <button>Payer</button>
    </form>
  );
};
