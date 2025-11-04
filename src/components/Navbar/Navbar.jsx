import style from "./Navbar.module.scss";
import { NavLink, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { useNavbarAnimation } from "./useNavbarAnimation";
const Navbar = () => {
  const { show } = useNavbarAnimation();
  const location = useLocation();

  const isProductPage = location.pathname === "/products";
  return (
    <motion.nav
      className={style.navbar}
      initial={{ y: 0 }}
      animate={{ y: show ? 0 : -100 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
    >
      <AnimatePresence>
        {isProductPage && (
          <motion.div
            className={style.searchbar}
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
          >
            <input type="text" placeholder="Search your items" />
            <i className={`ri-search-line ${style.searchIcon}`}></i>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className={style.logoWrapper}
        animate={{
          x: isProductPage ? 0 : 0,
          scale: isProductPage ? 0.9 : 1.1,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 12 }}
      >
        <NavLink to="/">
          <motion.p
            animate={{
              x: isProductPage ? 0 : 0,
              opacity: 1,
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className={style.mainLogo}
          >
            Palmonas
          </motion.p>
        </NavLink>
      </motion.div>

      <div
        className={`${style.usersRight} ${
          isProductPage ? style.equalSpacing : ""
        }`}
      >
        <NavLink to="/products">
          <p>Heirlooms</p>
        </NavLink>
        <i className={`ri-user-line ${style.userIcon}`}></i>
        <i className={`ri-shopping-bag-4-line ${style.bag}`}></i>
      </div>
    </motion.nav>
  );
};

export default Navbar;
