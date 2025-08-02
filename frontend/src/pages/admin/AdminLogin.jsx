import React from 'react'
import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import { toast } from 'react-hot-toast';

const AdminLogin = () => {
  const { login } = useContext(AdminContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAdminLogin = async (data) => {
    try {
      const response = await axiosInstance.post('/admin/login', data, { withCredentials: true });

      const { user, token } = response.data;

      if (user.role !== 'admin') {
        toast.error("Access denied. Not an admin user.");
        return;
      }
      console.log("Admin login response: hahahahahah", response.data);
      login(response.data); // save to context

      localStorage.setItem('adminToken', token);

      navigate('/admin/dashboard');
      toast.success("Admin login successful");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white shadow-md rounded-2xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Admin Login</h2>

        <form onSubmit={handleSubmit(handleAdminLogin)} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your admin email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Admin Login
          </button>
        </form>

        <div className="text-center mt-4 text-sm text-gray-600">
          <span>Back to </span>
          <button onClick={() => navigate('/login')} className="text-blue-600 hover:underline font-semibold">
            User Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin