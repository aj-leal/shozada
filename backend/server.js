import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

//console.log(process.env.PORT);

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.send("WELCOME TO SHOZADA API!.");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
