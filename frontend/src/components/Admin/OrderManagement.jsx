import { useState } from "react";

const OrderManagement = () => {

    //fetch orders data from DB here

    const initialOrders = [
        {
            _id: 1111,
            user: {
                name: "Osama Jalandoni",
            },
            totalPrice: 110,
            status: "processing",

        },
        {
            _id: 2222,
            user: {
                name: "Yuko Aranara",
            },
            totalPrice: 77,
            status: "shipped",

        },
        {
            _id: 3333,
            user: {
                name: "Bamboo Norman",
            },
            totalPrice: 89,
            status: "delivered",

        },
    ];

    const [orders, setOrders] = useState(initialOrders);

    const handleStatusChange = (orderId, newStatus) => {
        console.log("id: ", orderId, "newStatus: ", newStatus);
        const updatedOrders = orders.map((order) => {
            return order._id === orderId ? { ...order, status: newStatus } : order;
        });
        setOrders(updatedOrders);
    };

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
                                    <td className="p-4">${order.totalPrice}</td>
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
