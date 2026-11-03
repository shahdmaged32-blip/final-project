
import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const orderSlice = createSlice({
  name: "orderSlice",

  initialState: {
    orders: JSON.parse(localStorage.getItem("orders")) || [],
  },

  reducers: {
    addOrder: (state, action) => {
      const newOrder = {
        id: Date.now(),
        ...action.payload,
        status: "Pending",
        date: new Date().toISOString(),
      };

      state.orders.push(newOrder);

      localStorage.setItem(
        "orders",
        JSON.stringify(state.orders)
      );

      toast.success("Order Placed Successfully!");
    },

    updateOrderStatus: (state, action) => {
      const { id, status } = action.payload;

      const order = state.orders.find(
        (order) => order.id === id
      );

      if (order) {
        order.status = status;

        localStorage.setItem(
          "orders",
          JSON.stringify(state.orders)
        );
      }
    },

    clearOrders: (state) => {
      state.orders = [];
      localStorage.removeItem("orders");
    },
  },
});

export const {
  addOrder,
  updateOrderStatus,
  clearOrders,
} = orderSlice.actions;

export default orderSlice.reducer;
