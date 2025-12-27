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

// @route PUT /api/checkout/:id/pay
// @desc Update checkout to mark as paid after successful payment
// @access Private

router.put("/:id/pay", protectionMiddleware, async (req, res) => {
    const { paymentStatus, paymentDetails } = req.body;

    try {
        const checkout = await Checkout.findById(req.params.id);

        if (!checkout) { return res.status(404).json({ message: "Checkout basket not found." }); }

        if (paymentStatus === "paid") {
            checkout.isPaid = true;
            checkout.paymentStatus = paymentStatus;
            checkout.paymentDetails = paymentDetails; a
            checkout.paidAt = Date.now();
            await checkout.save();

            return res.status(200).json(checkout);
        } else {
            return res.status(400).json({ message: "Payment unsuccessful." });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error." });
    }
});

export default router;
