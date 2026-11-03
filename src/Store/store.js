
import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./Slices/cartSlice";
import orderReducer from "./Slices/orderSlice";

export const store = configureStore({
  reducer: {
    cartSlice: cartReducer,
    orderSlice: orderReducer,
  },
});
