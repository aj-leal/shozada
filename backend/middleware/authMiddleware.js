import jwt from "jsonwebtoken";
import User from "../models/User";

//Middleware to protect routes

const protectionMiddleware = async (req, res, next) => {
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

export default protectionMiddleware;
