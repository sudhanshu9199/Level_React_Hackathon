import style from "./Products.module.scss";
import { Link } from "react-router";
import InfiniteScroll from "react-infinite-scroll-component";

const Products = () => {
  return (
    <div className={style.productFullPage}>
      <section className={style.section1}>
        <div className={style.itemsCard}>
          <div className={style.img}>
            <Link to={`/`}>
            <img
              src="https://palmonas.com/cdn/shop/files/RG0065-6.jpg?v=1762003558"
              alt=""
            /></Link>
            
          </div>
          <div className={style.productDetails}>
            <p className={style.productName}>Sleek Edge Golden Band Ring</p>
            <p className={style.price}>
              ₹ <span>1539.30</span>
            </p>
            <div className={style.rating}>
              <i className={`ri-star-s-fill ${style.star}`}></i>
              <i className={`ri-star-s-fill ${style.star}`}></i>
              <i className={`ri-star-s-fill ${style.star}`}></i>
              <i className={`ri-star-s-fill ${style.star}`}></i>
              <i className={`ri-star-s-fill ${style.star}`}></i>
              <p className="rateNo">
                (<span>3</span>)
              </p>
            </div>
          </div>
        </div>
        <div className={style.itemsCard}>
          <div className={style.img}>
            <img
              src="https://palmonas.com/cdn/shop/files/RG0077.webp?v=1761139258&width=900"
              alt=""
            />
          </div>
          <div className={style.productDetails}>
            <p className={style.productName}>Aurelia Angel Wing Ring</p>
            <p className={style.price}>
              ₹ <span>1539.30</span>
            </p>
            <div className={style.rating}>
              <i className={`ri-star-s-fill ${style.star}`}></i>
              <i className={`ri-star-s-fill ${style.star}`}></i>
              <i className={`ri-star-s-fill ${style.star}`}></i>
              <i className={`ri-star-s-fill ${style.star}`}></i>
              <i className={`ri-star-s-fill ${style.star}`}></i>
              <p className="rateNo">
                (<span>1</span>)
              </p>
            </div>
          </div>
        </div>
        <div className={style.itemsCard}></div>
        <div className={style.itemsCard}></div>
        <div className={style.itemsCard}></div>
        <div className={style.itemsCard}></div>
        <div className={style.itemsCard}></div>
        <div className={style.itemsCard}></div>
        <div className={style.itemsCard}></div>
        <div className={style.itemsCard}></div>
        <div className={style.itemsCard}></div>
        <div className={style.itemsCard}></div>
        <div className={style.itemsCard}></div>
        <div className={style.itemsCard}></div>
      </section>
    </div>
  );
};

export default Products;
