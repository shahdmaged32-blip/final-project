import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

const cartSlice = createSlice({
  name: 'cartSlice',

  initialState: {
    items: JSON.parse(localStorage.getItem('cart')) || []
  },

  reducers: {
    addItemToCart: (state, action) => {
  const product = action.payload;

  if (!product.stock || product.stock <= 0) {
    toast.error("Out Of Stock");
    return;
  }

  const item = state.items.find(
    (item) => item.id === product.id
  );

  if (item) {
    if (item.quantity >= product.stock) {
      toast.error("Maximum Stock Reached");
      return;
    }

    item.quantity++;
  } else {
    state.items.push({
      ...product,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(state.items));
  toast.success("Product Added Successfully");
},

    removeItemFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id)

      localStorage.setItem('cart', JSON.stringify(state.items))
      toast.success('Product Removed')
    },

    clearCart: state => {
      state.items = []

      localStorage.removeItem('cart')
    },

   increaseQuantity: (state, action) => {
  const item = state.items.find(
    (item) => item.id === action.payload.id
  );

  if (!item) return;

  if (!item.stock || item.quantity >= item.stock) {
    toast.error("Maximum Stock Reached");
    return;
  }

  item.quantity++;

  localStorage.setItem(
    "cart",
    JSON.stringify(state.items)
  );
},

    decreaseQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload.id)

      if (!item || item.quantity <= 1) return

      item.quantity--

      localStorage.setItem('cart', JSON.stringify(state.items))
    }
  }
})

export const {
  addItemToCart,
  removeItemFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity
} = cartSlice.actions

export default cartSlice.reducer
