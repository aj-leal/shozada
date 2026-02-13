import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductDetails, updateProduct } from "../../redux/slices/productsSlice";
import axios from "axios";

const EditProductPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { selectedProduct, loading, error } = useSelector((state) => state.products);

    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: 0,
        countInStock: 0,
        sku: "",
        category: "",
        brand: "",
        sizes: [],
        colors: [],
        collections: "",
        material: "",
        gender: "",
        images: [],
    });
    const [uploading, setUploading] = useState(false);// Image uploading state

    useEffect(() => {
        if (id) {
            dispatch(fetchProductDetails(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (selectedProduct) {
            setProductData(selectedProduct);
        }
    }, [selectedProduct]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);

        try {
            setUploading(true);
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/upload`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${localStorage.getItem("userToken")}`,
                    }
                }
            );
            setProductData((prevData) => ({
                ...prevData,
                images: [...prevData.images, { url: data.imageUrl, altText: "" }],
            }));
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    };

    const handleDeleteImg = (imageIndex) => {
        //request here deletion of the image to the cdn
        console.log("Image to be deleted: ", productData.images[imageIndex], "Index:", imageIndex);
        if (window.confirm("Are you sure you want to delete the image?")) {
            setProductData(product => ({ ...product, images: product.images.filter((_, index) => index !== imageIndex) }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateProduct({ id, productData }));
        navigate("/ctrl/products");
    };

    if (loading) return <p>Loading ...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md px-6 pt-2 pb-6">
            <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
            <form onSubmit={handleSubmit}>

                <div className="mb-6">
                    <label className="block font-semibold mb-2">Product Name</label>
                    <input type="text"
                        name="name"
                        value={productData.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block font-semibold mb-2">Description</label>
                    <textarea name="description"
                        value={productData.description}
                        className="w-full border border-gray-300 rounded-md p-2"
                        rows={4}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block font-semibold mb-2">Price</label>
                    <input type="number"
                        name="price"
                        onChange={handleChange}
                        value={productData.price}
                        className="w-full border border-gray-300 rounded-md p-2"
                    />
                </div>

                <div className="mb-6">
                    <label className="block font-semibold mb-2">Count in Stock</label>
                    <input type="number"
                        name="countInStock"
                        onChange={handleChange}
                        value={productData.countInStock}
                        className="w-full border border-gray-300 rounded-md p-2"
                    />
                </div>

                <div className="mb-6">
                    <label className="block font-semibold mb-2">SKU</label>
                    <input type="text"
                        name="sku"
                        onChange={handleChange}
                        value={productData.sku}
                        className="w-full border border-gray-300 rounded-md p-2"
                    />
                </div>

                <div className="mb-6">
                    <label className="block font-semibold mb-2">Sizes (comma separated)</label>
                    <input type="text"
                        name="sizes"
                        onChange={(e) => setProductData({
                            ...productData, sizes: e.target.value.split(",").map((size) => size.trim()),
                        })}
                        value={productData.sizes.join(",")}
                        className="w-full border border-gray-300 rounded-md p-2"
                    />
                </div>

                <div className="mb-6">
                    <label className="block font-semibold mb-2">Colors (comma separated)</label>
                    <input type="text"
                        name="colors"
                        onChange={(e) => setProductData({
                            ...productData, colors: e.target.value.split(",").map((color) => color.trim()),
                        })}
                        value={productData.colors.join(",")}
                        className="w-full border border-gray-300 rounded-md p-2"
                    />
                </div>

                <div className="mb-6">
                    <label className="block font-semibold mb-3">Upload Image</label>
                    <input type="file"
                        onChange={handleImageUpload}
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-base file:bg-blue-500 hover:file:bg-blue-400 file:text-white file:cursor-pointer"
                    />
                    {uploading && <p>Uploading image ...</p>}
                    <p className="text-base font-medium my-4">(Click on an image below to delete it.)</p>
                    <div className="flex gap-4 mt-6">
                        {productData.images.map((image, index) => (
                            <div key={index}>
                                <img src={image.url}
                                    alt={image.altText || "Product Image"}
                                    className="w-20 h20 object-cover rounded-md shadow-md cursor-pointer"
                                    onClick={() => handleDeleteImg(index)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <button type="submit"
                    className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 mt-5 mb-3 transition-colors"
                >
                    Update Product
                </button>
            </form>
        </div>
    )
}

export default EditProductPage
