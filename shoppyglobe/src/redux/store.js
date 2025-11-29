import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

/**
 * @store
 * Configures and exports the Redux store.
 */
export const store = configureStore({
  reducer: {
    // cart now manages only the local display state for the badge
    cart: cartReducer,
  },
});
