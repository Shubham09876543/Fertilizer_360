import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./navbar";
import Footer from "./footer";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { fertilizer, quantity, totalPrice } = location.state || {};

  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (!fertilizer) navigate("/shop");
  }, [fertilizer, navigate]);

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
      const razorpayOrder = await axios.post("http://localhost:5000/create-razorpay-order", {
        amount: totalPrice * 100,
      });

      const options = {
        key: "rzp_test_jQOReseIWUxIfd",
        amount: totalPrice * 100,
        currency: "INR",
        name: "AgroShop",
        description: "Fertilizer Purchase",
        image: "/logo.png",
        order_id: razorpayOrder.data.id,
        handler: async function (response) {
          await axios.post("http://localhost:5000/place-order", {
            customer_name: user.name,
            customer_email: user.email,
            fertilizer_name: fertilizer.name,
            quantity,
            total_price: totalPrice,
          });

          await axios.put(`http://localhost:5000/fertilizer/${fertilizer.id}/update-stock`, {
            quantity,
          });

          alert("Payment successful and order placed!");
          navigate("/shop");
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#6a1b9a",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed. Try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{
        maxWidth: "600px",
        margin: "50px auto",
        padding: "30px",
        boxShadow: "0 0 15px rgba(0,0,0,0.1)",
        borderRadius: "12px",
        background: "#fefefe",
        textAlign: "center"
      }}>
        <h2 style={{ color: "#6a1b9a" }}>Secure Payment</h2>
        <p style={{ fontSize: "18px", margin: "10px 0" }}>
          Hello, <strong>{user.name}</strong> ({user.email})
        </p>
        <p style={{ fontSize: "16px", margin: "20px 0" }}>
          You’re purchasing: <strong>{fertilizer?.name}</strong><br />
          Quantity: <strong>{quantity}</strong><br />
          Total Amount: <strong style={{ color: "#2e7d32" }}>₹{totalPrice}</strong>
        </p>
        <button
          onClick={handlePayment}
          style={{
            padding: '12px 30px',
            fontSize: '16px',
            backgroundColor: '#6a1b9a',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            marginTop: '20px'
          }}
        >
          Pay with Razorpay
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentPage;
