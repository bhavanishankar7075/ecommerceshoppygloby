import React from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateLocalCart } from "../../redux/cartSlice";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast"; // Correctly imported
import "./ProductItem.css";

// API Base URL
const API_URL = "http://localhost:5000/api";

/**
 * @function ProductItem
 * @description Displays a single product card with action buttons.
 */
function ProductItem({ product }) {
  const {
    id: productId,
    title,
    price,
    thumbnail,
    description,
    stock,
  } = product;
  const { isAuthenticated, token } = useAuth();
  const { showToast } = useToast(); // Initialized Toast Hook
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialized Dispatch Hook

  /**
   * @function handleAddToCart
   * @description Sends the request to the protected backend API cart endpoint.
   */
  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      showToast("Please log in to add items to the cart.", "error");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      const data = await response.json();

      if (!data.success) {
        // Handle specific stock error message from backend
        throw new Error(data.message || "Failed to add item to remote cart.");
      }

      // FIX 1: Update Redux state with the *new* cart data from the API response
      // This immediately updates the Header badge (count)
      dispatch(updateLocalCart(data.cart.items));

      // FIX 2: Show success toast notification immediately
      showToast(`${title} added to cart!`, "success");
    } catch (error) {
      console.error("Cart API Error:", error.message);
      // Show error toast notification
      showToast(error.message || "Failed to add item.", "error", 5000); // 5s duration for errors
    }
  };

  return (
    <div className="product-card">
      <img
        src={thumbnail}
        alt={title}
        className="product-image"
        loading="lazy"
      />

      <div className="card-content">
        <Link to={`/product/${productId}`} className="product-title-link">
          <h2>{title}</h2>
        </Link>

        {/* Currency: INR */}
        <p className="product-price">₹{price ? price.toFixed(2) : "N/A"}</p>

        <p className="product-description">{description.substring(0, 70)}...</p>

        <div className="card-actions">
          {/* View Details button */}
          <Link to={`/product/${productId}`} className="view-details-btn">
            View Details
          </Link>

          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={stock === 0}
          >
            {stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Prop type validation
ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    stock: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductItem;
