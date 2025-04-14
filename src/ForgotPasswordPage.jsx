import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage('Please enter your email.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/forgot-password', { email });

      if (response.data.message) {
        setMessage('Reset link sent to your email.');
      } else {
        setMessage(response.data.error || 'Failed to send reset email.');
      }
    } catch (err) {
      console.error('Frontend error:', err.response?.data || err.message);
      setMessage(err.response?.data?.error || 'Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left section - Form */}
      <div className="flex flex-col items-center justify-center w-full px-10 md:w-1/2">
        <div className="w-full max-w-md">
          <h1 className="mb-1 text-3xl font-bold text-gray-800">Fertilizer360</h1>
          <p className="mb-6 text-sm text-gray-500">
            Know Before You Go: Real-Time Fertilizer Stock Alerts.
          </p>

          <h2 className="mb-1 text-xl font-semibold">Forgot Password</h2>
          <p className="mb-4 text-sm text-gray-600">
            Enter your Credentials to access your account
          </p>

          {message && <p className="mb-2 text-sm text-red-500">{message}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              type="submit"
              className="w-full py-2 text-white transition duration-200 bg-green-700 rounded-md hover:bg-green-800"
            >
              SEND MAIL
            </button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-sm text-gray-600">Have an account? </span>
            <Link to="/login" className="text-sm text-blue-600 hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Right section - Image */}
      <div className="relative hidden h-screen md:block md:w-1/2">
        <img
          src="src/assets/SignPage.png"
          alt="Fertilizer"
          className="object-cover w-full h-full rounded-l-3xl"
        />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
