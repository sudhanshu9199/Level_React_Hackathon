import style from "./Home.module.scss";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/cartSlice.js";
import { motion } from "motion/react";
import { useState } from "react";
import { useSelector } from 'react-redux';
import roseGoldSampleImage from "../../assets/Model_Images/roseGoldSample.jpg";
import solidGoldSampleImage from "../../assets/Model_Images/solidGoldSample.jpg";

const EverydayProduct = () => {
  const EveryDayProducts = useSelector(state => state.products.everydayProducts);
  const dispatch = useDispatch();
  const [hoveredId, setHoveredId] = useState(null);
  const [view1CurrentIndex, setview1CurrentIndex] = useState(0);

  const handleLeftClick = () => {
    if (view1CurrentIndex > 0) setview1CurrentIndex((prev) => prev - 1);
  };
  const handleRightClick = () => {
    if (view1CurrentIndex < EveryDayProducts.length - 4)
      setview1CurrentIndex((prev) => prev + 1);
  };
  return (
    <div className={style.withItems}>
      <div
        className={`${style.leftNav} ${
          view1CurrentIndex === 0 ? style.disabled : ""
        }`}
        onClick={handleLeftClick}
      >
        <i className="ri-arrow-left-s-line"></i>
      </div>
      <div className={style.itemsOuterLayer}>
        <motion.div
          className={style.items}
          animate={{
            x: `-${
              view1CurrentIndex *
              (document.querySelector(`.${style.itemCard}`)?.offsetWidth + 16)
            }px`,
          }}
          // smooth motion scroll
          transition={{
            duration: 0.7,
            ease: [0.45, 0.05, 0.55, 0.95],
          }}
        >
          {EveryDayProducts.map((item) => (
            <motion.div
              key={item.id}
              className={style.itemCard}
              onHoverStart={() => setHoveredId(item.id)} // ✅ set hovered card id
              onHoverEnd={() => setHoveredId(null)}
            >
              <motion.img
                className={style.productImage}
                src={item.img}
                alt=""
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
              <div className={style.productDetails}>
                <div className={style.goldOps}>
                  <img
                    src={roseGoldSampleImage}
                    alt=""
                    className={style.sample}
                  />
                  <img
                    src={solidGoldSampleImage}
                    alt=""
                    className={style.sample}
                  />
                </div>
                <p className={style.productName}>{item.name}</p>
                <p className={style.productPrice}>
                  ₹ <span>{item.price}</span>
                </p>
                <motion.div
                  className={style.addToBag}
                  animate={{
                    opacity: hoveredId === item.id ? 1 : 0,
                    y: hoveredId === item.id ? 0 : 30,
                    pointerEvents: hoveredId === item.id ? "auto" : "none",
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.25, 0.1, 0.36, 1],
                  }}
                  onClick={() => dispatch(addToCart(item))}
                >
                  <i className={`ri-shopping-bag-4-line ${style.bag}`}></i>
                  <p>Add to Bag</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div
        className={`${style.rightNav} ${
          view1CurrentIndex >= EveryDayProducts.length - 4 ? style.disabled : ""
        }`}
        onClick={handleRightClick}
      >
        <i className="ri-arrow-right-s-line"></i>
      </div>
    </div>
  );
};

export default EverydayProduct;
