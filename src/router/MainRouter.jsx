import { Routes, Route } from "react-router";
import { lazy } from 'react';
const Home = lazy(() => import("../pages/Home/Home"));
const Products = lazy(() => import("../pages/Product/Products.jsx"));

const MainRouter = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/products" element={<Products />}/>
    </Routes>
  )
}

export default MainRouter