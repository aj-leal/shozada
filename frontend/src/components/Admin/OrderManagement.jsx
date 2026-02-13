import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllOrders, updateOrderStatus } from "../../redux/slices/adminOrderSlice";

const OrderManagement = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const { orders, loading, error } = useSelector((state) => state.adminOrders);

    useEffect(() => {
        if (!user || user.role !== "admin") {
            navigate("/");
        } else {
            dispatch(fetchAllOrders());
        }
    }, [dispatch, user, navigate]);


    const handleStatusChange = (orderId, status) => {
        dispatch(updateOrderStatus({ id: orderId, status }));
    };

    if (loading) return <p>Loading ...</p>
    if (error) return <p>Error: {error}</p>

    return (
        <div className="max-w-7xl mx-auto px-6 pt-2 pb-6">
            <h2 className="text-3xl font-bold mb-6">Order Management</h2>

            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <table className="min-w-full text-center text-gray-500">
                    <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                        <tr>
                            <th className="px-4 py-3 ">Order ID</th>
                            <th className="px-4 py-3 ">Customer</th>
                            <th className="px-4 py-3 ">Total Price</th>
                            <th className="px-4 py-3 ">Status</th>
                            <th className="px-4 py-3 ">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <tr key={order._id} className="border-b hover:bg-gray-50 cursor-pointer">
                                    <td className="p-4 font-medium text-gray-900 whitespace-nowrap">
                                        #{order._id}
                                    </td>
                                    <td className="p-4">{order.user.name}</td>
                                    <td className="p-4">${order.totalPrice.toFixed(2)}</td>
                                    <td className="p-4">
                                        <select name="status"
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                            className="p-2 border-2 rounded-md border-blue-500 text-gray-800 focus:ring-blue-400 focus:border-blue-400 block"
                                        >
                                            <option value="processing">Processing</option>
                                            <option value="shipped">Shipped</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                    <td className="p-4">
                                        <button onClick={() => handleStatusChange(order._id, "delivered")}
                                            className="bg-green-500 text-white p-2 border rounded-lg cursor-pointer disabled:bg-gray-200 disabled:text-gray-800"
                                            disabled={order.status === "delivered"}
                                        >
                                            {order.status === "delivered" ? "Delivered" : "Mark as Delivered"}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="p-4 text-gray-500 text-center">No orders found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default OrderManagement
