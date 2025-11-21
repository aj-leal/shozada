import { useState } from "react";
import { Link } from "react-router-dom";

const ProductManagement = () => {

    const initialProducts = [
        {
            _id: 111,
            name: "Jeans",
            price: 89,
            sku: "PHJ1-GKL",
        },
        {
            _id: 222,
            name: "Jacket",
            price: 100,
            sku: "PHJ2-ADS",
        },
        {
            _id: 333,
            name: "Shorts",
            price: 59,
            sku: "PHS3-LPK",
        },
    ];

    const [products, setProducts] = useState(initialProducts);

    const handleProductDelete = (productId) => {

        //Should delete data from Db
        const productToDelete = products.findIndex(product => product._id === productId);
        console.log(products[productToDelete]);
        if (window.confirm("Are you sure you want to delete the product ?")) {
            //Should send a request to DB to delete the user with the userId
            const updatedProducts = products.filter((product) => product._id !== productId);
            setProducts(updatedProducts);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-6 pt-2 pb-6">
            <h2 className="text-3xl font-bold mb-6">Product Management</h2>
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <table className="min-w-full text-center text-gray-500">
                    <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                        <tr>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Price</th>
                            <th className="px-4 py-3">SKU</th>
                            <th className="px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <tr key={product._id}
                                    className="border-b hover:bg-gray-50 cursor-pointer"
                                >
                                    <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                                        {product.name}
                                    </td>
                                    <td className="p-4">${product.price}</td>
                                    <td className="p-4">{product.sku}</td>
                                    <td className="p-4">
                                        <Link to={`/ctrl/products/${product._id}/edit`}
                                            className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded hover:bg-yellow-600 font-semibold"
                                        >
                                            Edit
                                        </Link>
                                        <button onClick={() => handleProductDelete(product._id)}
                                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 font-semibold"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4}
                                    className="p-4 text-center text-gray-500"
                                >
                                    No products found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProductManagement
