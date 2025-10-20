import { useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom"

const FilterSidebar = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [priceRange, setPriceRange] = useState([0, 100]);
    const [filters, setFilters] = useState({
        category: "",
        gender: "",
        color: "",
        size: [],
        material: [],
        brand: [],
        minPrice: 0,
        maxPrice: 100,
    });

    const category = ["Top Wear", "Bottom Wear"];
    const gender = ["Men", "Women"];
    const color = ["Red", "Blue", "Black", "Green", "Yellow", "Gray", "White", "Pink", "Beige", "Navy"];
    const size = ["XS", "S", "M", "L", "XL", "XXL"];
    const material = ["Cotton", "Wool", "Denim", "Polyester", "Silk", "Linen", "Fleece"];
    const brand = ["Urban Threads", "Modern Fit", "Street Style", "Beach Breeze", "Fashionista", "ChicStyle"];

    useEffect(() => {
        const params = Object.fromEntries([...searchParams])
    });

    return (
        <div>Filters SideBar</div>
    )
}

export default FilterSidebar
