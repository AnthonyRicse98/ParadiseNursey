import { createSlice } from "@reduxjs/toolkit";

const CART_STORAGE_KEY = "paradise_nursery_cart";

const loadInitialState = () => {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    return [];
  }
};

const initialState = {
  items: loadInitialState(),
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const product = action.payload;
      const existing = state.items.find((item) => item.id === product.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          ...product,
          price: Number(product.price) || 0,
          quantity: 1,
        });
      }
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    },

    removeItem: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    },

    updateQuantity: (state, action) => {
      const { id, delta } = action.payload;
      const item = state.items.find((i) => i.id === id);

      if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
          state.items = state.items.filter((i) => i.id !== id);
        }
      }
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem(CART_STORAGE_KEY);
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;