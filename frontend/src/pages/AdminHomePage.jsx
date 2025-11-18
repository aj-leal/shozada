import { Link } from "react-router-dom"

const AdminHomePage = () => {
    {/* Dummy Orders data */ }

    const orders = [
        {
            _id: 1111,
            user: {
                name: "John Smith",
            },
            totalPrice: 180,
            status: "Processing",
        },
        {
            _id: 2222,
            user: {
                name: "Jane Thang",
            },
            totalPrice: 112,
            status: "Paid",
        },
        {
            _id: 3333,
            user: {
                name: "Ping Sotto",
            },
            totalPrice: 450,
            status: "In-transit",
        },
        {
            _id: 4444,
            user: {
                name: "Deft",
            },
            totalPrice: 99,
            status: "Delivered",
        },
        {
            _id: 5555,
            user: {
                name: "King Engine",
            },
            totalPrice: 1000,
            status: "Processing",
        },
    ]

    return (
        <div className="max-w-7xl mx-auto pt-2 pl-6 pb-6 pr-6">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 shadow-md rounded-lg">
                    <h2 className="text-xl font-semibold">Revenue</h2>
                    <p className="text-2xl">{/* Should be from DB */}$1000</p>
                </div>
                <div className="p-4 shadow-md rounded-lg">
                    <h2 className="text-xl font-semibold">Total Orders</h2>
                    <p className="text-2xl">{/* Should be from DB */}144</p>
                    <Link to="/ctrl/orders" className="text-blue-500 hover:underline">Manage Orders</Link>
                </div>
                <div className="p-4 shadow-md rounded-lg">
                    <h2 className="text-xl font-semibold">Total Products</h2>
                    <p className="text-2xl">{/* Should be from DB */}45</p>
                    <Link to="/ctrl/products" className="text-blue-500 hover:underline">Manage Products</Link>
                </div>
            </div>
            <div className="mt-6">
                <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-gray-500">
                        <thead className="bg-gray-100 text-gray-700 text-xs uppercase text-center">
                            <tr>
                                <th className="px-4 py-3">Order ID</th>
                                <th className="px-4 py-3">User</th>
                                <th className="px-4 py-3">Total Price</th>
                                <th className="px-4 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length > 0 ? (
                                orders.map((order) => (
                                    <tr key={order._id}
                                        className="border-b hover:bg-gray-50 cursor-pointer text-center"
                                    >
                                        <td className="p-4">{order._id}</td>
                                        <td className="p-4">{order.user.name}</td>
                                        <td className="p-4">{order.totalPrice}</td>
                                        <td className="p-4">{order.status}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="p-4 text-center text-gray-500 border-b">No recent orders found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdminHomePage
