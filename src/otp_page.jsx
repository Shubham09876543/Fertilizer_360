import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OtpVerifyPage = () => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/verify-otp", { otp });

      setMessage(response.data.message);
      if (response.data.success) {
        const role = response.data.user.role;
        if (role === "admin") navigate("/admin");
        else navigate("/home-page");
      }
    } catch (error) {
      setMessage(error.response?.data?.error || "OTP verification failed");
    }
  };

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif"
    }}>
      {/* Left Panel */}
      <div style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
        padding: "40px"
      }}>
        <div style={{ width: "100%", maxWidth: "400px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "8px" }}>Fertilizer360</h1>
          <p style={{ color: "#555", fontSize: "13px", marginBottom: "30px" }}>
            Know Before You Go: Real-Time Fertilizer Stock Alerts.
          </p>

          <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "15px" }}>OTP Varify</h2>
          <p style={{ fontSize: "13px", marginBottom: "20px" }}>
            Enter your Credentials to access your account
          </p>

          {message && (
            <p style={{ color: "red", textAlign: "center", marginBottom: "10px" }}>{message}</p>
          )}

          <form onSubmit={handleSubmit}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>OTP</label>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                fontSize: "14px",
                marginBottom: "20px"
              }}
            />
            <button
              type="submit"
              style={{
                width: "106%",
                backgroundColor: "#4B6320",
                color: "#fff",
                padding: "10px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "500"
              }}
            >
              Verify
            </button>
          </form>
        </div>
      </div>

      {/* Right Image Panel */}
      <div style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        borderTopLeftRadius: "30px",
        borderBottomLeftRadius: "30px"
      }}>
        <img
          src="https://www.bhg.com/thmb/NIhXZpszfRkBe6_4hv8BDfwl7vU=/4000x0/filters:no_upscale():strip_icc()/BHG-Types-of-Garden-Fertilizer-Fb-fTYGcqqK9y1MGOlfzOh-52e52c5904ad4418ba764013ab322c90.jpg" // Replace with your image path
          alt="Fertilizers"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
        />
      </div>
    </div>
  );
};

export default OtpVerifyPage;
