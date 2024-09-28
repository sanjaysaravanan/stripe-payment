import "./App.css";

import { loadStripe } from "@stripe/stripe-js";

function App() {
  const make_payment = async () => {
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_SECRET);

    const response = await fetch("http://localhost:8080/get-session", {
      body: JSON.stringify({ products: [] }),
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    });

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };
  return (
    <>
      <button onClick={make_payment}>Process Payment</button>
    </>
  );
}

export default App;
