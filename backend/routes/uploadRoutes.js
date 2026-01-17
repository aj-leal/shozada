import express from "express";
import multer from "multer";
import streamifier from "streamifier";
import { v2 as cloudinary } from "cloudinary";
import { protectionMiddleware, adminMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

// Multer setup using memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", protectionMiddleware, adminMiddleware, upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded." });
        }

        // Function to handle the stream upload to Cloudinary
        const streamUpload = (fileBuffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream((error, result) => {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(error);
                    }
                });

                // Use streamifier to convert file buffer to a stream
                streamifier.createReadStream(fileBuffer).pipe(stream);
            });
        };

        // Call the streamUpload function
        const result = await streamUpload(req.file.buffer);

        // Respond with the uploaded image URL
        res.json({ imageUrl: result.secure_url });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error." });
    }
});

export default router;
