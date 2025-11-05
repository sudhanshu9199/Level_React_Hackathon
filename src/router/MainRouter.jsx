import { Routes, Route } from "react-router";
import { lazy } from 'react';
import ProductDetail from "../pages/Product/ProductDetail/ProductDetail.jsx";
const Home = lazy(() => import("../pages/Home/Home"));
const Products = lazy(() => import("../pages/Product/Products.jsx"));

const MainRouter = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/products" element={<Products />}/>
        <Route path="/productDetails" element={<ProductDetail />}/>
    </Routes>
  )
}

export default MainRouter