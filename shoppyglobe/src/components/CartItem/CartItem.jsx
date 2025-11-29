import React from "react";
import PropTypes from "prop-types";
import { useAuth } from "../../hooks/useAuth";
import "./CartItem.css";

const API_URL = "http://localhost:5000/api";

/**
 * @function CartItem
 * @description Displays a single item in the cart with controls for quantity and removal.
 */
function CartItem({ item, refreshCart }) {
  const { product, quantity } = item;
  const { token, isAuthenticated } = useAuth();

  // Use product._id from the backend response
  const productId = product._id;

  // Calculate subtotal for the item
  const subtotal = product.price * quantity;

  // --- API Handlers ---

  const sendCartUpdate = async (method, newQuantity = null) => {
    if (!isAuthenticated) return;

    try {
      const response = await fetch(`${API_URL}/cart/${productId}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body:
          method === "PUT" && newQuantity !== null
            ? JSON.stringify({ quantity: newQuantity })
            : undefined,
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(
          data.message ||
            `Failed to ${method === "DELETE" ? "remove" : "update"} item.`
        );
      }

      refreshCart(); // Tell parent component (Cart.jsx) to refresh data
    } catch (error) {
      console.error("Cart API Error:", error.message);
      // Show error feedback
    }
  };

  // Handler to remove item (DELETE)
  const handleRemove = () => {
    sendCartUpdate("DELETE");
  };

  // Handler to increase quantity (PUT)
  const handleIncrease = () => {
    sendCartUpdate("PUT", quantity + 1);
  };

  // Handler to decrease quantity (PUT)
  const handleDecrease = () => {
    // Check condition: quantity should not go below 1
    if (quantity > 1) {
      sendCartUpdate("PUT", quantity - 1);
    }
  };

  return (
    <div className="cart-item-card">
      <img
        src={product.thumbnail}
        alt={product.name}
        className="cart-item-image"
        loading="lazy"
      />

      <div className="item-details">
        <h3>{product.name}</h3>
        {/* Currency: INR */}
        <p className="item-price">Price: ₹{product.price.toFixed(2)}</p>
      </div>

      <div className="quantity-control">
        <button
          onClick={handleDecrease}
          className="qty-btn"
          disabled={quantity <= 1}
        >
          -
        </button>
        <span className="current-qty">{quantity}</span>
        <button onClick={handleIncrease} className="qty-btn">
          +
        </button>
      </div>

      <div className="item-subtotal">
        <h4>Subtotal:</h4>
        {/* Currency: INR */}
        <p className="subtotal-amount">₹{subtotal.toFixed(2)}</p>
      </div>

      <button onClick={handleRemove} className="remove-btn">
        Remove
      </button>
    </div>
  );
}

// Prop type validation
CartItem.propTypes = {
  item: PropTypes.shape({
    product: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      thumbnail: PropTypes.string.isRequired,
    }).isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  refreshCart: PropTypes.func.isRequired,
};

export default CartItem;
