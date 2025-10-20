import { useEffect, useState } from "react"
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import { useRef } from "react";

const CollectionPage = () => {
    const [products, setProducts] = useState([]);
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const sidebarRef = useRef(null);

    const toggleSidebar = () => { setIsSideBarOpen(!isSideBarOpen) }

    const handleClickOutside = (e) => {
        // Close sidebar if clicked outside
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            setIsSideBarOpen(false);
        }
    }

    useEffect(() => {
        // Add Event listener for clicks
        document.addEventListener("mousedown", handleClickOutside);

        // clean event listener
        return () => { document.removeEventListener("mousedown", handleClickOutside) };
    });

    useEffect(() => {
        setTimeout(() => {
            const fetchedProducts = [
                {
                    _id: 1,
                    name: "Product 1",
                    price: 100,
                    images: [
                        {
                            url: "https://picsum.photos/500/500?random=1",
                        },
                    ]
                },
                {
                    _id: 2,
                    name: "Product 2",
                    price: 95,
                    images: [
                        {
                            url: "https://picsum.photos/500/500?random=2",
                        },
                    ]
                },
                {
                    _id: 3,
                    name: "Product 3",
                    price: 105,
                    images: [
                        {
                            url: "https://picsum.photos/500/500?random=3",
                        },
                    ]
                },
                {
                    _id: 4,
                    name: "Product 4",
                    price: 60,
                    images: [
                        {
                            url: "https://picsum.photos/500/500?random=4",
                        },
                    ]
                },
                {
                    _id: 5,
                    name: "Product 5",
                    price: 140,
                    images: [
                        {
                            url: "https://picsum.photos/500/500?random=5",
                        },
                    ]
                },
                {
                    _id: 6,
                    name: "Product 6",
                    price: 89,
                    images: [
                        {
                            url: "https://picsum.photos/500/500?random=6",
                        },
                    ]
                },
                {
                    _id: 7,
                    name: "Product 7",
                    price: 75,
                    images: [
                        {
                            url: "https://picsum.photos/500/500?random=7",
                        },
                    ]
                },
                {
                    _id: 8,
                    name: "Product 8",
                    price: 210,
                    images: [
                        {
                            url: "https://picsum.photos/500/500?random=8",
                        },
                    ]
                },
            ];

            setProducts(fetchedProducts);
        }, 1500);
    }, []);

    return (
        <div className="flex flex-col lg:flex-row">
            {/* Mobile filter button */}

            <button onClick={toggleSidebar}
                className="lg:hidden border p-2 flex justify-center items-center"
            >
                <FaFilter className="mr-2" /> Filters
            </button>

            {/* Filter Sidebar */}
            <div ref={sidebarRef}
                className={`${isSideBarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
            >
                <FilterSidebar />
            </div>
        </div>
    )
}

export default CollectionPage
