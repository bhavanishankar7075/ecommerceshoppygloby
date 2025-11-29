const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const protect = require("../middleware/auth"); // Import protection middleware

const router = express.Router();

// Middleware to ensure all routes below are protected (60 Marks)
router.use(protect);

// @route GET /api/cart
// @desc Get the user's cart (Read)
router.get("/", async (req, res) => {
  try {
    // Find the cart belonging to the logged-in user (req.userId is set by middleware)
    const cart = await Cart.findOne({ user: req.userId }).populate(
      "items.product"
    );

    if (!cart) {
      // If no cart found, return an empty cart structure
      return res.status(200).json({
        cart: { items: [] },
        success: true,
      });
    }

    res.status(200).json({
      cart,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to retrieve cart.",
        success: false,
        error: error.message,
      });
  }
});

// @route POST /api/cart
// @desc Add a product to the shopping cart (Create) (60 Marks)
router.post("/", async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  try {
    // 1. Validation: Check if product ID exists (20 marks)
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found.", success: false });
    }
    if (product.stock < quantity) {
      return res
        .status(400)
        .json({ message: "Insufficient stock.", success: false });
    }

    // 2. Find or create the user's cart
    let cart = await Cart.findOne({ user: req.userId });

    if (!cart) {
      // Create new cart for the user
      cart = await Cart.create({ user: req.userId, items: [] });
    }

    // 3. Check if item already exists in cart
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      // Item exists, update quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Item is new, add it
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    await cart.populate("items.product"); // Populate for immediate response

    res.status(201).json({
      message: "Product added to cart.",
      cart,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to add product to cart.",
        success: false,
        error: error.message,
      });
  }
});

// @route PUT /api/cart/:productId
// @desc Update the quantity of a product in the cart (Update) (60 Marks)
router.put("/:productId", async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  // Validation
  if (quantity === undefined || quantity < 1) {
    return res
      .status(400)
      .json({
        message: "Quantity must be a positive integer (min 1).",
        success: false,
      });
  }

  try {
    let cart = await Cart.findOne({ user: req.userId });

    if (!cart) {
      return res
        .status(404)
        .json({ message: "Cart not found.", success: false });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res
        .status(404)
        .json({ message: "Product not found in cart.", success: false });
    }

    // Update quantity
    cart.items[itemIndex].quantity = quantity;

    await cart.save();
    await cart.populate("items.product");

    res.status(200).json({
      message: "Cart quantity updated.",
      cart,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to update cart.",
        success: false,
        error: error.message,
      });
  }
});

// @route DELETE /api/cart/:productId
// @desc Remove a product from the cart (Delete) (60 Marks)
router.delete("/:productId", async (req, res) => {
  const { productId } = req.params;

  try {
    let cart = await Cart.findOne({ user: req.userId });

    if (!cart) {
      return res
        .status(404)
        .json({ message: "Cart not found.", success: false });
    }

    // Filter out the item to be removed
    const initialCount = cart.items.length;
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    if (cart.items.length === initialCount) {
      return res
        .status(404)
        .json({ message: "Product not found in cart.", success: false });
    }

    await cart.save();
    await cart.populate("items.product");

    res.status(200).json({
      message: "Product removed from cart.",
      cart,
      success: true,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to remove product from cart.",
        success: false,
        error: error.message,
      });
  }
});

module.exports = router;
