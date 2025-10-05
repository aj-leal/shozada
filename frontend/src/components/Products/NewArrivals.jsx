import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react"
import { FiChevronRight, FiChevronLeft } from "react-icons/fi"
import { Link } from "react-router-dom"

const NewArrivals = () => {
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(false);
    const [canScrollRight, setCanSrcollRight] = useState(true);

    const newArrivals = [
        {
            _id: "1",
            name: "Stylish Jacket",
            price: 120,
            images: [
                {
                    url: "https://picsum.photos/500/500?random=1",
                    altText: "Stylish Jacket",
                },
            ],
        },
        {
            _id: "2",
            name: "Tapered Jeans",
            price: 130,
            images: [
                {
                    url: "https://picsum.photos/500/500?random=2",
                    altText: "Tapered Jeans",
                },
            ],
        },
        {
            _id: "3",
            name: "Sweatshirt",
            price: 90,
            images: [
                {
                    url: "https://picsum.photos/500/500?random=3",
                    altText: "Sweatshirt",
                },
            ],
        },
        {
            _id: "4",
            name: "Cargo Shorts",
            price: 77,
            images: [
                {
                    url: "https://picsum.photos/500/500?random=4",
                    altText: "Cargo Shorts",
                },
            ],
        },
        {
            _id: "5",
            name: "White Shirt",
            price: 20,
            images: [
                {
                    url: "https://picsum.photos/500/500?random=5",
                    altText: "White Shirt",
                },
            ],
        },
        {
            _id: "6",
            name: "Fancy Coat",
            price: 200,
            images: [
                {
                    url: "https://picsum.photos/500/500?random=6",
                    altText: "Fancy Coat",
                },
            ],
        },
        {
            _id: "7",
            name: "Cardigan",
            price: 45,
            images: [
                {
                    url: "https://picsum.photos/500/500?random=7",
                    altText: "Cardifgan",
                },
            ],
        },
        {
            _id: "8",
            name: "Skimpy Skirt",
            price: 39,
            images: [
                {
                    url: "https://picsum.photos/500/500?random=8",
                    altText: "Skimpy Skirt",
                },
            ],
        },
    ]

    // Update Scroll Buttons
    const updateScrollButtons = () => {
        const container = scrollRef.current;
        console.log({
            scrollLeft: container.scrollLeft,
            clientWidth: container.clientWidth,
            scrollWidth: container.scrollWidth,
        });
    }

    useEffect(() => {
        const container = scrollRef.current;
        if (container) {
            container.addEventListener("scroll", updateScrollButtons);
            updateScrollButtons();
        }
    });


    return (
        <section>
            <div className="container mx-auto text-center mb-10 relative">
                <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
                <p className="text-lg text-gray-600 mb-8">
                    Discover the latest styles off the runway, freshly added to
                    keep your wardrobe on the cutting edge of fashion.
                </p>

                {/* Scroll Buttons */}
                <div className="absolute right-0 top-0 md:top-13 flex space-x-2">
                    <button className="p-2 rounded border border-gray-400 bg-white text-black">
                        <FiChevronLeft className="text-2xl" />
                    </button>
                    <button className="p-2 rounded border border-gray-400 bg-white text-black">
                        <FiChevronRight className="text-2xl" />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="container mx-auto overflow-x-scroll flex space-x-6 relative"
                    ref={scrollRef}
                >
                    {newArrivals.map((product) => (
                        <div key={product._id}
                            className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative">
                            <img src={product.images[0]?.url}
                                alt={product.images[0]?.altText || product.name}
                                className="w-full h-[500px] object-cover rounded-xl"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gray-600/10 backdrop-blur-md text-white p-4 rounded-b-lg">
                                <Link to={`/product/${product._id}`}
                                    className="block"
                                >
                                    <h4 className="font-medium">{product.name}</h4>
                                    <p className="mt-1">${product.price}</p>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default NewArrivals
