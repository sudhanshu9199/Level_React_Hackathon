import { configureStore } from "@reduxjs/toolkit";
import productReducer from './Slice/productSlice.js';
import cartReducer from "./Slice/cartSlice.js";
import authReducer from "./Slice/authSlice.js"

const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartReducer,
        auth: authReducer,
    },
});

export default store;