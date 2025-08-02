import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axisInstance from '../../api/axiosInstance'
import {toast} from "react-hot-toast"
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext.jsx';


const Login = () => {
   const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    console.log('Form Data:', data);
    try {
      const response = await axisInstance.post('/login', data, { withCredentials: true });
      console.log('Login success:', response.data);
       login(response.data);

      localStorage.setItem('token', response.data.token);

      navigate('/');
      toast.success('Login successful!');
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
        <h2 className="text-2xl font-bold text-center text-gray-800">User Login</h2>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">

          {/* Email Field */}
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
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
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
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            Login
          </button>

         <Link to="/forgotPassword">
         <div className="flex justify-center cursor-pointer text-blue-600">
            Forgotten password?
          </div>
         </Link>
        </form>

        <div className="text-center mt-4 text-sm text-gray-600">
          <span>Don't have an account? </span>
          <Link to="/register" className="text-blue-600 hover:underline font-semibold">
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login