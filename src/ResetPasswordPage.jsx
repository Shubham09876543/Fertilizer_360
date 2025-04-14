import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setMessage('Please fill out all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/reset-password/${token}`, {
        password,
      });

      if (response.data.message) {
        setSuccess(true);
        setMessage('Password reset successfully. Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2500);
      } else {
        setMessage(response.data.error || 'Failed to reset password.');
      }
    } catch (error) {
      console.error('Reset error:', error.response?.data || error.message);
      setMessage(error.response?.data?.error || 'Something went wrong.');
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

          <h2 className="mb-1 text-xl font-semibold text-green-700">Reset Password</h2>
          <p className="mb-4 text-sm text-gray-600">Enter your new password</p>

          {message && (
            <p className={`mb-2 text-sm text-center ${success ? 'text-green-600' : 'text-red-500'}`}>
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              type="submit"
              className="w-full py-2 text-white transition duration-200 bg-green-700 rounded-md hover:bg-green-800"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>

      {/* Right section - Image */}
      <div className="relative hidden h-screen md:block md:w-1/2">
        <img
          src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRMBV_Wx5GwWR88rvDQuJSFd_g6jD51q9aybrTpZKvwgGv5RnR_"
          alt="Fertilizer"
          className="object-cover w-full h-full rounded-l-3xl"
        />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
