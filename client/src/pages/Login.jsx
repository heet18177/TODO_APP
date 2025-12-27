import { setUserdata } from '@/redux/Userslice';
import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loader , setLoader] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        setLoader(true)
        const result = await axios.post(
          `${BASE_URL}/api/auth/login`,
          {
            email,
            password,
          },
          { withCredentials: true }
        );
        dispatch(setUserdata(result.data));
        toast.success("User login successfull...");
        navigate("/task")
        // console.log(result.data);
        setLoader(false)
      } catch (error) {
        console.log(error);
        toast.error("Uses authentication fails...");
      }
    };
if (loader) {
  return (
    <div className="flex flex-col gap-3 h-[100vh] w-[100vw] items-center justify-center">
      <div className="border-5 h-10 w-10 border-black animate-spin border-t-0 rounded-full"></div>
      <p className="text-xl">
        Loading <span className="animate-ping text-3xl">...</span>
      </p>
    </div>
  );
}

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#F8FAFC]">
      <div className="flex flex-col items-center gap-4 bg-white w-[340px] rounded-2xl px-6 py-7 shadow-md">
        <h1 className="text-2xl font-semibold text-gray-800">Welcome back</h1>

        <input
          onChange={(e)=>{setEmail(e.target.value)}}
          value={email}
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
          type="email"
          placeholder="Email address"
          required
        />

        <input
          onChange={(e)=>{setPassword(e.target.value)}}
          value={password}
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
          type="password"
          placeholder="Password"
          required
        />

        <button onClick={handleLogin} className={`w-full rounded-lg bg-indigo-600 py-2.5 text-base font-semibold text-white hover:bg-indigo-700 transition`}>
          Login
        </button>

        <p className="text-sm text-gray-500">
          Create new account?{" "}
          <Link
            to="/signup"
            className="text-indigo-600 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login