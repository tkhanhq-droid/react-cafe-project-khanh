import "./OrderHistory.css";
export default function OrderHistory({ orders }) {
  return (
    <div className="order-history">
      <h3>Order History</h3>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div className="history-item" key={order.id}>
            <p>
              #{order.id} · {order.customer.name} ·{" "}
              {order.items.reduce((sum, item) => sum + item.quantity, 0)}{" "}
              item(s)
              {" · "}${order.total.toFixed(2)}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
