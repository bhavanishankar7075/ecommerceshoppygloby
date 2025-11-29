import React, { useState, useEffect, startTransition } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  // Load cart items from localStorage and compute total
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    // read local storage
    const raw = localStorage.getItem("shoppyglobe_local_cart_items") || "[]";
    let localItems = [];
    try {
      localItems = JSON.parse(raw);
      if (!Array.isArray(localItems)) localItems = [];
    } catch {
      localItems = [];
    }

    // normalize items (safe defaults)
    const normalized = localItems.map((item) => ({
      ...item,
      quantity: typeof item.quantity === "number" ? item.quantity : 1,
      price: item.price ?? item.product?.price ?? 0,
      title: item.title ?? item.product?.name ?? "Product",
    }));

    // compute total
    const total = normalized.reduce(
      (sum, it) => sum + it.price * it.quantity,
      0
    );

    // Batch state updates as a non-urgent transition to avoid cascading render warnings
    startTransition(() => {
      setCartItems(normalized);
      setCartTotal(total);
    });

    // If cart empty and order not placed, redirect to cart page
    if (normalized.length === 0 && !isOrderPlaced) {
      navigate("/cart");
    }
  }, [isAuthenticated, navigate, isOrderPlaced]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [formErrors, setFormErrors] = useState({});

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

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsOrderPlaced(true);

    // Clear local cart and update UI
    localStorage.removeItem("shoppyglobe_local_cart_items");
    // Batch the cart clear to state as a transition too
    startTransition(() => {
      setCartItems([]);
      setCartTotal(0);
    });

    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  if (isOrderPlaced) {
    return (
      <div className="checkout-container success-state">
        <h1>🎉 Order Placed Successfully!</h1>
        <p>Thank you for shopping with ShoppyGlobe!</p>
        <p>You will be redirected shortly.</p>
      </div>
    );
  }

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
        {/* User form */}
        <div className="checkout-form-block">
          <h2>Shipping Information</h2>
          <form onSubmit={handlePlaceOrder} noValidate>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
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
                id="email"
                name="email"
                type="email"
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
              />
              {formErrors.address && (
                <p className="error-text">{formErrors.address}</p>
              )}
            </div>

            <button type="submit" className="place-order-btn">
              Place Order (₹{cartTotal.toFixed(2)})
            </button>
          </form>
        </div>

        {/* Order summary */}
        <div className="order-summary-block">
          <h2>Summary ({cartItems.length} Products)</h2>
          <ul className="summary-list">
            {cartItems.map((item, index) => (
              <li key={item.id ?? index} className="summary-item">
                <span className="summary-item-title">{item.title}</span>
                <span className="summary-item-qty">x{item.quantity}</span>
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
