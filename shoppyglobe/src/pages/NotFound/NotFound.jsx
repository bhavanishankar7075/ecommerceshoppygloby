import React from 'react';
import { useRouteError, Link } from 'react-router-dom'; 
import './NotFound.css';

/**
 * @function NotFound
 * @description Displays the 404 page with detailed error information (Requirement: NotFound).
 */
function NotFound() {
  // Hook to get detailed error information from the route
  const error = useRouteError(); 
  
  // Prepare error details for display
  const statusText = error?.statusText || 'Not Found';
  const message = error?.message || 'The requested URL was not found.';
  const status = error?.status || 404;

  return (
    <div className="not-found-container">
      <div className="error-box">
        <h1 className="status-code">{status}</h1>
        <h2>Oops! {statusText}</h2>
        <p className="description">
          We can't seem to find the page you're looking for.
        </p>
        
        {/* Display proper error details on the UI (Requirement: NotFound) */}
        <div className="error-details-box">
          <h3>Error Details:</h3>
          <p className="detail-line">
            <strong>Status:</strong> {status}
          </p>
          <p className="detail-line">
            <strong>Message:</strong> {message}
          </p>
        </div>

        <Link to="/" className="home-link-button">
          Go to Home Page
        </Link>
      </div>
    </div>
  );
}

export default NotFound;