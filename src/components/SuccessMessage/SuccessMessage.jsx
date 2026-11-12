import "./SuccessMessage.css";
export default function SuccessMessage({ order, onNewOrder }) {
  return (
    <div>
      <h3>Order placed successfully!</h3>
      <p>Order Id: #{order.id}</p>
      <p>Total: ${order.total.toFixed(2)}</p>
      <button onClick={onNewOrder}>New Order</button>
    </div>
  );
}
