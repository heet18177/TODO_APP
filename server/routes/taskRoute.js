import express from "express"
const router = express.Router();
import { add, deleteTasks, getCurrentUser, getTasks, updateTasks } from "../controllers/taskController.js";
import { isAuth } from "../middlewares/isAuth.js";

router.get("/getUser", isAuth, getCurrentUser);
router.post("/add", isAuth, add);
router.get("/get", isAuth, getTasks);
router.put("/update/:id", isAuth, updateTasks);
router.delete("/delete/:id", isAuth, deleteTasks);

export default router;