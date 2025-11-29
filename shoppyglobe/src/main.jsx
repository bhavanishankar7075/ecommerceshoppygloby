import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App.jsx";
import { AuthProvider } from "./hooks/useAuth";
import { ToastProvider } from "./hooks/useToast"; // FIX: Import Toast Provider
import "./hooks/Toast.css"; // FIX: Import Toast CSS
import "./index.css";

// Define the router here using lazy loading for all route components
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        lazy: async () => {
          const { default: ProductList } = await import(
            "./pages/ProductList/ProductList.jsx"
          );
          return { element: <ProductList /> };
        },
      },
      {
        path: "product/:productId",
        lazy: async () => {
          const { default: ProductDetail } = await import(
            "./pages/ProductDetail/ProductDetail.jsx"
          );
          return { element: <ProductDetail /> };
        },
      },
      {
        path: "cart",
        lazy: async () => {
          const { default: Cart } = await import("./pages/Cart/Cart.jsx");
          return { element: <Cart /> };
        },
      },
      {
        path: "checkout",
        lazy: async () => {
          const { default: Checkout } = await import(
            "./pages/Checkout/Checkout.jsx"
          );
          return { element: <Checkout /> };
        },
      },
      // Authentication Routes
      {
        path: "login",
        lazy: async () => {
          const { default: Login } = await import("./pages/Auth/Login.jsx");
          return { element: <Login /> };
        },
      },
      {
        path: "register",
        lazy: async () => {
          const { default: Register } = await import(
            "./pages/Auth/Register.jsx"
          );
          return { element: <Register /> };
        },
      },
      // Catch-all route for 404
      {
        path: "*",
        lazy: async () => {
          const { default: NotFound } = await import(
            "./pages/NotFound/NotFound.jsx"
          );
          return { element: <NotFound /> };
        },
      },
    ],
  },
]);

// FIX: Wrap application with ToastProvider inside AuthProvider
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
