import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);
const API_URL = "http://localhost:5000/api";

/**
 * @function useAuth
 * @description Provides authentication state and functions for login/register/logout.
 */
export const useAuth = () => {
  return useContext(AuthContext);
};

/**
 * @function AuthProvider
 * @description Manages user authentication state and JWT token persistence.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  // Load token/user ID on initial mount
  useEffect(() => {
    if (token) {
      // In a real app, you would decode the JWT or verify it with the server.
      // For now, we assume a token exists means the user is logged in.
      setUser({ id: localStorage.getItem("userId") || "guest" });
    }
    setLoading(false);
  }, [token]);

  /**
   * @function authenticate
   * @description Handles POST request for registration or login.
   * @param {string} endpoint - 'register' or 'login'.
   * @param {object} credentials - { email, password }.
   */
  const authenticate = async (endpoint, credentials) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(
          data.message || `Authentication failed for ${endpoint}.`
        );
      }

      // Store token and user ID
      setToken(data.token);
      setUser({ id: data.userId });
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      return data;
    } catch (error) {
      setToken(null);
      setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * @function logout
   * @description Clears token and user data.
   */
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    // Force reload/navigation to clear application state
    window.location.href = "/";
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token,
    login: (credentials) => authenticate("login", credentials),
    register: (credentials) => authenticate("register", credentials),
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
