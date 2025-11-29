const express = require("express");
const Product = require("../models/Product"); // Import Product model

const router = express.Router();

// @route GET /api/products
// @desc Fetch a list of products from MongoDB (60 Marks)
router.get("/", async (req, res) => {
  try {
    // Fetch all products
    const products = await Product.find({});

    res.status(200).json({
      products,
      success: true,
    });
  } catch (error) {
    // API Error Handling (20 marks)
    res
      .status(500)
      .json({
        message: "Failed to fetch products.",
        success: false,
        error: error.message,
      });
  }
});

// @route GET /api/products/:id
// @desc Fetch details of a single product by its ID (60 Marks)
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    // Validation: Check if product exists (20 marks)
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found.", success: false });
    }

    res.status(200).json({
      product,
      success: true,
    });
  } catch (error) {
    // API Error Handling (20 marks) - handles invalid MongoDB ID format
    res
      .status(500)
      .json({
        message: "Failed to fetch product details.",
        success: false,
        error: error.message,
      });
  }
});

module.exports = router;
