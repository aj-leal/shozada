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

// @route POST /api/admin/users
// @desc Add a new user (Admin only)
// @access Private/Admin

router.post("/users", protectionMiddleware, adminMiddleware, async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) { return res.status(400).json({ message: "User already exists." }); }

        user = new User({
            name,
            email,
            password,
            role: role || "customer",
        });

        await user.save();

        res.status(201).json({ message: "User created successfully.", user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error." });
    }
});

// @route PUT /api/admin/users/:id
// @desc Update user info (Admin access only) - Name, email, role
// @access Private/Admin

router.put("/users/:id", protectionMiddleware, adminMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.role = req.body.role || user.role;
        }

        const updatedUser = await user.save();
        res.json({ message: "User info updated successfully.", user: updatedUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error." });
    }
});

export default router;
