import style from "./Navbar.module.scss";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { useNavbarAnimation } from "./useNavbarAnimation";
import { useSearch } from "../../context/SearchContext";
import { useEffect, useRef } from "react";

const RollingText = ({ text }) => {
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    el.addEventListener("mouseover", () => el.classList.remove(style.play));
    return () => el.removeEventListener("mouseover", () => el.classList.remove(style.play));
  }, []);

  const letters = text.split("").map((letter, i) => (
    <span
      key={i}
      className={style.letter}
      style={{ transitionDelay: `${i * 0.015}s` }}
    >
      {letter === " " ? "\u00A0" : letter}
    </span>
  ));

  return (
    <div ref={textRef} className={`${style.textRoll} ${style.play}`}>
      <div className={style.block}>{letters}</div>
      <div className={style.block}>{letters}</div>
    </div>
  );
};

const Navbar = () => {
  const { show } = useNavbarAnimation();
  const location = useLocation();
  const { setsearchTerm } = useSearch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

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
            <input
              type="text"
              placeholder="Search your items"
              onChange={(e) => setsearchTerm(e.target.value)}
            />
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
            className={`${style.mainLogo}`}
          >
            <RollingText text="Palmonas" />
          </motion.p>
        </NavLink>
      </motion.div>

      <div
        className={`${style.usersRight} ${
          isProductPage ? style.equalSpacing : ""
        }`}
      >
        <NavLink to="/products">
          <p
            className={`rolling-text play ${style.textRoll}`}
          >
            <RollingText text="Heirlooms" />
          </p>
        </NavLink>
        <i className={`ri-user-line ${style.userIcon}`}></i>
        <NavLink to="/cart" className={style.cartIconWrapper}>
          <i className={`ri-shopping-bag-4-line ${style.bag}`}></i>
          {totalItems > 0 && <span className={style.cartCount}>{totalItems}</span>}
        </NavLink>
      </div>
    </motion.nav>
  );
};

export default Navbar;
