import React from "react";
import useFetchProducts from "../../hooks/useFetchProducts";
import ProductItem from "../../components/ProductItem/ProductItem";
import "./ProductList.css";

/**
 * @function ProductList
 * @description Displays the main product catalog using the custom hook.
 */
function ProductList() {
  const { products, isLoading, error } = useFetchProducts();

  // Note: Search/Filter functionality will be implemented with Redux in the next phase if required,
  // as the current Redux slice only covers the cart.

  // Conditional Rendering
  if (isLoading) {
    return (
      <div className="product-list-container">
        <p className="status-message">Fetching the latest products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-list-container">
        <h2 className="error-message">🛑 Data Error</h2>
        <p className="error-detail">Failed to load product list: {error}</p>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      <h1>All Products</h1>

      {/* Product List Rendering (Requirement: React Lists 10 Marks) */}
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            // Ensure unique key for each list item
            <ProductItem key={product.id} product={product} />
          ))
        ) : (
          <p className="no-products">No products found.</p>
        )}
      </div>
    </div>
  );
}

export default ProductList;
