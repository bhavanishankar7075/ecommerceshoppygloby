import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

// Regex for a basic email format check
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

/**
 * @function Login
 * @description User Login Page with client-side validation.
 */
function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Form Validation and Submission 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // 1. Basic Required Fields Check
    if (!email || !password) {
      setError("Email and password are required.");
      setLoading(false);
      return;
    }
    
    // 2. Email Format Validation (Recommended addition for better UX)
    if (!EMAIL_REGEX.test(email)) {
        setError("Please enter a valid email address.");
        setLoading(false);
        return;
    }

    try {
      // Attempt to log in via the useAuth hook
      await login({ email, password });
      
      // Redirect to home after successful login
      navigate("/");
    } catch (err) {
      // Display error message from the backend/auth service
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Login to ShoppyGlobe</h1>
        <form onSubmit={handleSubmit} noValidate> {/* Added noValidate to control validation entirely with React */}
          {error && <div className="error-message-box">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={loading} className="auth-submit-btn">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;