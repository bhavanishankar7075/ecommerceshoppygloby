import { useState, useEffect } from "react";

// API endpoint for fetching all products
const API_BASE_URL = "http://localhost:5000/api";
const ALL_PRODUCTS_URL = `${API_BASE_URL}/products`;

/**
 * @function useFetchProducts
 * @description Custom hook to fetch the product list from the new backend API.
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

        // Error Handling for non-200 responses
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success && Array.isArray(data.products)) {
          // Map backend fields (_id, name) to frontend expectations (id, title)
          const mappedProducts = data.products.map((p) => ({
            id: p._id,
            title: p.name,
            price: p.price,
            description: p.description,
            stock: p.stock,
            thumbnail: p.thumbnail,
            category: p.category,
          }));
          setProducts(mappedProducts);
        } else {
          throw new Error(
            data.message || "Invalid response format from server."
          );
        }
      } catch (err) {
        // Catch network or parsing errors
        console.error("Data fetching failed:", err.message);
        setError(
          "Failed to load products. Check if the Node.js server is running on port 5000."
        );
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, isLoading, error };
};

export default useFetchProducts;
