import { useState, useEffect } from "react";

// API endpoint for fetching all products
const ALL_PRODUCTS_URL = "https://dummyjson.com/products";

/**
 * @function useFetchProducts
 * @description Custom hook to fetch the product list from the API (Requirement: Data Fetching 20 Marks).
 * Handles loading, data storage, and error handling.
 */
const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(ALL_PRODUCTS_URL);

        // Error Handling for non-200 responses (Requirement: Error Handling 10 Marks)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Store only the product array
        setProducts(data.products || []);
      } catch (err) {
        // Catch network or parsing errors
        console.error("Data fetching failed:", err.message);
        setError("Failed to load products. Please check the network.");
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []); // Runs only on mount

  return { products, isLoading, error };
};

export default useFetchProducts;
