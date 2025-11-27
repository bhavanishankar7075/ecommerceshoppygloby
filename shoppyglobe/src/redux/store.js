import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { saveState } from "./cartSlice"; // Import saveState

// Custom middleware to save state to localStorage after every dispatch
const localStorageMiddleware = ({ getState }) => {
  return (next) => (action) => {
    const result = next(action);
    saveState(getState().cart); // Only save the cart slice
    return result;
  };
};

/**
 * @store
 * Configures and exports the Redux store.
 */
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  // Apply the custom middleware to ensure persistence
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});
