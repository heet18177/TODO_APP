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

const allowedOrigins = [
    "http://localhost:5173",
    "https://todo-app-client-f79v.onrender.com"
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

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