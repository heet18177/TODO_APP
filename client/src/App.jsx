import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Task from "./pages/Task";
import Todo from "./pages/Todo";
import { useDispatch, useSelector } from "react-redux";
import { FetchCurrUser } from "./Thunk/FetchCurrUser";

const App = () => {
  const dispatch = useDispatch();
  const { userdata , loading} = useSelector((state) => state.user);
  console.log(userdata);

  useEffect(() => {
      dispatch(FetchCurrUser());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex flex-col gap-3 h-screen w-screen items-center justify-center">
        <div className="border-5 h-10 w-10 border-black animate-spin border-t-0 rounded-full"></div>
        <p className="text-xl">
          Loading <span className="animate-ping text-3xl">...</span>
        </p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={userdata ? <Task /> : <Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/task" element={userdata ? <Task /> : <Login />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
