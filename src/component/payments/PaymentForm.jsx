import React, { useState } from "react";
import { CardElement, useStripe, useElements, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const backend = import.meta.env.VITE_BACKEND_URL;
// Load your publishable key from Stripe dashboard
const stripePromise = loadStripe("pk_test_51S8mTC75bvMhSFzKEZ4YOrRgREqk0PkxxuerT2LYihrKgK2wpBHSgyKi2JeNGb1cnpwyEVD0JQlTKfiCcFwTNbM000y9ssTkUp");

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    setLoading(true);
    setMessage("");
    const access_token = localStorage.getItem("access_token");
    const userId = localStorage.getItem('userId');

    try {
      const res = await axios.get(`${backend}/rider/getLiveRide/${userId}`,
        {
          headers: {
            'Authorization': `Bearer ${access_token}`
          }
        }
      )
      const rideId = res.data.data[0].id;
      console.log("Ride ID:", rideId);


      const fare= localStorage.getItem('fare');
      // Call backend to create payment intent
      console.log(fare);

      const { data } = await axios.post(`${backend}/payment/create-payment/${userId}`,
        {
          amount: fare, // $50.00 in cents
          currency: "inr",
          method: "card"
          // Replace with Supabase user id
        },
        {
          headers: {
            'Authorization': `Bearer ${access_token}`
          }
        }
      );

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setMessage(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          setMessage("✅ Payment successful!");
          // Optionally save to Supabase via backend
        }
      }
      alert("pYment Sucessfully")
    } catch (error) {
      setMessage("❌ " + error.message);
    }

    setLoading(false);
  };

  return (

    <div className="max-w-md mx-auto p-6 shadow-lg rounded-2xl bg-white mt-10">
      <div className='w-full flex h-fit  p-2  font-extrabold text-center'>
        <h1 className='flex justify-bottom ml-4 text-l text-black/80 font-bold'>
          <span className='mt-2 cursor-pointer' onClick={() => navigate('/')}>RATHI</span>
        </h1>
        {/* <div className='w-9/10'>
          <h1 className='text-blue-700 font-bold text-3xl'>Rider Dashboard</h1>
        </div> */}
      </div>
      <h2 className="text-xl font-semibold mb-4">Stripe Payment</h2>
      <CardElement className="p-2 border rounded-md mb-4" />
      <button
        onClick={handlePayment}
        disabled={!stripe || loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        {loading ? "Processing..." : "Pay "}
      </button>
      <button
        onClick={()=>navigate('/liveRide')}
      
        className="bg-red-700 ml-10   text-white px-2 py-2 rounded-lg hover:bg-red-700 transition"
      >
        Cancel
      </button>
      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  );
}

export default function Payment() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
}
