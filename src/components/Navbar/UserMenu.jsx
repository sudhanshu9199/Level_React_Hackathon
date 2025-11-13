import { forwardRef } from "react";
import style from './Navbar.module.scss';

export const UserMenu = forwardRef(({ isOpen }, ref) => {
    return (
        <div ref={ref} className={`${style.userMenu}`}>
      <ul>
        <li>My Profile</li>
        <li>Orders</li>
        <li>Wishlist</li>
        <li>Logout</li>
      </ul>
    </div>
    )
})