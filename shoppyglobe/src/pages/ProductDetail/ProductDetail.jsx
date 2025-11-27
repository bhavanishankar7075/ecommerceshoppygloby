import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../../redux/cartSlice';
import './ProductDetail.css';

/**
 * @function ProductDetail
 * @description Displays detailed information for a single product.
 */
function ProductDetail() {
  // Get the product ID from the URL
  const { productId } = useParams();
  const dispatch = useDispatch();
  
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product details based on ID
  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);
      const API_URL = `https://dummyjson.com/products/${productId}`;

      try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data && data.id) {
          setProduct(data);
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
  }, [productId]); // Re-fetch if product ID changes

  // Handler for adding to cart
  const handleAddToCart = () => {
    if (product) {
      dispatch(addItem(product));
      // Using a custom message box instead of alert()
      document.getElementById('message-box').innerText = `${product.title} added to cart!`;
      document.getElementById('message-box').classList.add('show');
      setTimeout(() => document.getElementById('message-box').classList.remove('show'), 2000);
    }
  };

  // Conditional Rendering
  if (isLoading) return <div className="product-detail-container"><p className="status-message">Loading Product Details...</p></div>;
  if (error) return <div className="product-detail-container"><h2 className="error-message">🛑 Error: {error}</h2></div>;
  if (!product) return <div className="product-detail-container"><h2 className="error-message">Product not found.</h2></div>;

  const { title, description, price, discountPercentage, rating, stock, brand, category, images } = product;

  return (
    <div className="product-detail-container">
      <div className="detail-card">
        <div className="image-gallery">
          {images.slice(0, 4).map((imgUrl, index) => (
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
          <p className="category-tag">{category} | {brand}</p>
          
          <div className="pricing">
            {/* FIX: Changed currency symbol to INR */}
            <span className="price">₹{price.toFixed(2)}</span>
            <span className="discount">-{discountPercentage}% off</span>
          </div>

          <p className="rating">⭐ {rating} Rating</p>
          <p className="stock-info">
            {stock > 10 ? <span className="in-stock">In Stock</span> : <span className="low-stock">Low Stock: {stock} units</span>}
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

      {/* Custom Message Box (instead of alert()) */}
      <div id="message-box" className="message-box"></div>
    </div>
  );
}

export default ProductDetail;