import express from "express";
import {
    add,
    getTasks,
    updateTasks,
    deleteTasks,
    getCurrentUser,
} from "../controllers/taskController.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.get("/getUser", isAuth, getCurrentUser);
router.post("/add", isAuth, add);
router.get("/get", isAuth, getTasks);
router.put("/update/:id", isAuth, updateTasks);
router.delete("/delete/:id", isAuth, deleteTasks);

export default router;
