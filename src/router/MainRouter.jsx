import { Routes, Route } from "react-router";
import { lazy } from "react";
import Register from "../Auth/Register/Register.jsx";
import Login from "../Auth/Login/Login.jsx";
const Home = lazy(() => import("../pages/Home/Home"));
const Products = lazy(() => import("../pages/Product/Products.jsx"));
const ProductDetail = lazy(() =>
  import("../pages/Product/ProductDetail/ProductDetail.jsx")
);
const Cart = lazy(() => import("../pages/cart/Cart.jsx"));
const About = lazy(() => import("../pages/About/About.jsx"));
const Profile = lazy(() => import("../pages/users/Profie/Profile.jsx"));

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/about" element={<About />} />
      <Route path="/userAccount" element={<Profile />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/login" element={<Login />} />
    </Routes>
  );
};

export default MainRouter;
