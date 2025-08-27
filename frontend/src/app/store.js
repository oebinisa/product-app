// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";
import authReducer from "../features/auth/authSlice";

// Create the Redux store
export const store = configureStore({
  reducer: {
    products: productReducer, // Register products slice
    auth: authReducer,
  },
});

export default store;
