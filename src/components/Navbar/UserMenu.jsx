import { forwardRef } from "react";
import style from "./Navbar.module.scss";
import { useNavigate } from "react-router";

export const UserMenu = forwardRef(({ isOpen, setmenuOpen }, ref) => {
  const navigate = useNavigate();
  if (!isOpen) return null;
  const handleClick = (path) => {
    setmenuOpen(false);
    if (path) navigate(path);
  };
  return (
    <div ref={ref} className={`${style.userMenu}`}>
      <ul>
        <li onClick={() => handleClick("/userAccount")}>My Profile</li>
        <li onClick={() => handleClick("/order")}>Orders</li>
        <li onClick={() => handleClick("/userAccount")}>Add Products</li>
        <li onClick={() => handleClick("/userAccount")}>Logout</li>
      </ul>
    </div>
  );
});
