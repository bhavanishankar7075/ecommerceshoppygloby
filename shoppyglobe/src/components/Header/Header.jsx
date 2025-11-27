import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItemCount } from "../../redux/cartSlice";
import "./Header.css";

/**
 * @function Header
 * @description Displays the main navigation and cart icon, connected to Redux.
 */
function Header() {
  // Get live cart item count
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
        <Link to="/cart" className="nav-link cart-icon-link">
          🛒 Cart
          {/* Display cart count badge if items exist */}
          {cartItemCount > 0 && (
            <span className="cart-count">{cartItemCount}</span>
          )}
        </Link>
        <Link to="/checkout" className="nav-link checkout-link">
          Checkout
        </Link>
      </nav>
    </header>
  );
}

export default Header;
