import "./OrderSummary.css";
export default function OrderSummary({ subtotal, discount, total }) {
  return (
    <div className="order-summary">
      <div className="summary-row">
        <p>Subtotal</p>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="summary-row">
        <p>Discount</p>
        <span>-${discount.toFixed(2)}</span>
      </div>
      <div className="summary-row total-row">
        <h4>Total</h4>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
}
