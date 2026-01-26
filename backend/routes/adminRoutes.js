import express from "express";
import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
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
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        let hasChanged = false;// flag for checking if info is edited

        ["name", "email", "role"].forEach(key => {
            if (req.body[key] !== undefined && req.body[key] !== user[key]) {
                user[key] = req.body[key];
                hasChanged = true;
            }
        });

        if (!hasChanged) {
            return res.json({ user });
        }

        const updatedUser = await user.save();
        res.json({ message: "User info updated successfully.", user: updatedUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error." });
    }
});

// @route DELETE /api/admin/users/:id
// @desc Delete a user (Admin Only)
// @access Private/Admin

router.delete("/users/:id", protectionMiddleware, adminMiddleware, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (user) {
            res.status(200).json({ message: "User removed from record." });
        } else {
            res.status(404).jsonp({ message: "User does not exist. " });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error." });
    }
});


//=================== ADMIN PRODUCT ROUTES =========================

// @route DELETE /api/admin/products
// @desc Get all products (Admin access only)
// @access Private/Admin

router.get("/products", protectionMiddleware, adminMiddleware, async (req, res) => {
    try {
        const products = await Product.find({});

        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error. " });
    }
});



//=================== ADMIN ORDER ROUTES =========================


// @route GET /api/admin/orders
// @desc Get all orders (Admin access only)
// @access Private/Admin

router.get("/orders", protectionMiddleware, adminMiddleware, async (req, res) => {
    try {
        const orders = await Order.find({}).populate("user", "name email");

        res.json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error. " });
    }
});

// @route PUT /api/admin/orders/:id
// @desc Update order status (Admin access only)
// @access Private/Admin

router.put("/orders/:id", protectionMiddleware, adminMiddleware, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {//if order exist
            order.status = req.body.status || order.status;
            order.isDelivered = (req.body.status === "Delivered") || order.isDelivered;
            order.deliveredAt = req.body.status === "Delivered" ? Date.now() : order.deliveredAt;

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: "Order not found." });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error. " });
    }
});

// @route DELETE /api/admin/orders/:id
// @desc Delete an order(Admin access only)
// @access Private/Admin

router.delete("/orders/:id", protectionMiddleware, adminMiddleware, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order) {
            await order.deleteOne();
            res.json({ message: "Order successfully deleted." });
        }
        res.status(404).json({ message: "Order not found." });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error. " });
    }
});

export default router;
