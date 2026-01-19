import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import checkoutRoutes from "./routes/checkoutRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import subscribeRoute from "./routes/subscribeRoute.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

//console.log(process.env.PORT);

const PORT = process.env.PORT || 8080;

//Connect to mongoDB
connectDB();
/*
app.get("/", (req, res) => {
    res.send("WELCOME TO SHOZADA API!.");
});
*/
// API Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/subscribe", subscribeRoute);
app.use("/api/admin", adminRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
