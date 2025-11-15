import { forwardRef } from "react";
import style from "./Navbar.module.scss";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../Redux/Slice/authSlice";

export const UserMenu = forwardRef(({ isOpen, setmenuOpen }, ref) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  if (!isOpen) return null;
  const handleClick = (path) => {
    setmenuOpen(false);
    if (path) navigate(path);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setmenuOpen(false);
    navigate("/");
  };
  return (
    <div ref={ref} className={`${style.userMenu}`}>
      <ul>
        {user ? (
          <>
            <li onClick={() => handleClick("/userAccount")}>My Profile</li>
            <li onClick={() => handleClick("/order")}>Orders</li>
            <li onClick={() => handleClick("/userAccount")}>Add Products</li>
            <li onClick={() => handleClick("/")}>Logout</li>
          </>
        ) : (
          <>
            <li onClick={() => handleClick("/auth/login")}>Login</li>
          </>
        )}
      </ul>
    </div>
  );
});
