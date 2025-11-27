import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/cartSlice";
import "./ProductItem.css";

/**
 * @function ProductItem
 * @description Displays a single product card with an 'Add to Cart' and 'View Details' button.
 */
function ProductItem({ product }) {
  const { id, title, price, thumbnail, description } = product;
  const dispatch = useDispatch();

  // Handler for adding product to cart
  const handleAddToCart = () => {
    dispatch(addItem(product));
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
        <Link to={`/product/${id}`} className="product-title-link">
          <h2>{title}</h2>
        </Link>

        {/* FIX: Changed currency symbol to INR */}
        <p className="product-price">₹{price.toFixed(2)}</p>

        <p className="product-description">{description.substring(0, 70)}...</p>

        <div className="card-actions">
          {/* FIX: Added View Details button */}
          <Link to={`/product/${id}`} className="view-details-btn">
            View Details
          </Link>

          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

// Prop type validation
ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductItem;
