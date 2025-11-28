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
        /*res.status(200).send({ // test if data is being passed correctly
            status: 200,
            message: "Success",
            data: {
                name, email, password,
            },
        });*/
        let user = await User.findOne({ email });

        if (user) return res.status(400).json({ message: "User already exists" });

        user = new User({ name, email, password });
        await user.save();

        /*res.status(201).json({// test if data is being saved to DB correctly
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });*/

        // Create JWT Payload
        const payload = { user: { id: user._id, role: user.role } };

        //Sign and return the token along with user data
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" }, (err, token) => {
            if (err) throw err;

            // Send the user and token in response
            res.status(201).json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
                token,
            });
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Server error");
    }
});

export default router;
