import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required...",
            });
        }

        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists...",
            });
        }

        const hashpass = await bcrypt.hash(password, 10);

        const createUser = await User.create({
            name,
            email,
            password: hashpass,
        });

        const token = jwt.sign(
            { _id: createUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(201).json({
            success: true,
            message: "Signup successful...",
            user: {
                _id: createUser._id,
                name: createUser.name,
                email: createUser.email,
            },
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};


//Login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //if user is not exist
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                message: 'User not exist , sign-up first...',
                success: false,
            });
        }

        //match password of user vs database
        const matchPass = await bcrypt.compare(password, user.password);
        if (!matchPass) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials(password)",
            });
        }

        //generate JWT  token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        //set cookie for store token
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        res.status(201).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
        });

    }
    catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({
            success: false,
            message: "Server error...",
            error: error.message,
        });
    }
}


//Logout
export const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
    });

    res.json({
        success: true,
        message: "Logout successful",
    });
};
