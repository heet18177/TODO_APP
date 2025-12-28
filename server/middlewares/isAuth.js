// import jwt from "jsonwebtoken"

// export const isAuth = async (req, res, next) => {
//     try {
//         const token = req.cookies.token;

//         if (!token) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Please login first",
//             });
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         req.user = decoded._id;

//         if (!req.user) {
//             return res.status(401).json({
//                 success: false,
//                 message: "User not found",
//             });
//         }

//         next();
//     } catch (error) {
//         console.error("Auth Error:", error.message);
//         res.status(401).json({
//             success: false,
//             message: "Invalid or expired token",
//         });
//     }
// };


import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
    try {
        // debug log to help diagnose missing cookie in cross-origin requests
        console.log('[isAuth] cookies:', req.cookies, 'cookie header:', req.headers?.cookie);

        // try cookie-parser value first, then fall back to raw cookie header
        let token = req.cookies?.token;
        if (!token && req.headers?.cookie) {
            const raw = req.headers.cookie.split(';').map(c => c.trim());
            const kv = raw.find(c => c.startsWith('token='));
            if (kv) token = kv.split('=')[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Please login first",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded._id;

        next();
    } catch (error) {
        console.error("Auth Error:", error.message);
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};
