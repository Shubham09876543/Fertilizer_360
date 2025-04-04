import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LoginPage from "./LoginPage";
// import SignPage from "./SignPage";
import HomePage from "./frontend/home_page.jsx";
import ShopPage from "./frontend/ShopPage.jsx";
import ContactUs from "./frontend/contactus_page.jsx";
import About from "./frontend/About.jsx";
// import AdminDashboard from "./Admin/Admin_dash.jsx"; // Ensure correct path
// import "./index.css"; // Ensure styles are included


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* <Route path="/" element={<LoginPage />} /> Default to Login */}
        {/* <Route path="/login" element={<LoginPage />} /> */}
        {/* <Route path="/signup" element={<SignPage />} /> */}
        {/* <Route path="/admin/*" element={<AdminDashboard />} />  */}
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/admin/" element={<AdminDashboard />} /> 
        {/* <Route path="/shop/:id" element={<ShopDetails />} />
        <Route path="/fertilizer/:id" element={<FertilizerDetails />} />
        <Route path="/fertilizer/:id/advance_booking" element={<AdvanceBooking />} />  */}
        {/* <Route path="/profile" element={<ProfilePage />} />  */}
      </Routes>
    </Router>
  </React.StrictMode>
);
