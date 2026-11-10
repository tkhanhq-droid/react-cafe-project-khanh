import "./CartLine.css";
export default function CartLine({ item, onIncrease, onDecrease }) {
  return (
    <div>
      <h4>{item.name}</h4>
      <h4>${(item.price * item.quantity).toFixed(2)}</h4>
      <p>${item.price.toFixed(2)}</p>
      <button onClick={() => onDecrease(item.id)}>-</button>
      <span>{item.quantity}</span>
      <button onClick={() => onIncrease(item.id)}>+</button>
    </div>
  );
}
