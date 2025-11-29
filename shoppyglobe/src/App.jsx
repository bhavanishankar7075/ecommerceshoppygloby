import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Loader from "./components/Loader/Loader";
import "./App.css";

/**
 * @function App
 * @description The main layout component. Renders the Header and uses Outlet
 * within Suspense to render lazy-loaded page components.
 */
function App() {
  return (
    <div className="app-container">
      {/* Header component is rendered outside the app-content constraint */}
      <Header />

      {/* Main content wrapper */}
      <main className="app-content">
        <Suspense fallback={<Loader />}>
          {/* Outlet renders the current route's page component */}
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
