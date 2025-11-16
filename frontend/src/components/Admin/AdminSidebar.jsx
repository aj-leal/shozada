import { FaUser } from "react-icons/fa6"
import { Link, NavLink } from "react-router-dom"

const AdminSidebar = ({ toggleSideBar }) => {
    return (
        <div className="p-6">
            <div className="mb-6">
                <Link to="/ctrl" className="text-2xl font-medium" onClick={toggleSideBar}>Shozada</Link>
            </div>
            <h2 className="text-xl font-medium mb-6 text-center">Admin Dashboard</h2>

            <nav className="flex flex-col space-y-2">
                <NavLink to="/ctrl/users"
                    className={({ isActive }) => isActive ?
                        "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2" :
                        "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"}
                >
                    <FaUser />
                    <span>Users</span>
                </NavLink>
            </nav>
        </div>
    )
}

export default AdminSidebar
