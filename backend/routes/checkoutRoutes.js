import express from "express";
import Checkout from "../models/Checkout";
import Cart from "../models/Cart";
import Product from "../models/Product";
import Order from "../models/Order";
import { protectionMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// @route POST /api/checkout
// @desc Create a new checkout session
// @access Private

router.post("/", protectionMiddleware, async (req, res) => {
    const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (!checkoutItems || checkoutItems.length === 0) {
        return res.status(400).json({ message: "No items in checkout basket." });
    }

    try {
        // Create a new checkout session
        const newCheckout = await Checkout.create({
            user: req.user._id,
            checkoutItems: checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus: "pending",
            isPaid: false,
        });
        console.log(`Checkout created for user: ${req.user._id}`);
        res.status(201).json(newCheckout);
    } catch (err) {
        console.error("Error creating checkout session: ", err);
        res.status(500).json({ message: "Server error." });
    }
});


export default router;
