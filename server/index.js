

const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const authRoutes = require("./Routes/auth");
const noteRoutes = require("./Routes/notes");
const userRoutes = require("./Routes/users"); // Add user routes

dotenv.config();

const MONGO_URL = `mongodb+srv://${process.env.NAME}:${process.env.PASSWORD}@cluster0.xbvrhfr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const app = express();
const PORT = 6969;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connection Successful");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
};

connectDB();

app.get("/", (req, res) => {
    res.send("Server Is Running");
});

app.use("/auth", authRoutes);
app.use("/notes", noteRoutes);
app.use("/users", userRoutes); // Register user routes
app.use("/files", express.static("files"));

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});
