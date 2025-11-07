import style from "./Cart.module.scss";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router";
const Cart = () => {
    const { cartItems, updateQuantity, removeFromCart, totalPrice } = useCart();
  return (
    <div className={style.cartFullPage}>
      <div className={style.left}>
        <p className={style.pageName}>Shopping Bag</p>
        <div className={style.itemsList}>
          <div className={style.headers}>
            <p>Product</p>
            <p>Price</p>
            <p>QTY</p>
            <p>Total</p>
          </div>
          {cartItems.length === 0 ? (
            <p className={style.empty}>Your bag is empty 👜</p>
          ) : (
            cartItems.map(item => (
          <div className={style.item}>
            <div className={style.first1}>
              <img className={style.img} src={item.img} alt={item.name} />
              <p className={style.name}>{item.name}</p>
              <p className={style.type}>
                Color: <span>Gold</span>
              </p>
            </div>
            <div className={style.second1}>
              <p className={style.productPrice}>
                ₹ <span>{item.price}</span>
              </p>
            </div>
            <div className={style.quantityControl}>
              <i className={`ri-subtract-line ${style.subtIcon}`} onClick={() => updateQuantity(item.id, item.qty - 1)}></i>
              <p className={style.quantity}>{item.qty}</p>
              <i className={`ri-add-line ${style.addIcon}`} onClick={() => updateQuantity(item.id, item.qty + 1)}></i>
            </div>
            <p className={style.third1}>
              ₹ <span>{item.price * item.qty}</span>
            </p>
            <i
                  className={`ri-close-line ${style.removeIcon}`}
                  onClick={() => removeFromCart(item.id)}
                ></i>
          </div>
            ))
          )}
        </div>
      </div>
      <div className={style.right}>
        <div className={style.line}></div>
        <div className={style.beforeDetails}>
          <div className={style.totalCart}>
            <p className={style.textCart}>Cart total</p>
            <p className={style.prices}>
              ₹ <span>{totalPrice}</span>
            </p>
          </div>
          <p className={style.littleDesc1}>Shipping & taxes calculated at checkout</p>

          <div className={style.terms}>
            <input type="checkbox" />
            <p>
              I agree to <Link className={style.link}>Terms & Conditions</Link>
            </p>
          </div>

          <div className={style.checkout}>
            <p>Checkout</p>
            <i className={`ri-lock-2-line ${style.lockIcon}`}></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
