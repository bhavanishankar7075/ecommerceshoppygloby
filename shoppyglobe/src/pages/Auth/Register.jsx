import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

// Regex for a basic email format check
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

// Regex for strong password: at least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 symbol
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

/**
 * @function Register
 * @description User Registration Page.
 */
function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // State for the new "Confirm Password" field
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Form Validation and Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // 1. Basic Required Fields Check (already present)
    if (!email || !password || !confirmPassword) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    // 2. Email Format Validation
    if (!EMAIL_REGEX.test(email)) {
        setError("Please enter a valid email address.");
        setLoading(false);
        return;
    }

    // 3. Password Match Validation
    if (password !== confirmPassword) {
        setError("Passwords do not match.");
        setLoading(false);
        return;
    }
    
    // 4. Password Strength Validation (minimum 8 characters and complexity)
    if (!PASSWORD_REGEX.test(password)) {
        setError("Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.");
        setLoading(false);
        return;
    }

    try {
      await register({ email, password });
      // Redirect to home after successful registration
      navigate("/");
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Create Account</h1>
        <form onSubmit={handleSubmit}>
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
          
          {/* New Confirm Password Field */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={loading} className="auth-submit-btn">
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;