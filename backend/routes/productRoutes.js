import express from "express";
import Product from "../models/Product";
import { protectionMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// @route POST /api/products
// @desc Add a new Product to DB
// @access Private/Admin

router.post("/", protectionMiddleware, async (req, res) => {
    try {

    } catch (err) {

    }
});
