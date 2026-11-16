import "./CartLine.css";

export default function CartLine({ item, onIncrease, onDecrease }) {
  return (
    <div className="cart-line">
      <div className="cart-info">
        <h4>{item.name}</h4>
        <p>${item.price.toFixed(2)}</p>
      </div>

      <div className="cart-controls">
        <button onClick={() => onDecrease(item.id)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => onIncrease(item.id)}>+</button>
      </div>
    </div>
  );
}
