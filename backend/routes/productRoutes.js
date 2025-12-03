import express from "express";
import Product from "../models/Product";
import { protectionMiddleware, admin } from "../middleware/authMiddleware";

const router = express.Router();

// @route POST /api/products
// @desc Add a new Product to DB
// @access Private/Admin

router.post("/", protectionMiddleware, admin, async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku,
        } = req.body;

        const product = new Product({
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku,
            user: req.user._id, // Reference to the admin user creating the product
        });

        const createdProduct = await product.save();

        res.status(201).json(createdProduct);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error.");
    }
});

export default router;
