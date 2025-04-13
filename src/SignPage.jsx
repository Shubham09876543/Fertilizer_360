import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SignPage = () => {
  const [formData, setFormData] = useState({
    role: "",
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error"); // "success" or "error"

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.role) {
      setMessage("Please select a role.");
      setMessageType("error");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/register", formData);
      setMessage(response.data.message || "Registered successfully!");
      setMessageType("success");

      // Clear form on success
      setFormData({ role: "", name: "", email: "", password: "" });
    } catch (error) {
      setMessage(error.response?.data?.error || "Error signing up");
      setMessageType("error");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 md:flex-row">
      {/* Left Section (Form) */}
      <div className="flex items-center justify-center w-full p-8 bg-white md:w-1/2">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-green-700">Fertilizer360</h1>
          <p className="mb-6 text-gray-600">Know Before You Go: Real-Time Fertilizer Stock Alerts.</p>

          <h2 className="mb-4 text-xl font-semibold">Get Started Now</h2>

          {message && (
            <p className={`text-center mb-2 ${messageType === "success" ? "text-green-600" : "text-red-500"}`}>
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selection */}
            <div>
              <label className="block font-medium text-gray-700">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:ring focus:ring-green-300"
                required
              >
                <option value="">Select Option</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="shop_keeper">Shop Keeper</option>
              </select>
            </div>

            {/* Name */}
            <div>
              <label className="block font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full p-2 border rounded-md focus:ring focus:ring-green-300"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full p-2 border rounded-md focus:ring focus:ring-green-300"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full p-2 border rounded-md focus:ring focus:ring-green-300"
                required
              />
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full py-2 text-white transition bg-green-700 rounded-md hover:bg-green-800"
            >
              Signup
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-4 text-center text-gray-600">
            Have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* Right Section (Image) */}
      <div className="hidden w-1/2 bg-green-100 md:block">
        <img src="src/assets/SignPage.png" alt="Fertilizers" className="object-cover w-full h-full" />
      </div>
    </div>
  );
};

export default SignPage;
