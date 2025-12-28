import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Task from "./pages/Task";
import Todo from "./pages/Todo";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUserdata } from "./redux/Userslice";
import { SERVER_URL } from "./main";

const App = () => {
  const dispatch = useDispatch();
  const { userdata } = useSelector((state) => state.user);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const fetchCurrUser = async () => {
      try {
        setloading(true);
        const res = await axios.get(`${SERVER_URL}/api/task/getUser`, {
          withCredentials: true,
        });
        dispatch(setUserdata(res.data));
        setloading(false);
      } catch (err) {
        console.log(err.message);
        setloading(false);
      }
    };

    if (!userdata) {
      fetchCurrUser();
    }
  }, [userdata]);

  if (loading) {
    return (
      <div className="flex flex-col gap-3 h-[100vh] w-[100vw] items-center justify-center">
        <div className="border-5 h-10 w-10 border-black animate-spin border-t-0 rounded-full"></div>
        <p className="text-xl">Loading <span className="animate-ping text-3xl">...</span></p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/task" element={userdata ? <Task /> : <Login />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
