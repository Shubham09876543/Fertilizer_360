import React from "react";
import { FaBorderTopLeft } from "react-icons/fa6";

const ForgotPassword = () => {
  return (
    <div style={styles.container}>
      <div style={styles.leftSection}>
        <div style={styles.contentWrapper}>
          <h1 style={styles.logo}>Fertilizer360</h1>
          <p style={styles.tagline}>Know Before You Go: Real-Time Fertilizer Stock Alerts.</p>

          <div style={styles.formContainer}>
            <h2 style={styles.heading}>Forgot Password</h2>
            <p style={styles.subHeading}>Enter your Credentials to access your account</p>

            <label htmlFor="email" style={styles.label}>Email address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              style={styles.input}
            />

            <button style={styles.button}>GET OTP</button>

            <p style={styles.signInText}>
              Have an account? <a href="#" style={styles.signInLink}>Sign In</a>
            </p>
          </div>
        </div>
      </div>

      <div style={styles.rightSection}>
        <img
          src="https://www.bhg.com/thmb/NIhXZpszfRkBe6_4hv8BDfwl7vU=/4000x0/filters:no_upscale():strip_icc()/BHG-Types-of-Garden-Fertilizer-Fb-fTYGcqqK9y1MGOlfzOh-52e52c5904ad4418ba764013ab322c90.jpg"
          alt="Fertilizer products"
          style={styles.image}
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "97vh",
    fontFamily: "Arial, sans-serif",
    margin: 0,
    padding: 0,
  },
  leftSection: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  contentWrapper: {
    maxWidth: "340px",
    width: "100%",
    padding: "20px",
  },
  logo: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "4px",
  },
  tagline: {
    fontSize: "12px",
    color: "#666",
    marginBottom: "30px",
  },
  formContainer: {
    width: "100%",
  },
  heading: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  subHeading: {
    fontSize: "13px",
    marginBottom: "20px",
    color: "#444",
  },
  label: {
    fontSize: "12px",
    marginBottom: "4px",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#4f772d",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
  },
  signInText: {
    marginTop: "14px",
    fontSize: "13px",
  },
  signInLink: {
    color: "#2e59d9",
    textDecoration: "none",
    fontWeight: "bold",
  },
  rightSection: {
    flex: 1,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  borderTopLeftRadius: "30px",
        borderBottomLeftRadius: "30px"
  },
};

export default ForgotPassword;
