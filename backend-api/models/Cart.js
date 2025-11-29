const mongoose = require("mongoose");

// Cart Item sub-schema
const CartItemSchema = new mongoose.Schema(
  {
    product: {
      // Reference to the Product model using its ObjectId
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1, // Quantity should not go below 1 (Validation)
      default: 1,
    },
  },
  { _id: false }
); // Do not create a separate ID for subdocuments

// Cart Schema linked to a User
const CartSchema = new mongoose.Schema({
  user: {
    // Link the cart to the authenticated user ID
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true, // Each user has only one cart document
  },
  items: [CartItemSchema], // Array of CartItem sub-documents
});

module.exports = mongoose.model("Cart", CartSchema);
