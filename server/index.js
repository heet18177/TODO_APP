import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";


dotenv.config();
const app = express();
app.set("trust proxy", 1);
app.use(express.json());
app.use(cookieParser());

app.use(cors({origin : process.env.CLIENT_URL , credentials : true}));
    

const Port = process.env.PORT || 8000

//import routes
import userRoute from "./routes/userRoute.js";
import taskRoute from "./routes/taskRoute.js";
app.use("/api/auth", userRoute);
app.use("/api/task", taskRoute);

app.listen(Port, () => {
    console.log(`Server is running on ${Port}`);
    connectDb();
})