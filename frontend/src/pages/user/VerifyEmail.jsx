import React from 'react'
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import {toast} from "react-hot-toast"

const VerifyEmail = () => {
  const navigate = useNavigate();
    const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axiosInstance.get(`/verifyEmail?token=${token}`,{withCredentials: true});
        toast.success(res.data.message);
        navigate("/")
      } catch (err) {
        toast.error(err.response?.data?.message || "Verification failed");
      }
    };

    if (token) verify();
  }, [token]);

  return (
    <div className="min-h-screen flex justify-center items-center text-xl font-bold">
      <p className="text-gray-600">
          We’ve sent a verification link to your email. Please click the link to complete your registration.
        </p>
    </div>
  )
}

export default VerifyEmail