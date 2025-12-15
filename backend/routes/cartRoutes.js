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
        res.status(500).json({ message: "Server error." });
    }
});

export default router;
