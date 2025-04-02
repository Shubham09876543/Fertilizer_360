import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [formData, setFormData] = useState({ role: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", formData);
      setMessage(response.data.message);
      
      if (response.data.success) {
        localStorage.setItem("user", JSON.stringify(response.data.user)); // Save user session
        
        // Redirect based on role
        if (response.data.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/home-page");
        }
      }
    } catch (error) {
      setMessage(error.response?.data?.error || "Login failed");
    }
  };
  

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 md:flex-row">
      <div className="flex items-center justify-center w-full p-8 bg-white md:w-1/2">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-green-700">Fertilizer360</h1>
          <p className="mb-6 text-gray-600">Know Before You Go: Real-Time Fertilizer Stock Alerts.</p>

          <h2 className="mb-4 text-xl font-semibold">Welcome back!</h2>

          {message && <p className="text-center text-red-500">{message}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium text-gray-700">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-2 border rounded-md focus:ring focus:ring-green-300"
              >
                <option value="">Select Option</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="shop_keeper">Shop Keeper</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full p-2 border rounded-md focus:ring focus:ring-green-300"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full p-2 border rounded-md focus:ring focus:ring-green-300"
              />
            </div>

            <button type="submit" className="w-full py-2 text-white transition bg-green-700 rounded-md hover:bg-green-800">
              Login
            </button>
          </form>

          <p className="mt-4 text-center text-gray-600">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden w-1/2 bg-green-100 md:block">
        <img src="src/assets/SignPage.jpeg" alt="Fertilizers" className="object-cover w-full h-full" />
      </div>
    </div>
  );
};

export default LoginPage;
