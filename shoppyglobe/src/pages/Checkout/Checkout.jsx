import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectCartItems,
  selectCartTotal,
  clearCart,
} from "../../redux/cartSlice";
import "./Checkout.css";

/**
 * @function Checkout
 * @description Dummy form for user details and order summary.
 */
function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  // State for form data and submission status
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0 && !isOrderPlaced) {
      navigate("/cart");
    }
  }, [cartItems, isOrderPlaced, navigate]);

  // Basic form validation
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Full name is required.";
    if (!formData.email.trim()) errors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Email address is invalid.";
    if (!formData.address.trim())
      errors.address = "Shipping address is required.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handler for input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handler for "Place Order" button
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // 1. Display message "Order placed"
      setIsOrderPlaced(true);

      // 2. Empty the cart (Redux will persist this empty state)
      dispatch(clearCart());

      // 3. Redirect the user back to the Home page automatically (after a delay)
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };

  if (isOrderPlaced) {
    return (
      <div className="checkout-container success-state">
        <h1>🎉 Order Placed Successfully!</h1>
        <p>Thank you for shopping with ShoppyGlobe!</p>
        <p>You will be redirected to the home page shortly.</p>
      </div>
    );
  }

  // Fallback for empty cart (should be caught by useEffect, but good for safety)
  if (cartItems.length === 0) {
    return (
      <div className="checkout-container">
        <p>Your cart is empty. Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      <div className="checkout-layout">
        {/* User Details Form */}
        <div className="checkout-form-block">
          <h2>Shipping Information</h2>
          <form onSubmit={handlePlaceOrder} noValidate>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={formErrors.name ? "input-error" : ""}
              />
              {formErrors.name && (
                <p className="error-text">{formErrors.name}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={formErrors.email ? "input-error" : ""}
              />
              {formErrors.email && (
                <p className="error-text">{formErrors.email}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="address">Shipping Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={formErrors.address ? "input-error" : ""}
              ></textarea>
              {formErrors.address && (
                <p className="error-text">{formErrors.address}</p>
              )}
            </div>

            <button type="submit" className="place-order-btn">
              {/* FIX: Changed currency symbol to INR */}
              Place Order (₹{cartTotal.toFixed(2)})
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="order-summary-block">
          <h2>Summary ({cartItems.length} Products)</h2>
          <ul className="summary-list">
            {cartItems.map((item) => (
              <li key={item.id} className="summary-item">
                <span className="summary-item-title">{item.title}</span>
                <span className="summary-item-qty">x{item.quantity}</span>
                {/* FIX: Changed currency symbol to INR */}
                <span className="summary-item-price">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <div className="summary-total-checkout">
            <span>Total to Pay:</span>
            <span className="summary-total-value">₹{cartTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
