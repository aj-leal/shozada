import jwt from "jsonwebtoken";
import User from "../models/User";

//Middleware to protect routes

export const protectionMiddleware = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.user.id).select("-password");// exclude password
            next();
        } catch (err) {
            console.error("Token verification failed:", err);
            res.status(401).json({ message: "You are not authorized" });
        }
    } else {
        res.status(401).json({ message: "You are not authorized" });
    }
};

// Middleware to check if user is admin (for creatign a product)


export const adminMiddleware = (req, res, next) => {
    if (req.user && req.user.role === "admin") next();
    else res.status(403).json({ message: "Not authorized to create a product." });
};

export default protectionMiddleware;
