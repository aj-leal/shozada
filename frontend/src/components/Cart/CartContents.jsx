import { RiDeleteBin3Line } from "react-icons/ri"
import { useDispatch } from "react-redux"
import { removeFromCart, syncCart, updateCartItemQuantity } from "../../redux/slices/cartSlice";
import { useEffect } from "react";

const CartContents = ({ cart, userId, guestId }) => {
    const dispatch = useDispatch();

    // Handle adding or removing from cart
    const handleAddToCart = (productId, delta, quantity, size, color) => {
        const newQuantity = quantity + delta;
        console.log("newQuantity is", newQuantity);
        if (newQuantity >= 1) {
            dispatch(updateCartItemQuantity({
                productId,
                quantity: newQuantity,
                guestId,
                userId,
                size,
                color,
            }));
        } else {
            dispatch(removeFromCart({
                productId,
                guestId,
                userId,
                size,
                color,
            }))
        }
    };

    const handleRemoveFromCart = (productId, size, color) => {
        dispatch(removeFromCart({
            productId,
            guestId,
            userId,
            size,
            color,
        }));
    };

    useEffect(() => {
        dispatch(syncCart({ userId, guestId }));
    }, [dispatch, userId, guestId]);

    return (
        <div>
            {
                cart.products.map((product, index) => (
                    <div
                        key={index}
                        className="flex items-start justify-between py-4 border-b"
                    >
                        <div className="flex items-center">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-20 h-24 object-cover mr-4 rounded"
                            />
                            <div>
                                <h3>{product.name}</h3>
                                <p className="text-sm text-gray-500">
                                    size: {product.size} | color: {product.color}
                                </p>
                                <div className="flex items-center mt-2">
                                    <button className="border rounded px-2 py-1 text-xl font-medium disabled:text-gray-300"
                                        onClick={() =>
                                            handleAddToCart(
                                                product.productId,
                                                -1,
                                                product.quantity,
                                                product.size,
                                                product.color,
                                            )
                                        }
                                        disabled={product.quantity === 1}

                                    >-
                                    </button>
                                    <span className="mx-4">{product.quantity}</span>
                                    <button className="border rounded px-2 py-1 text-xl font-medium"
                                        onClick={() =>
                                            handleAddToCart(
                                                product.productId,
                                                1,
                                                product.quantity,
                                                product.size,
                                                product.color,
                                            )
                                        }
                                    >+
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p>$ {product.price.toLocaleString()}</p>
                            <button onClick={() => handleRemoveFromCart(
                                product.productId,
                                product.size,
                                product.color,
                            )}>
                                <RiDeleteBin3Line className="h-6 w-6 mt-2 text-red-600" />
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default CartContents
