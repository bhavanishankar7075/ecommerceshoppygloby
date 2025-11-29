import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { updateLocalCart } from "../../redux/cartSlice"; // For updating header badge
import CartItem from "../../components/CartItem/CartItem";
import "./Cart.css";

const API_URL = "http://localhost:5000/api";

/**
 * @function Cart
 * @description Displays the authenticated user's cart fetched from the backend.
 */
function Cart() {
  const { token, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch the cart from the backend (Read)
  const fetchCart = useCallback(async () => {
    if (!isAuthenticated) {
      // This should be handled by the useEffect redirect, but safe guard here
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        // If token fails validation, log out user and redirect to login
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      const data = await response.json();

      if (data.success && data.cart) {
        setCartItems(data.cart.items);

        // Calculate total price based on fetched items
        const newTotal = data.cart.items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0
        );
        setTotal(newTotal);

        // Update local Redux store for the header badge (FIX: Ensures header count updates)
        dispatch(updateLocalCart(data.cart.items));
      } else {
        setCartItems([]);
        setTotal(0);
        dispatch(updateLocalCart([]));
      }
    } catch (err) {
      setError("Failed to fetch cart. Is the backend server running?");
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, token, navigate, dispatch]);

  // Fetch cart on mount and whenever auth state changes
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      // Redirect unauthenticated users
      navigate("/login");
    } else if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated, authLoading, fetchCart, navigate]);

  if (loading || authLoading) {
    return (
      <div className="cart-container empty-cart">
        <p className="status-message">Loading Cart...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cart-container empty-cart">
        <h2 className="error-message">🛑 {error}</h2>
      </div>
    );
  }

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
          {cartItems.map((item) => (
            // Pass the refreshCart function to CartItem for updates
            <CartItem
              key={item.product._id}
              item={item}
              refreshCart={fetchCart}
            />
          ))}
        </div>

        {/* Cart Summary Block */}
        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-line">
            <span>Subtotal ({cartItems.length} items):</span>
            {/* Currency: INR */}
            <span className="summary-value">₹{total.toFixed(2)}</span>
          </div>
          <div className="summary-line">
            <span>Shipping:</span>
            <span className="summary-value">FREE</span>
          </div>
          <div className="summary-total">
            <span>Order Total:</span>
            {/* Currency: INR */}
            <span className="summary-value total">₹{total.toFixed(2)}</span>
          </div>

          {/* FIX: Removed the unnecessary link-as-button class, using checkout-btn for styling */}
          <Link to="/checkout" className="checkout-btn">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
