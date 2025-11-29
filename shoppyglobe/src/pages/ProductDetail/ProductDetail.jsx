import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; // Used for updating local cart count
import { updateLocalCart } from "../../redux/cartSlice"; // Used for updating local cart count
import { useAuth } from "../../hooks/useAuth"; // Import Auth Hook
import "./ProductDetail.css";

// FIX: Base URL definition
const API_BASE_URL = "http://localhost:5000/api";

/**
 * @function ProductDetail
 * @description Displays detailed information for a single product.
 */
function ProductDetail() {
  const { productId } = useParams();
  const { isAuthenticated, token } = useAuth(); // Auth integration
  const navigate = useNavigate();
  const dispatch = useDispatch(); // For updating local cart count display

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product details based on ID
  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);
      const API_URL = `${API_BASE_URL}/products/${productId}`;

      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data && data.product && data.success) {
          // Map backend fields to frontend expectations (name -> title)
          setProduct({
            ...data.product,
            id: data.product._id, // Set frontend ID to MongoDB _id
            title: data.product.name,
            // Add mock fields for display, as they are not in our basic schema
            rating: 4.5,
            discountPercentage: 10,
          });
        } else {
          throw new Error("Product not found or invalid data received.");
        }
      } catch (err) {
        console.error("Detail fetching failed:", err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  // Handler for adding to cart
  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: product.id, quantity: 1 }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to add item to remote cart.");
      }

      // SUCCESS: Update the local Redux state for the Header badge (UX feedback)
      // The API response contains the full updated cart, which we pass to Redux
      dispatch(updateLocalCart(data.cart.items));

      // Show success feedback
      const msgBox = document.getElementById("message-box");
      if (msgBox) {
        // FIX: Ensure element exists before accessing properties
        msgBox.style.backgroundColor = "var(--success-color)";
        msgBox.innerText = `${product.title} added to cart!`;
        msgBox.classList.add("show");
        setTimeout(() => msgBox.classList.remove("show"), 2000);
      }
    } catch (error) {
      console.error("Cart API Error:", error.message);
      // Show error feedback
      const msgBox = document.getElementById("message-box");
      if (msgBox) {
        // FIX: Ensure element exists before accessing properties
        msgBox.style.backgroundColor = "var(--danger-color)";
        msgBox.innerText = error.message;
        msgBox.classList.add("show");
        setTimeout(() => msgBox.classList.remove("show"), 4000);
      }
    }
  };

  // Conditional Rendering
  if (isLoading)
    return (
      <div className="product-detail-container">
        <p className="status-message">Loading Product Details...</p>
      </div>
    );
  if (error)
    return (
      <div className="product-detail-container">
        <h2 className="error-message">🛑 Error: {error}</h2>
      </div>
    );
  if (!product)
    return (
      <div className="product-detail-container">
        <h2 className="error-message">Product not found.</h2>
      </div>
    );

  const {
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    thumbnail: images,
  } = product;
  // Ensure images is an array, as our backend provides a single thumbnail string
  const imageArray = Array.isArray(images) ? images : [images];

  return (
    <div className="product-detail-container">
      <div className="detail-card">
        <div className="image-gallery">
          {imageArray.slice(0, 4).map((imgUrl, index) => (
            <img
              key={index}
              src={imgUrl}
              alt={`${title} view ${index + 1}`}
              className="gallery-image"
              loading="lazy"
            />
          ))}
        </div>

        <div className="product-info">
          <h1>{title}</h1>
          <p className="category-tag">
            {product.category || "Uncategorized"} | {product.brand || "Unknown"}
          </p>

          <div className="pricing">
            <span className="price">₹{price ? price.toFixed(2) : "N/A"}</span>
            <span className="discount">-{discountPercentage || 0}% off</span>
          </div>

          <p className="rating">⭐ {rating || "N/A"} Rating</p>
          <p className="stock-info">
            {stock > 10 ? (
              <span className="in-stock">In Stock</span>
            ) : (
              <span className="low-stock">Low Stock: {stock || 0} units</span>
            )}
          </p>

          <p className="description-full">{description}</p>

          <button
            className="add-to-cart-btn-lg"
            onClick={handleAddToCart}
            disabled={stock === 0}
          >
            {stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>

      {/* Custom Message Box (instead of alert()) - Required for the ProductDetail page */}
      <div id="message-box" className="message-box"></div>
    </div>
  );
}

export default ProductDetail;
