import React from 'react';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../../redux/cartSlice';
import CartItem from '../../components/CartItem/CartItem';
import { Link, useNavigate } from 'react-router-dom';
import './Cart.css';

/**
 * @function Cart
 * @description Displays the full list of items in the cart and the total summary.
 */
function Cart() {
  // Get cart items and total from Redux
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const navigate = useNavigate();

  // Handler to navigate to checkout
  const handleCheckout = () => {
    navigate('/checkout');
  };

  // Display message if cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="cart-container empty-cart">
        <h1>🛒 Your Cart is Empty</h1>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="continue-shopping-btn">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Your Shopping Cart</h1>
      
      <div className="cart-layout">
        <div className="cart-items-list">
          {/* Render list of cart items */}
          {cartItems.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Cart Summary Block */}
        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-line">
            <span>Subtotal ({cartItems.length} items):</span>
            {/* FIX: Changed currency symbol to INR */}
            <span className="summary-value">₹{cartTotal.toFixed(2)}</span>
          </div>
          <div className="summary-line">
            <span>Shipping:</span>
            <span className="summary-value">FREE</span>
          </div>
          <div className="summary-total">
            <span>Order Total:</span>
            {/* FIX: Changed currency symbol to INR */}
            <span className="summary-value total">₹{cartTotal.toFixed(2)}</span>
          </div>
          
          <button 
            className="checkout-btn"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;