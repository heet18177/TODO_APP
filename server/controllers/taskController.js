import { Task } from "../models/Task.js";
import { User } from "../models/User.js";

export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.user;
        const user = await User.findById(userId);


        if (!user) {
            return res.status(400).json({
                success: false,
                error: "User not found"
            })
        }

        return res.status(200).json({
            success: true,
            user
        })
    }

    catch (err) {
        res.status(500).json({
            success: false,
            message: "Iternal server error...",
        });
    }
}

export const add = async (req, res) => {
    try {
        const { title, description, priority, status } = req.body;

        // validation
        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Task title is required...",
            });
        }

        //Add task in db
        const addTask = await Task.create({
            userId: req.user,
            title,
            description,
            priority,
            status
        });

        res.status(201).json({
            success: true,
            message: "Task added successfully...",
            addTask,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Iternal server error...",
        });
    }
}

//get tasks
export const getTasks = async (req, res) => {
    try {
        // req.user comes from isAuth middleware
        const userId = req.user;

        const tasks = await Task.find({ userId }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: tasks.length,
            tasks,
        });
    } catch (error) {
        console.error("Get Tasks Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

//update tasks
export const updateTasks = async (req, res) => {
    try {
        const { title, description, priority, status } = req.body;

        const userId = req.user;
        const { id } = req.params;

        const update = {}

        if (title) update.title = title;
        if (description) update.description = description;
        if (priority) update.priority = priority;
        if (status) update.status = status;

        const newData = await Task.findOneAndUpdate({ _id: id, userId }, update, { new: true });

        if (!newData) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        res.status(200).json({
            message: 'Task updated successfully...',
            success: true,
            newData
        });
    }
    catch (error) {
        console.error("Update Task Error:", error);
        res.status(500).json({
            success: false,
            message: 'internal server error...',
            error: error.message
        });
    }

}

//delete tasks
export const deleteTasks = async (req, res) => {
    try {
        const userId = req.user
        const { id } = req.params;

        const deleteT = await Task.findOneAndDelete({
            _id: id,
            userId
        });

        if (!deleteT) {
            return res.status(404).json({
                success: false,
                message: 'User task is not found...',
            });
        }

        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
            task: deleteT,
        });
    }
    catch (error) {
        console.error("Delete Task Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
}
