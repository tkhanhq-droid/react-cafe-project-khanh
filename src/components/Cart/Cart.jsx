import "./Cart.css";
import CartLine from "../CartLine/CartLine";
export default function Cart({ cart, onIncrease, onDecrease, onClear }) {
  return (
    <>
      {cart.length === 0
        ? "Your cart is empty"
        : cart.map((item) => (
            <CartLine
              key={item.id}
              item={item}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
            />
          ))}
      <button onClick={onClear}>Clear</button>
    </>
  );
}
