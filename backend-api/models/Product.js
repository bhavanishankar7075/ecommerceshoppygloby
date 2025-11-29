const mongoose = require("mongoose");

// Product Schema definition (MongoDB Integration 50 Marks)
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  thumbnail: {
    // Placeholder for image URL
    type: String,
    default: "https://placehold.co/200x200/cccccc/333333?text=Product",
  },
  category: {
    type: String,
    default: "Electronics",
  },
});

module.exports = mongoose.model("Product", ProductSchema);
