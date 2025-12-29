import express from "express"
const userRoute = express.Router();
import { login, logout, signup } from "../controllers/userController.js";


userRoute.post("/signup" , signup);
userRoute.post("/login" ,  login);
userRoute.post("/logout" , logout);

export default userRoute;