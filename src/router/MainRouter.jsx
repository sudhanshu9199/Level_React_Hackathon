import { Routes, Route } from "react-router";
import { lazy } from 'react';
import About from "../pages/About/About.jsx";
const Home = lazy(() => import("../pages/Home/Home"));
const Products = lazy(() => import("../pages/Product/Products.jsx"));
const ProductDetail = lazy(() => import("../pages/Product/ProductDetail/ProductDetail.jsx"));
const Cart = lazy(() => import("../pages/cart/Cart.jsx"));

const MainRouter = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/products" element={<Products />}/>
        <Route path="/product/:id" element={<ProductDetail />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/about" element={<About />}/>
    </Routes>
  )
}

export default MainRouter