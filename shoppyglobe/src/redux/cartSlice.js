import { createSlice } from '@reduxjs/toolkit';

// Function to safely load state from localStorage
const loadState = () => {
  try {
    // FIX: Retrieve state from localStorage for persistence (Requirement: Data Persistence)
    const serializedState = localStorage.getItem('shoppyglobe_cart');
    if (serializedState === null) {
      return undefined; // Let Redux use its initial state
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load state from localStorage", err);
    return undefined;
  }
};

// Function to safely save state to localStorage
export const saveState = (state) => {
  try {
    // FIX: Save the entire cart state to localStorage
    const serializedState = JSON.stringify(state);
    localStorage.setItem('shoppyglobe_cart', serializedState);
  } catch (err) {
    console.error("Could not save state to localStorage", err);
  }
};

// Initial state, prioritized by persisted state if available
const initialState = loadState() || {
  items: [], // Array of cart items { id, title, price, quantity, ... }
};

/**
 * @slice cartSlice
 * @description Manages the state and logic for cart items.
 */
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Action to add an item to the cart or increment quantity
    addItem: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1; 
      } else {
        state.items.push({ 
          ...product, 
          quantity: 1 
        });
      }
    },

    // Action to remove an item entirely
    removeItem: (state, action) => {
      const idToRemove = action.payload;
      state.items = state.items.filter(item => item.id !== idToRemove);
    },

    // Action to update the quantity of an item
    updateQuantity: (state, action) => {
      const { id, newQuantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.id === id);

      if (itemToUpdate) {
        // Enforce the rule: quantity should not go below 1
        itemToUpdate.quantity = Math.max(1, newQuantity);
      }
    },

    // Action to clear the cart (used after successful checkout)
    clearCart: (state) => {
      state.items = [];
    },
  },
});

// Export all generated actions
export const { 
  addItem, 
  removeItem, 
  updateQuantity, 
  clearCart 
} = cartSlice.actions;

// Export selectors to read derived state
export const selectCartItems = (state) => state.cart.items;
export const selectCartItemCount = (state) => state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotal = (state) => 
  state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

export default cartSlice.reducer;