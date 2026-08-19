import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice"; // Asegúrate de que el nombre coincida (cartSlice.js o CartSlice.js)

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});