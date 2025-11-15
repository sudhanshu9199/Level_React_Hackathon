import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        existing.qty += 1;
        toast.info(`${action.payload.name} quantity updated 🛍️`);
      } else {
        state.items.push({ ...action.payload, qty: 1 });
        toast.success(`${action.payload.name} added to your bag 🎉`);
      }
    },
    removeFromCart: (state, action) => {
        state.items = state.items.filter((i) => i.id !== action.payload);
  toast.warn(`Item removed from your bag ❌`);
    },
    updateQuantity: (state, action) => {
        const { id, qty } = action.payload;
        const item = state.items.find(i => i.id === id);
        if (item) item.qty = Math.max(qty, 1);
    },
    clearCart: (state) => {
        state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
