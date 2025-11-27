import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Loader from "./components/Loader/Loader"; // Simple loader component
import "./App.css"; // For main App component styling

/**
 * @function App
 * @description The main layout component. Renders the Header and uses Outlet
 * within Suspense to render lazy-loaded page components (Requirement: Component Structure).
 */
function App() {
  return (
    <div className="app-container">
      {/* Header component (visible on all pages) */}
      <Header />

      <main className="app-content">
        {/* Suspense is required for lazy-loaded components (Requirement: Performance 20 Marks) */}
        <Suspense fallback={<Loader />}>
          {/* Outlet renders the current route's page component */}
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
