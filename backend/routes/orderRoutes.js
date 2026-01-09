import express from "express";
import Order from "../models/Order";
import { protectionMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// @route GET /api/orders/my-orders
// @desc Get logged-in user's orders
// @access Private

router.get("/my-orders", protectionMiddleware, async (req, res) => {
    try {
        // Fetch logged-in user's orders
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });// display the most recent order first
        res.json(orders);
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).json({ message: "Server error." });
    }
});

// @route GET /api/orders/:id
// @desc Get order details by ID
// @access Private

router.get("/:id", protectionMiddleware, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("user", "email");

        if (!order) {
            return res.status(404).json({ message: "Order not found." });
        }

        // Return the full order details
        res.json(order);
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).json({ message: "Server Error." });
    }
});

export default router;
