import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../features/productSlice";
import authSlice from "../features/authSlice";

export const store = configureStore({
  reducer: {
    product: productSlice,
    user: authSlice,
  },
});
