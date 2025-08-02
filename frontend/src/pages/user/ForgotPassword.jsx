import React, { useState } from 'react'
import axiosInstance from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';


const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axiosInstance.post('/forgotPassword', { email },{withCredentials: true});
        toast.success(res.data.msg);
        navigate('/login');
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
  <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">
    <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Reset Your Password</h1>

    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="you@example.com"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
      >
        Send Reset Link
      </button>
    </form>
  </div>
</div>
    )
}

export default ForgotPassword