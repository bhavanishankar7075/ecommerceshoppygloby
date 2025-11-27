import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../../redux/cartSlice';
import './CartItem.css';

/**
 * @function CartItem
 * @description Displays a single item in the cart with controls for quantity and removal.
 */
function CartItem({ item }) {
  const { id, title, price, thumbnail, quantity } = item;
  const dispatch = useDispatch();
  
  // Calculate subtotal for the item
  const subtotal = price * quantity;

  // Handler to remove item
  const handleRemove = () => {
    dispatch(removeItem(id));
  };

  // Handler to increase quantity
  const handleIncrease = () => {
    dispatch(updateQuantity({ id, newQuantity: quantity + 1 }));
  };

  // Handler to decrease quantity
  const handleDecrease = () => {
    // Check condition: quantity should not go below 1
    if (quantity > 1) {
      dispatch(updateQuantity({ id, newQuantity: quantity - 1 }));
    }
  };

  return (
    <div className="cart-item-card">
      <img 
        src={thumbnail} 
        alt={title} 
        className="cart-item-image" 
        loading="lazy" 
      />
      
      <div className="item-details">
        <h3>{title}</h3>
        {/* FIX: Changed currency symbol to INR */}
        <p className="item-price">Price: ₹{price.toFixed(2)}</p>
      </div>

      <div className="quantity-control">
        <button onClick={handleDecrease} className="qty-btn" disabled={quantity <= 1}>-</button>
        <span className="current-qty">{quantity}</span>
        <button onClick={handleIncrease} className="qty-btn">+</button>
      </div>

      <div className="item-subtotal">
        <h4>Subtotal:</h4>
        {/* FIX: Changed currency symbol to INR */}
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
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartItem;