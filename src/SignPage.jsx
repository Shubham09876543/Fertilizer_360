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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/register", formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || "Error signing up");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Left Section (Form) */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-8 bg-white">
        <div className="max-w-md w-full">
          <h1 className="text-3xl font-bold text-green-700">Fertilizer360</h1>
          <p className="text-gray-600 mb-6">Know Before You Go: Real-Time Fertilizer Stock Alerts.</p>

          <h2 className="text-xl font-semibold mb-4">Get Started Now</h2>

          {message && <p className="text-center text-red-500">{message}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selection */}
            <div>
              <label className="block text-gray-700 font-medium">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:ring focus:ring-green-300"
              >
                <option value="">Select Option</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="shopkeeper">Shop Keeper</option>
              </select>
            </div>

            {/* Name */}
            <div>
              <label className="block text-gray-700 font-medium">Name</label>
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
              <label className="block text-gray-700 font-medium">Email Address</label>
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
              <label className="block text-gray-700 font-medium">Password</label>
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
              className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition"
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
      <div className="hidden md:block w-1/2 bg-green-100">
        <img src="src/assets/SignPage.jpeg" alt="Fertilizers" className="h-full w-full object-cover" />
      </div>
    </div>
  );
};

export default SignPage;
