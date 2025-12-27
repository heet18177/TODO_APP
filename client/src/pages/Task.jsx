import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Task = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");

  const addTask = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://localhost:8000/api/task/add",
        {
          title,
          description,
          priority,
          status,
        },
        { withCredentials: true }
      );
      console.log(result.data);
      toast.success("Task added succesfull");
    } catch (error) {
      console.log(error);
      toast.error("Invalid Task");
    }
  };
  const handlLogout = async () => {
    try {
      const result = await axios.post(
        "http://localhost:8000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      console.log(result.data);
      toast.success("Logout successfull");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    }
  };
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="flex items-center justify-between px-6 md:px-10 py-4 shadow bg-white">
        <h1 className="font-bold text-2xl md:text-3xl text-indigo-600">
          MyTodo
        </h1>

        <div className="flex gap-3">
          <button onClick={()=>{navigate("/todo")}} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm md:text-base font-semibold text-white hover:bg-indigo-700 transition">
            Todos
          </button>
          <button
            onClick={handlLogout}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm md:text-base font-semibold text-white hover:bg-red-600 transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="flex justify-center px-4">
        <form
          onSubmit={addTask}
          className="w-full max-w-2xl mt-8 bg-white rounded-2xl shadow-md p-6 md:p-8 space-y-6"
        >
          <h2 className="text-center text-xl md:text-2xl font-semibold text-indigo-600">
            “Less chaos. More done.”
          </h2>

          {/* Title */}
          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold text-slate-700">
              Title
            </label>
            <input
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
              className="rounded-lg border border-gray-300 px-3 py-2.5 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
              type="text"
              placeholder="Enter task title"
              required
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold text-slate-700">
              Description
            </label>
            <input
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              value={description}
              className="rounded-lg border border-gray-300 px-3 py-2.5 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
              type="text"
              placeholder="Enter task description"
              required
            />
          </div>

          {/* Priority & Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold text-slate-700">
                Priority
              </label>
              <select
                onChange={(e) => setPriority(e.target.value)}
                className="rounded-lg border border-gray-300 px-3 py-2.5 focus:outline-none focus:border-indigo-500"
              >
                <option value="">Select Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-lg font-semibold text-slate-700">
                Status
              </label>
              <select
                onChange={(e) => setStatus(e.target.value)}
                className="rounded-lg border border-gray-300 px-3 py-2.5 focus:outline-none focus:border-indigo-500"
              >
                <option value="">Select Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-indigo-600 py-3 text-lg font-semibold text-white hover:bg-indigo-700 transition cursor-pointer"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default Task;
