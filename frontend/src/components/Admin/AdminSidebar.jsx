import { FaSignOutAlt } from "react-icons/fa";
import { FaBoxOpen, FaClipboardList, FaStore, FaUser } from "react-icons/fa6"
import { Link, NavLink, useNavigate } from "react-router-dom"

const AdminSidebar = ({ toggleSideBar }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/")
    }

    return (
        <div className="p-6">
            <div className="mb-8 text-center">
                <Link to="/ctrl" className="text-2xl font-medium sm:hidden md:inline-flex" onClick={toggleSideBar}>Shozada</Link>
            </div>
            {/*<h2 className="text-xl font-medium mb-6 text-center sm:hidden md:inline-flex">Admin Dashboard</h2>*/}

            <nav className="flex flex-col space-y-2">
                <NavLink to="/ctrl/users"
                    className={({ isActive }) => isActive ?
                        "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2" :
                        "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}
                    onClick={toggleSideBar}
                >
                    <FaUser />
                    <span>Users</span>
                </NavLink>
                <NavLink to="/ctrl/products"
                    className={({ isActive }) => isActive ?
                        "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2" :
                        "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}
                    onClick={toggleSideBar}
                >
                    <FaBoxOpen />
                    <span>Products</span>
                </NavLink>
                <NavLink to="/ctrl/orders"
                    className={({ isActive }) => isActive ?
                        "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2" :
                        "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}
                    onClick={toggleSideBar}
                >
                    <FaClipboardList />
                    <span>Orders</span>
                </NavLink>
                <NavLink to="/"
                    className={({ isActive }) => isActive ?
                        "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2" :
                        "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}
                    onClick={toggleSideBar}
                >
                    <FaStore />
                    <span>Shop</span>
                </NavLink>
            </nav>
            <div className="mt-6">
                <button onClick={handleLogout}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded flex items-center justify-center space-x-2"
                >
                    <FaSignOutAlt />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    )
}

export default AdminSidebar
