import express from "express";
import Subscriber from "../models/Subscriber.js";

const router = express.Router();

// @route POST /api/subscribe
// @desc handle newsletter subscription
// @access Public

router.post("/", async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required!" });
    }

    try {
        // Check if the email is already subscribed
        let subscriber = await Subscriber.findOne({ email });

        if (subscriber) {
            return res.status(400).json({ message: "Email is already subscribed." });
        }

        // Create a new subsciber if email isn't already subscribed
        subscriber = new Subscriber({ email });
        await subscriber.save();

        res.status(201).json({ message: "Successfully subscribed to the newsletter." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error. " });
    }
});

export default router;
