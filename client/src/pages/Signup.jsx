import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { setUserdata } from "@/redux/Userslice";
import { useDispatch } from "react-redux";
import { SERVER_URL } from "@/main";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      setLoading(true);
      const result = await axios.post(
        `${SERVER_URL}/api/auth/signup`,
        {
          name,
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(setLoading(false));
      dispatch(setUserdata(result.data));
      toast.success("User sign up successfull...");
      navigate("/task");
      setLoading(false);
      // console.log(result.data);
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error);
      toast.error("Uses authentication fails...");
    }
  };

  if (loading) {
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
        <h1 className="text-2xl font-semibold text-gray-800">Create Account</h1>

        <input
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
          type="text"
          placeholder="Full name"
          required
        />

        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
          type="email"
          placeholder="Email address"
          required
        />

        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
          type="password"
          placeholder="Password"
          required
        />

        <button
          onClick={handleSignup}
          className="w-full rounded-lg bg-indigo-600 py-2.5 text-base font-semibold text-white hover:bg-indigo-700 transition"
        >
          Sign Up
        </button>

        <p className="text-sm text-gray-500">
          Already have an account?{" "}
          <Link className="text-indigo-600 font-medium hover:underline" to="/">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
