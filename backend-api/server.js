const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware Setup
// 1. CORS: Allows requests from your React frontend (e.g., http://localhost:5173)
app.use(cors());
// 2. Body Parser: Allows Express to read JSON data from the request body
app.use(express.json());

// --- MongoDB Connection (50 marks) ---
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    // Exit process with failure
    process.exit(1);
  }
};

// Connect to the database
connectDB();

// --- Import Routes ---
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");

// --- Define Routes (60 marks) ---
app.use("/api", authRoutes); // Routes for /register and /login
app.use("/api/products", productRoutes); // Routes for product fetching
app.use("/api/cart", cartRoutes); // Protected routes for cart CRUD

// --- Root Route for testing ---
app.get("/", (req, res) => {
  res.send("ShoppyGlobe Backend API is running...");
});

// --- API Error Handling (20 marks) ---
// Global Error Handler for unhandled errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
    success: false,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
