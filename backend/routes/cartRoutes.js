import express from "express";
import Cart from "../models/Cart";
import Product from "../models/Product";
import { protectionMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// Helper function to get a cart by userId or guestId
const getCart = async (userId, guestId) => {
    if (userId) {
        return await Cart.findOne({ user: userId });
    } else if (guestId) {
        return await Cart.findOne({ guestId });
    }
    return null;
};

// @route POST /api/cart
// @desc Add a product to the cart for a guest or a logged in user
// @access Public

router.post("/", async (req, res) => {
    const { productId, quantity, size, color, guestId, userId } = req.body;
    try {
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found." });

        // Determine if the user is logged in or guest
        let cart = await getCart(userId, guestId);

        // If cart exists, update it
        if (cart) {
            const productIndex = cart.products.findIndex((p) =>
                p.productId.toString() === productId &&
                p.size === size &&
                p.color === color
            );
            if (productIndex > -1) {
                // If the product exists in the cart, update the quantity
                cart.products[productIndex].quantity += quantity;
            } else {
                // Product does not exist in the cart the just add it
                cart.products.push({
                    productId,
                    name: product.name,
                    image: product.images[0].url,
                    price: product.price,
                    size,
                    color,
                    quantity
                });
            }
            // Recalculate the total price
            cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);

            await cart.save();
            return res.status(200).json(cart);
        } else {// Cart is empty, create a new cart
            const newCart = await Cart.create({
                user: userId ? userId : undefined,
                guestId: userId ? undefined : (guestId ? guestId : "guest_" + new Date().getTime()),
                products: [
                    {
                        productId,
                        name: product.name,
                        image: product.images[0].url,
                        price: product.price,
                        size,
                        color,
                        quantity,
                    },
                ],
                totalPrice: product.price * quantity,
            });
            return res.status(201).json(newCart);
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error." });
    }
});

// @route PUT /api/cart
// @desc Update product quantity in the cart for a guest or logged in user
// @access Public

router.put("/", async (req, res) => {
    const { productId, quantity, size, color, guestId, userId } = req.body;

    try {
        let cart = await getCart(userId, guestId);
        if (!cart) return res.status(404).json({ message: "Cart not found." });

        const productIndex = cart.products.findIndex((p) =>
            p.productId.toString() === productId &&
            p.size === size &&
            p.color === color
        );

        if (productIndex > -1) {
            // Update quantity in the cart
            if (quantity > 0) {
                cart.products[productIndex].quantity = quantity;
            } else {
                cart.products.splice(productIndex, 1);// Removes the product from cart if quantity is zero
            }

            cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
            await cart.save();
            return res.status(200).json(cart);
        } else {
            return res.status(404).json({ message: "Product not found in cart." });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error." });
    }
});

// @route DELETE /api/cart
// @desc Delete a product from the cart
// @access Public

router.delete("/", async (req, res) => {
    const { productId, size, color, guestId, userId } = req.body;
    try {
        let cart = await getCart(userId, guestId);

        if (!cart) return res.status(404).json({ message: "Cart not found." });
        const productIndex = cart.products.findIndex((p) =>
            p.productId.toString() === productId &&
            p.size === size &&
            p.color === color
        );

        if (productIndex > -1) {
            cart.products.splice(productIndex, 1);
            cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
            await cart.save();
            return res.status(200).json(cart);
        } else {
            return res.status(404).json({ message: "Product not found in the cart." });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error." });
    }
});

// @route GET /api/cart
// @desc Get logged-in/guest user's cart
// @access Public

router.get("/", async (req, res) => {
    const { userId, guestId } = req.query;
    try {
        const cart = await getCart(userId, guestId);
        if (cart) {
            res.json(cart);
        } else {
            res.status(404).json({ message: "Cart not found." });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error." });
    }
});

export default router;
