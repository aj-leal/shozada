import { Link } from "react-router-dom";
import { HiOutlineUser, HiOutlineShoppingBag, HiBars3BottomRight } from "react-icons/hi2";

const Navbar = () => {
    return (
        <>
            <nav className="container mx-auto flex items-center justify-between py-4 px-6">
                {/*Logo in the left part*/}
                <div>
                    <Link to="/" className="text-2xl font-medium">Shozada</Link>
                </div>
                {/*Navigation Links*/}
                <div className="hidden md:flex space-x-6">
                    <Link to="#" className="text-gray-700 hover:text-black text-sm font-medium uppercase">Men</Link>
                    <Link to="#" className="text-gray-700 hover:text-black text-sm font-medium uppercase">Women</Link>
                    <Link to="#" className="text-gray-700 hover:text-black text-sm font-medium uppercase">Top Wear</Link>
                    <Link to="#" className="text-gray-700 hover:text-black text-sm font-medium uppercase">Bottom Wear</Link>
                </div>
                {/*Icons*/}
                <div className="flex items-center space-x-4">
                    {/* User profile icon */}
                    <Link to="/profile" className="hover:text-black">
                        <HiOutlineUser className="h-6 w-6 text-gray-700"/>
                    </Link>
                    {/* Shopping cart icon */}
                    <button className="relative hover:text-black">
                        <HiOutlineShoppingBag className="h-6 w-6 text-gray-700"/>
                        <span className="absolute -top-1 bg-shozada-red text-white text-xs rounded-full px-2 py-0.5">4</span>
                    </button>
                    {/* Search Icon */}
                    {/* Hamburger Icon for mobile navigation*/}
                    <button className="md:hidden">
                        <HiBars3BottomRight className="h-6 w-6 text-gray-700"/>
                    </button>
                </div> 
            </nav>
        </>
    );
}

export default Navbar
