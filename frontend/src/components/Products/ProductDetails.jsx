const selectedProduct = {
    name: "Stylish Jacket",
    price: 120,
    originalPrice: 150,
    description: "This is a stylish jacket for those IG worthy memories.",
    brand: "BrandyJacket",
    material: "Denim",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue", "Black"],
    images: [
        {
            url: "https://picsum.photos/500/500?random=1",
            altText: "Stylish Jacker 1",
        },
        {
            url: "https://picsum.photos/500/500?random=2",
            altText: "Stylish Jacker 2",
        },
    ]
}

const ProductDetails = () => {
    return (
        <div className="p-6">
            <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
                <div className="flex flex-col md:flex-row">
                    {/* Left Thumbnails */}
                    <div className="hidden md:flex flex-col space-y-4 mr-6">
                        {selectedProduct.images.map((image, index) => (
                            <img key={index}
                                src={image.url}
                                alt={image.altText || `Thumbnail ${index}`}
                                className="w-20 h-20 object-cover rounded-lg cursor-pointer border"
                            />
                        ))}
                    </div>

                    {/* Main Image */}
                    <div className="md:w-1/2 ">
                        <div className="mb-4">
                            <img
                                src={selectedProduct.images[0].url}
                                alt={selectedProduct.images[0].altText}
                                className="w-full h-auto object-cover rounded-lg"
                            />
                        </div>
                    </div>

                    {/* Mobile Thumbnail */}
                    <div className="md:hidden flex overflow-x-scroll space-x-4 mb-4">
                        {selectedProduct.images.map((image, index) => (
                            <img key={index}
                                src={image.url}
                                alt={image.altText || `Thumbnail ${index}`}
                                className="w-20 h-20 object-cover rounded-lg cursor-pointer border"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
