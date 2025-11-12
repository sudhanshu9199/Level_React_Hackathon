import { createSlice } from "@reduxjs/toolkit";
import { productsData } from "../components/productsData.js";

const initialState = {
  allProducts: productsData,
  everydayProducts: productsData.filter(
    (item) => item.catogery && item.catogery.toLowerCase() === "everyday"
  ),
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    filterByCategory: (state, action) => {
      state.everydayProducts = state.allProducts.filter(
        (item) => item.catogery.toLowerCase() === action.payload.toLowerCase()
      );
    },
  },
});

export const { filterByCategory } = productSlice.actions;
export default productSlice.reducer;