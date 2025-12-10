import mongoose from "mongoose";
import Product from "./models/Product";
import User from "./models/User";
import products from "./data/products";

// Connect to mongoDB
mongoose.connect(process.env.MONGO_URI);

// Function to populate DB with dummy data from ./data/products
const seedData = async () => {
    try {
        // Clear existing data
        await Product.deleteMany();
        await User.deleteMany();

        // Create a default admin user account
        const createAdmin = await User.create({
            name: "Admin User",
            email: "admin@shozada.shop",
            password: "$3cur!ty",
            role: "admin",
        });

        // Assign the default user ID to each product we are populating
        const userID = createAdmin._id;

        const dummyProducts = products.map((product) => {
            return { ...product, user: userID };
        });

        // Insert the products into the database
        await Product.insertMany(dummyProducts);

        console.log("Dummy product data seeded successfully!");
        process.exit();
    } catch (err) {
        console.error("Seeding data error: ", err);
        process.exit(1);
    }
};

seedData();
