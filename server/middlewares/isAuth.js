import jwt from "jsonwebtoken"

export const isAuth = async (req, res, next) => {
    try {
        const token = req?.cookies?.token || req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Please login first",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = { _id: decoded._id };

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }

        next();
    } catch (error) {
        console.error("Auth Error:", error.message);
        res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};


