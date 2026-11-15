import "./Cart.css";
import CartLine from "../CartLine/CartLine";
export default function Cart({ cart, onIncrease, onDecrease, onClear }) {
  return (
    <div className="cart">
      {cart.length === 0 ? (
        <p className="cart-empty">Your cart is empty</p>
      ) : (
        cart.map((item) => (
          <CartLine
            key={item.id}
            item={item}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
          />
        ))
      )}
      <button className="cart-clear" onClick={onClear}>
        Clear
      </button>
    </div>
  );
}
