import React from 'react';
import './Loader.css';

/**
 * @function Loader
 * @description Simple loading component for Suspense fallback.
 */
function Loader() {
  return (
    <div className="loader-overlay">
      <div className="spinner"></div>
      <p>Loading ShoppyGlobe Content...</p>
    </div>
  );
}

export default Loader;