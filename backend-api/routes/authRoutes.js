const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Import User model

const router = express.Router();

/**
 * @function generateToken
 * @description Helper function to generate a JWT token.
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d", // Token expires in 1 day
  });
};

// @route POST /api/register
// @desc Register a new user (60 Marks)
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validation: Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists.", success: false });
    }

    // Create new user (password is hashed via pre('save') middleware)
    user = new User({ email, password });
    await user.save();

    // Respond with success and token
    res.status(201).json({
      message: "User registered successfully.",
      token: generateToken(user._id),
      userId: user._id,
      success: true,
    });
  } catch (error) {
    // API Error Handling (20 marks)
    res
      .status(500)
      .json({
        message: "Registration failed.",
        success: false,
        error: error.message,
      });
  }
});

// @route POST /api/login
// @desc Authenticate user and return a JWT token (60 Marks)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Invalid credentials.", success: false });
    }

    // 2. Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid credentials.", success: false });
    }

    // 3. Respond with success and token
    res.status(200).json({
      message: "Login successful.",
      token: generateToken(user._id),
      userId: user._id,
      success: true,
    });
  } catch (error) {
    // API Error Handling (20 marks)
    res
      .status(500)
      .json({ message: "Login failed.", success: false, error: error.message });
  }
});

module.exports = router;
