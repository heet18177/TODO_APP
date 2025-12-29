import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - No token",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 🔥 VERY IMPORTANT
        req.user = decoded._id;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized - Invalid token",
        });
    }
};
