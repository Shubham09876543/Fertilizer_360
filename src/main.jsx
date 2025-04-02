import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import SignPage from "./SignPage";
import AdminDashboard from "./Admin/Admin_dash.jsx"; // Ensure correct path
import "./index.css"; // Ensure styles are included
import ContactUs from "../../../src/frontend/contactus_page.jsx";
import ShopPage from "../../../src/frontend/ShopPage.jsx";
import About from "../../../src/frontend/About.jsx";
import ShopDetails from "../../../src/frontend/ShopDetails.jsx";
import FertilizerDetails from "../../../src/frontend/FertilizerDetails.jsx";
import AdvanceBooking from "../../../src/frontend/advance_booking.jsx";
import ProfilePage from "../../../src/frontend/ProfilePage.jsx";
import HomePage from "../../../src/frontend/home_page.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} /> {/* Default to Login */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignPage />} />
        <Route path="/admin/*" element={<AdminDashboard />} /> 
        <Route path="/home-page" element={<HomePage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop/:id" element={<ShopDetails />} />
        <Route path="/fertilizer/:id" element={<FertilizerDetails />} />
        <Route path="/fertilizer/:id/advance_booking" element={<AdvanceBooking />} />
        <Route path="/profile" element={<ProfilePage />} /> {/* Profile Page Route */}
      </Routes>
    </Router>
  </React.StrictMode>
);
