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
            checkout.paymentDetails = paymentDetails;
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

// @route POST /api/checkout/:id/finalize
// @desc Finalize checkout and convert to an order after payment confirmation
// @access Private

router.post("/:id/finalize", protectionMiddleware, async (req, res) => {
    try {
        const checkout = await Checkout.findById(req.params.id);

        if (!checkout) {
            return res.status(404).json({ message: "Checkout basket not found." });
        }

        if (checkout.isPaid && !checkout.isFinalized) {
            //Create the order based on the checkout details
            const finalOrder = await Order.create({
                user: checkout.user,
                orderItems: checkout.orderItems,
                shippingAddress: checkout.shippingAddress,
                paymentMethod: checkout.paymentMethod,
                totalPrice: checkout.totalPrice,
                isPaid: true,
                paidAt: checkout.paidAt,
                isDelivered: false,
                paymentStatus: "paid",
                paymentDetails: checkout.paymentDetails,
            });

            // Mark the checkout as finalized
            checkout.isFinalized = true;
            checkout.finalizedAt = Date.now();
            await checkout.save();

            // Delete the cart associated with the user
            await Cart.findOneAndDelete({ user: checkout.user });
            return res.status(201).json(finalOrder);
        } else if (checkout.isFinalized) {
            return res.status(400).json({ message: "Checkout basket already finalized." });
        } else {
            return res.status(400).json({ message: "Checkout basket is not yet paid." });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error." });
    }
});

export default router;
