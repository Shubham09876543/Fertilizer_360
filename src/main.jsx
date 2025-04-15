import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import SignPage from "./SignPage";
import AdminDashboard from "./Admin/Admin_dash.jsx"; // Ensure correct path
import "./index.css"; // Ensure styles are included
import ContactUs from "./frontend/contactus_page.jsx";
import About from "./frontend/About.jsx";
import FertilizerDetails from "./frontend/FertilizerDetails.jsx";
// import AdvanceBooking from "../../../src/frontend/advance_booking.jsx";
import ProfilePage from "./frontend/ProfilePage.jsx";
import HomePage from "./frontend/home_page.jsx";
import ShopPage from "./frontend/ShopPage.jsx";
import ShopDetails from "./frontend/ShopDetails.jsx";
import OrderPage from "./frontend/OrderPage.jsx";
import AdminOrders from "./Admin/admin_orders.jsx";
import ForgotPasswordPage from "./ForgotPasswordPage.jsx";
import ResetPasswordPage from "./ResetPasswordPage.jsx";
import ShopkerDash from "./ShopKeeper/Shop_dash.jsx";
import PaymentPage from "./frontend/PaymentPage.jsx";
// import ShopkerDash from "./ShopKeeper/Shop_dash.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} /> {/* Default to Login */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignPage />} />
        <Route path="/admin/*" element={<AdminDashboard />} /> 
        <Route path="/shopkeeper-dash/*" element={<ShopkerDash />} /> 
        <Route path="/home-page" element={<HomePage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop/:id" element={<ShopDetails />} />
        <Route path="/fertilizer/:id" element={<FertilizerDetails />} />
        <Route path="/fertilizer/:id/order" element={<OrderPage />} />
        <Route path="/profile" element={<ProfilePage />} /> {/* Profile Page Route */}
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
