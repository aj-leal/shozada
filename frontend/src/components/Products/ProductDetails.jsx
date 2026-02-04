import { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails, fetchSimilarProducts } from "../../redux/slices/productsSlice";
import { addToCart } from "../../redux/slices/cartSlice";



const ProductDetails = ({ productId }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { selectedProduct, loading, error, similarProducts } = useSelector(
        (state) => state.products
    );
    const { user, guestId } = useSelector((state) => state.auth);
    const [mainImage, setMainImage] = useState(null);//passed null to remove console error of passing empty string
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const productFetchId = productId || id;

    useEffect(() => {
        if (productFetchId) {
            dispatch(fetchProductDetails(productFetchId));
            dispatch(fetchSimilarProducts({ id: productFetchId }));
        }
    }, [dispatch, productFetchId]);

    const handleQuantityUpdate = (sign) => {
        if (sign === "plus") setQuantity((prev) => prev + 1);
        else if (sign === "minus" && quantity > 1) setQuantity((prev) => prev - 1);
    }

    const handleAddToCart = () => {
        if (!selectedSize || !selectedColor) {
            toast.error("Please select the size and color before adding to cart.", { duration: 2000 });
            return;
        }

        setIsButtonDisabled(true);

        dispatch(
            addToCart({
                productId: productFetchId,
                quantity,
                size: selectedSize,
                color: selectedColor,
                guestId,
                userId: user?._id,
            })
        ).then(() => {
            toast.success("Product added to the cart!", { duration: 2000 });
        }).finally(() => {
            setIsButtonDisabled(false);
        })
    };

    useEffect(() => {
        if (selectedProduct?.images?.length > 0) {
            setMainImage(selectedProduct.images[0].url)
        }
    }, [selectedProduct]);

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error: {error}</p>
    }

    return (
        <div className="p-6">
            {selectedProduct &&
                <div className="max-w-6xl mx-auto bg-white p-8">
                    <div className="flex flex-col md:flex-row">
                        {/* Left Thumbnails */}
                        <div className="hidden md:flex flex-col space-y-4 mr-6">
                            {selectedProduct.images.map((image, index) => (
                                <img key={index}
                                    src={image.url}
                                    alt={image.altText || `Thumbnail ${index}`}
                                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer ${mainImage === image.url ? "scale-110 border-3 border-red-400" : "scale-100 border border-gray-300"}`}
                                    onClick={() => setMainImage(image.url)}
                                />
                            ))}
                        </div>

                        {/* Main Image */}
                        <div className="md:w-1/2 ">
                            <div className="mb-4">
                                <img
                                    src={mainImage}
                                    alt={selectedProduct.images[0].altText}
                                    className="w-full h-auto object-cover rounded-lg"
                                />
                            </div>
                        </div>

                        {/* Mobile Thumbnail */}
                        <div className="md:hidden flex overflow-x-hidden space-x-4 mb-4 py-2 px-1">
                            {selectedProduct.images.map((image, index) => (
                                <img key={index}
                                    src={image.url}
                                    alt={image.altText || `Thumbnail ${index}`}
                                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer ${mainImage === image.url ? "scale-110 border-3 border-red-400" : "scale-100 border border-gray-300"}`}
                                    onClick={() => setMainImage(image.url)}
                                />
                            ))}
                        </div>

                        {/* Right Side/Product Details */}
                        <div className="md:w-1/2 md:ml-10">
                            <h1 className="text-2xl md:text-3xl font-semibold mb-2">
                                {selectedProduct.name}
                            </h1>

                            <p className="text-lg text-gray-600 mb-1 line-through">
                                {selectedProduct.originalPrice && `${selectedProduct.originalPrice}`}
                            </p>

                            <p className="text-xl text-black mb-2">
                                $ {selectedProduct.price}
                            </p>

                            <p className="text-gray-600 mb-4">
                                {selectedProduct.description}
                            </p>

                            {/* Color selector */}
                            <div className="mb-4">
                                <p className="text-black">Color:</p>
                                <div className="flex gap-2 mt-2">
                                    {selectedProduct.colors.map((color) => (
                                        <button key={color}
                                            onClick={() => setSelectedColor(color)}
                                            className={`w-8 h-8 rounded-full border ${selectedColor === color ? "border-2 border-black scale-125" : "border-gray-300 scale-100"}`}
                                            style={{ backgroundColor: color.toLocaleLowerCase(), filter: "brightness(0.9)", }}
                                        >
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Size selector */}
                            <div className="mb-4">
                                <p className="text-black">Size:</p>
                                <div className="flex gap-2 mt-2">
                                    {selectedProduct.sizes.map((size) => (
                                        <button key={size}
                                            className={`px-4 py-2 rounded border border-gray-400 ${selectedSize === size ? "bg-black text-white" : ""}`}
                                            onClick={() => setSelectedSize(size)}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-6">
                                <p className="text-black">Quantity:</p>
                                <div className="flex items-center space-x-4 mt-2">
                                    <button className="px-2 py-1 bg-gray-200 rounded text-lg"
                                        onClick={() => handleQuantityUpdate("minus")}
                                    >
                                        -
                                    </button>
                                    <span className="text-lg ">{quantity}</span>
                                    <button className="px-2 py-1 bg-gray-200 rounded text-lg"
                                        onClick={() => handleQuantityUpdate("plus")}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <button className={`bg-black text-white py-2 px-6 rounded w-full mb-4 ${isButtonDisabled ? "cursor-not-allowed bg-gray-600/50" : "hover:bg-gray-900"}`}
                                disabled={isButtonDisabled}
                                onClick={handleAddToCart}
                            >
                                {isButtonDisabled ? "Adding......." : "ADD TO CART"}
                            </button>

                            <div className="mt-10 text-black">
                                <h3 className="text-xl font-bold mb-4">Characteristics:</h3>
                                <table className="w-full text-left text-sm text-gray-900">
                                    <tbody>
                                        <tr>
                                            <td className="py-1 font-semibold">BRAND</td>
                                            <td className="py-1"><i>{selectedProduct.brand}</i></td>
                                        </tr>
                                        <tr>
                                            <td className="py-1 font-semibold">MATERIAL</td>
                                            <td className="py-1"><i>{selectedProduct.material}</i></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="mt-20">
                        <h2 className="text-2xl text-center font-medium mb-4">
                            You May Also Like
                        </h2>
                        <ProductGrid products={similarProducts} loading={loading} error={error} />
                    </div>
                </div>
            }
        </div >
    );
};

export default ProductDetails;
