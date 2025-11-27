import express from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";

const router = express.Router();

// @route POST /api/users/reister
// @desc Register a new user
// @access Public

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        //registration logic here =======
        res.status(200).send({
            status: 200,
            message: "Success",
            data: {
                name, email, password,
            },
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
});

export default router;
