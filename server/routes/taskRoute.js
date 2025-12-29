import express from "express"
const taskRoute = express.Router();
import { add, deleteTasks, getCurrentUser, getTasks, updateTasks } from "../controllers/taskController.js";
import { isAuth } from "../middlewares/isAuth.js";


taskRoute.get("/getUser", isAuth, getCurrentUser);
taskRoute.post("/add", isAuth, add);
taskRoute.get("/get", isAuth, getTasks);
taskRoute.post("/update/:id", isAuth, updateTasks);
taskRoute.delete("/delete/:id", isAuth, deleteTasks)

export default taskRoute;