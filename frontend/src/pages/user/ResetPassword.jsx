import React from 'react'
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const ResetPassword = () => {

    const navigate = useNavigate();

     const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
//   const [msg, setMsg] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    
    try {
      const res = await axiosInstance.post(`/resetPassword?token=${token}`, {
        password,
        confirmPassword: confirm,
      },{ withCredentials: true });
      toast.success(res.data.msg);
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Error');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
  <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">🔒 Set New Password</h2>

    <form onSubmit={handleReset} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">New Password</label>
        <input
          type="password"
          placeholder="Enter new password"
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm new password"
          onChange={(e) => setConfirm(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition duration-200"
      >
        ✅ Submit
      </button>
    </form>
  </div>
</div>
  )
}

export default ResetPassword