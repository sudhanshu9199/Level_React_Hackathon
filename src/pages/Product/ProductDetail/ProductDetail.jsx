import style from "./productDetail.module.scss";
import { useState } from "react";
import { productsData } from "../../../components/productsData.js";
import { useParams } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../Redux/cartSlice.js";

const ProductDetail = () => {
  const { id } = useParams();
  const product = productsData.find((p) => p.id === Number(id));

  const [activeMedia, setActiveMedia] = useState(0);
  const dispatch = useDispatch();

  if (!product) {
    return (
      <div className={style.productDetsContainer}>Product not found ❌</div>
    );
  }

  const mediaItems = [product.img, product.img2, product.vid1].filter(Boolean);

  const mediaVariants = {
    initial: { opacity: 0, scale: 0.96, y: 20 },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      y: -20,
      transition: { duration: 0.4, ease: "easeIn" },
    },
  };

  return (
    <div className={style.productDetsContainer}>
      <div className={style.left}>
        <div className={style.mainMedia}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMedia}
              variants={mediaVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className={style.motionWrapper}
            >
              {mediaItems[activeMedia].includes(".mp4") ? (
                <video
                  src={mediaItems[activeMedia]}
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls={false}
                  className={style.mediaDisplay}
                />
              ) : (
                <img
                  src={mediaItems[activeMedia]}
                  alt={product.name}
                  className={style.mediaDisplay}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={style.thumbnailRow}>
          {mediaItems.map((src, index) => (
            <div
              key={index}
              className={`${style.thumb} ${
                index === activeMedia ? style.activeThumb : ""
              }`}
              onClick={() => setActiveMedia(index)}
            >
              {src.includes(".mp4") ? (
                <video src={src} muted className={style.thumbnail} />
              ) : (
                <img
                  src={src}
                  alt={`thumb-${index}`}
                  className={style.thumbnail}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className={style.right}>
        <h2>{product.name}</h2>
        <p className={style.price}>₹ {product.price}</p>
        <p>
          ⭐ {product.rating} ({product.reviews} reviews)
        </p>
        <p className={style.desc}>
          {product.desc || "No description available."}
        </p>
        <button className={style.addToCart} onClick={() => dispatch(addToCart(product))}>
            <i className={`ri-shopping-bag-4-line ${style.bag}`}></i>
            <p>Add to Bag</p>
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
