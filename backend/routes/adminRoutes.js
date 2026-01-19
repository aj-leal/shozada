import express from "express";
import User from "../models/User.js";
import { protectionMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route GET /api/admin/users
// @desc Get all users (Admin access only)
// @access Private/Admin

router.get("/users", protectionMiddleware, adminMiddleware, async (req, res) => {
    try {
        const users = await User.find({});// empty object parameter returns all the user entries
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error. " });
    }
});

export default router;
