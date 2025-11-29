import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItemCount } from "../../redux/cartSlice"; // We still use this for the *client-side* cart status
import { useAuth } from "../../hooks/useAuth"; // Import Auth Hook
import "./Header.css";

/**
 * @function Header
 * @description Displays the main navigation, cart icon, and authentication links.
 */
function Header() {
  const { isAuthenticated, logout } = useAuth(); // Get authentication status
  const cartItemCount = useSelector(selectCartItemCount);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">🛍️ ShoppyGlobe</Link>
      </div>
      <nav className="nav-menu">
        <Link to="/" className="nav-link">
          Home
        </Link>

        {/* Protected Cart/Checkout Routes */}
        {isAuthenticated ? (
          <>
            <Link to="/cart" className="nav-link cart-icon-link">
              🛒 Cart
              {cartItemCount > 0 && (
                <span className="cart-count">{cartItemCount}</span>
              )}
            </Link>
            <Link to="/checkout" className="nav-link checkout-link">
              Checkout
            </Link>
            <button onClick={logout} className="nav-link auth-btn">
              Logout
            </button>
          </>
        ) : (
          // Authentication Routes (60 Marks)
          <>
            <Link to="/login" className="nav-link auth-btn">
              Login
            </Link>
            <Link to="/register" className="nav-link auth-btn">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
