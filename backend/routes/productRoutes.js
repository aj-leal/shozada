import express from "express";
import Product from "../models/Product";
import { protectionMiddleware, adminMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// @route POST /api/products
// @desc Add a new Product to DB
// @access Private/Admin

router.post("/", protectionMiddleware, adminMiddleware, async (req, res) => {
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


// @route PUT /api/products/:id
// @desc Update an existing product ID
// @access Private/Admin

router.put("/:id", protectionMiddleware, adminMiddleware, async (req, res) => {
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

        // Find product by ID
        const product = await Product.findById(req.params.id);

        if (product) {
            // Update product fields
            // product.name is from DB, name is from the request body/ user input
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.discountPrice = discountPrice || product.discountPrice;
            product.countInStock = countInStock || product.countInStock;
            product.category = category || product.category;
            product.brand = brand || product.brand;
            product.sizes = sizes || product.sizes;
            product.colors = colors || product.colors;
            product.collections = collections || product.collections;
            product.material = material || product.material;
            product.gender = gender || product.gender;
            product.images = images || product.images;
            product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
            product.isPublished = isPublished !== undefined ? isPublished : product.isPublished;
            product.tags = tags || product.tags;
            product.dimensions = dimensions || product.dimensions;
            product.weight = weight || product.weight;
            product.sku = sku || product.sku;

            // Save the updated product to DB
            const updatedProduct = await product.save();

            res.json(updatedProduct);
        } else {
            res.status(404).json({ message: "Product not found." });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error.")
    }
});

// @route DELETE /api/products/:id
// @desc Delete a product from DB using its ID
// @access Private/Admin

router.delete("/:id", protectionMiddleware, adminMiddleware, async (req, res) => {
    try {
        // Find the products in DB using id
        const product = await Product.findById(req.params.id);

        if (product) {// If product exist in DB
            //Remove product from DB
            await product.deleteOne();
            res.json({ message: "Product removed" });
        } else {
            res.status(404).json({ message: "Product not found." });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

export default router;
