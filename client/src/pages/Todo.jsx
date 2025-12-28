import { SERVER_URL } from "@/main";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Todo = () => {
  const navigate = useNavigate();

  const [todo, setTodo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    priority: "",
    status: "",
  });

  // Get tasks
  const getTask = async () => {
    try {
      const result = await axios.get(`${SERVER_URL}/api/task/get`, {
        withCredentials: true,
      });
      setTodo(result.data.tasks);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTask();
  }, [todo]);

  // Delete task
  const deleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;

    try {
      await axios.delete(`${SERVER_URL}/api/task/delete/${id}`, {
        withCredentials: true,
      });

      setTodo((prev) => prev.filter((task) => task._id !== id));
      toast.success("Task deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Task delete failed");
    }
  };

  // Update task
  const updateTask = async (id) => {
    try {
      await axios.post(`${SERVER_URL}/api/task/update/${id}`, editData, {
        withCredentials: true,
      });

      setTodo((prev) =>
        prev.map((task) => (task._id === id ? { ...task, editData } : task))
      );

      setEditId(null);
      toast.success("Task updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Task update failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="flex items-center justify-between px-6 md:px-10 py-4 shadow bg-white">
        <h1 className="font-bold text-2xl md:text-3xl text-indigo-600">
          MyTodo
        </h1>

        <button
          onClick={() => navigate("/task")}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition"
        >
          + Add Task
        </button>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {loading ? (
          <p className="text-center text-gray-500 text-lg">Loading tasks...</p>
        ) : todo.length === 0 ? (
          <div className="text-center text-gray-500">
            <p className="text-xl font-semibold">No tasks yet</p>
            <p className="mt-2">Start by adding your first task 🚀</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2">
            {todo.map((task, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
              >
                {/* Editable Section */}
                {editId === task._id ? (
                  <>
                    {/* Title */}
                    <input
                      className="w-full border rounded p-2 mb-2"
                      value={editData.title}
                      onChange={(e) =>
                        setEditData({ ...editData, title: e.target.value })
                      }
                    />

                    {/* Description */}
                    <input
                      className="w-full border rounded p-2 mb-2"
                      value={editData.description}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          description: e.target.value,
                        })
                      }
                    />

                    {/* Priority */}
                    <select
                      className="w-full border rounded p-2 mb-2"
                      value={editData.priority}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          priority: e.target.value,
                        })
                      }
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>

                    {/* Status */}
                    <select
                      className="w-full border rounded p-2"
                      value={editData.status}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          status: e.target.value,
                        })
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </>
                ) : (
                  <>
                    <h2 className="text-lg font-bold text-gray-800">
                      {task.title}
                    </h2>
                    <p className="text-gray-600 mt-1 text-sm">
                      {task.description}
                    </p>

                    <div className="flex justify-between mt-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-600">
                        {task.priority.toUpperCase()}
                      </span>

                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
                        {task.status.replace("-", " ").toUpperCase()}
                      </span>
                    </div>
                  </>
                )}

                {/* Actions */}
                <div className="flex justify-between mt-4">
                  {editId === task._id ? (
                    <button
                      onClick={() => updateTask(task._id)}
                      className="rounded-lg bg-green-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-green-700 transition cursor-pointer"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setEditId(task._id);
                        setEditData({
                          title: task.title,
                          description: task.description,
                          priority: task.priority,
                          status: task.status,
                        });
                      }}
                      className="rounded-lg bg-indigo-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-indigo-700 transition cursor-pointer"
                    >
                      Update
                    </button>
                  )}

                  <button
                    onClick={() => deleteTask(task._id)}
                    className="rounded-lg bg-red-500 px-4 py-1.5 text-sm font-semibold text-white hover:bg-red-600 transition cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Todo;

