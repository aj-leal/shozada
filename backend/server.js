import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

//console.log(process.env.PORT);

const PORT = process.env.PORT || 8080;

//Connect to mongoDB
connectDB();

app.get("/", (req, res) => {
    res.send("WELCOME TO SHOZADA API!.");
});

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
