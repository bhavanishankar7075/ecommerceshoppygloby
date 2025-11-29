import { createSlice } from "@reduxjs/toolkit";

// Since the cart state is now managed by MongoDB, this slice only serves as a dummy placeholder
// for calculating the total count of items for the Header badge using local storage.
const initialState = {
  items: JSON.parse(
    localStorage.getItem("shoppyglobe_local_cart_items") || "[]"
  ),
};

const saveLocalCartItems = (items) => {
  localStorage.setItem("shoppyglobe_local_cart_items", JSON.stringify(items));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // This action is now triggered *after* a successful API operation to update the local count display.
    updateLocalCart: (state, action) => {
      state.items = action.payload; // Payload is the new remote cart items array
      saveLocalCartItems(state.items);
    },
    clearLocalCart: (state) => {
      state.items = [];
      saveLocalCartItems([]);
    },
  },
});

// Export all generated actions
export const { updateLocalCart, clearLocalCart } = cartSlice.actions;

// Export selectors to read derived state
export const selectCartItems = (state) => state.cart.items;
export const selectCartItemCount = (state) =>
  state.cart.items.reduce((total, item) => total + (item.quantity || 1), 0);

export default cartSlice.reducer;
