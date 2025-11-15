import style from "./Products.module.scss";
import { Link } from "react-router";
import InfiniteScroll from "react-infinite-scroll-component";
import { productsData } from "../../components/productsData.js";
import { useEffect, useRef, useState } from "react";
import { useSearch } from "../../context/SearchContext";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/Slice/cartSlice.js";
// anime
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(useGSAP, ScrollTrigger, CustomEase);

const Products = () => {
  const { searchTerm } = useSearch();
  const [visibleProducts, setvisibleProducts] = useState(
    productsData.slice(0, 7)
  );

  const filteredProducts = visibleProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const dispatch = useDispatch();
  const containerRef = useRef(null);

  const fetchMoreData = () => {
    setTimeout(() => {
      setvisibleProducts((prev) => [
        ...prev,
        ...productsData.slice(prev.length, prev.length + 3),
      ]);
    }, 900);
  };

  useGSAP(() => {
    const cards = gsap.utils.toArray(`.${style.itemsCard}`);
    gsap.set(cards, { opacity: 0, y: 50, scale: 0.96 });

    const t1 = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        once: true,
      },
    });

    t1.to(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.2,
      stagger: 0.15,
      ease: CustomEase.create("custom", "M0,0 C0.12,0.54,0.22,1,1,1"),
      clearProps: "all", // ✅ clears inline styles after animation for stable layout
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className={style.productFullPage}>
      <InfiniteScroll
        dataLength={visibleProducts.length}
        next={fetchMoreData}
        hasMore={visibleProducts.length < productsData.length}
        loader={<h4 className={style.loadingText}>Loading more products...</h4>}
        endMessage={
          <p className={style.endText}>✨ You’ve seen all our beauties!</p>
        }
      >
        <section className={style.section1}>
          {(filteredProducts.length > 0
            ? filteredProducts
            : visibleProducts
          ).map((product) => (
            <div key={product.id} className={style.itemsCard}>
              <div className={style.img}>
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.img}
                    alt={product.name}
                    loading="lazy"
                    className={style.mainImg}
                  />
                  {product.img2 && (
                    <img
                      src={product.img2}
                      alt={`${product.name} alternate`}
                      loading="lazy"
                      className={style.hoverImg}
                    />
                  )}
                </Link>
                <p className={style.addToBagBtn} onClick={() => dispatch(addToCart(product))}>ADD TO BAG</p>
              </div>
              <div className={style.productDetails}>
                <p className={style.productName}>{product.name}</p>
                <p className={style.price}>
                  ₹ <span>{product.price}</span>
                </p>
                <div className={style.rating}>
                  {Array.from({ length: product.rating }).map((_, i) => (
                    <i key={i} className={`ri-star-s-fill ${style.star}`}></i>
                  ))}
                  <p className="rateNo">
                    (<span>{product.reviews}</span>)
                  </p>
                </div>
              </div>
            </div>
          ))}
        </section>
      </InfiniteScroll>
    </div>
  );
};

export default Products;
