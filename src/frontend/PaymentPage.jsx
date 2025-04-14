import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./navbar";
import Footer from "./footer";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { fertilizer, quantity, totalPrice } = location.state || {};

  // Load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Failed to load Razorpay. Try again.");
      return;
    }

    try {
      // OPTIONAL: Call backend to create an order in Razorpay (if required)
      const razorpayOrder = await axios.post("http://localhost:5000/create-razorpay-order", {
        amount: totalPrice * 100, // amount in paisa
      });

      const options = {
        key: "YOUR_RAZORPAY_KEY", // replace with your Razorpay public key
        amount: totalPrice * 100,
        currency: "INR",
        name: "AgroShop",
        description: "Fertilizer Purchase",
        image: "/logo.png", // optional
        order_id: razorpayOrder.data.id, // from backend
        handler: async function (response) {
          // ✅ Payment success: Save order to DB
          await axios.post("http://localhost:5000/place-order", {
            customer_name: "John Doe", // you can dynamically get from auth/user context
            customer_email: "john@example.com",
            fertilizer_name: fertilizer.name,
            quantity,
            total_price: totalPrice,
          });

          // ✅ Update stock
          await axios.put(`http://localhost:5000/fertilizer/${fertilizer.id}/update-stock`, {
            quantity,
          });

          alert("Payment successful and order placed!");
          navigate("/"); // redirect
        },
        prefill: {
          name: "John Doe",
          email: "john@example.com",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed. Try again.");
    }
  };

  useEffect(() => {
    if (!fertilizer) navigate("/");
  }, [fertilizer, navigate]);

  return (
    <div>
      <Navbar />
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h2>Payment Gateway</h2>
        <p>You’re purchasing: <strong>{fertilizer?.name}</strong></p>
        <p>Total to Pay: ₹{totalPrice}</p>
        <button onClick={handlePayment} style={{ padding: '10px 25px', fontSize: '16px', marginTop: '20px' }}>
          Pay with Razorpay
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentPage;
