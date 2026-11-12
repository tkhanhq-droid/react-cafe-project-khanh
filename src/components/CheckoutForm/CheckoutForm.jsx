import "./CheckoutForm.css";
export default function CheckoutForm({
  customer,
  coupon,
  status,
  onCustomerChange,
  onAddressChange,
  onCouponChange,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label id="customer-name">Customer name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={customer.name}
          onChange={(e) => onCustomerChange("name", e.target.value)}
        />
      </div>
      <div>
        <label id="customer-phone">Phone number</label>
        <input
          type="text"
          placeholder="Enter your phone number"
          value={customer.phone}
          onChange={(e) => onCustomerChange("phone", e.target.value)}
        />
      </div>
      <div>
        <label id="customer-address">Address</label>
        <input
          type="text"
          placeholder="Enter delivery address"
          value={customer.address}
          onChange={(e) => onAddressChange(e.target.value)}
        />
      </div>
      <div id="customer-coupon">
        <label>Coupon code</label>
        <input
          type="text"
          placeholder="e.g REACT10"
          value={coupon}
          onChange={(e) => onCouponChange(e.target.value)}
        />
      </div>
      <button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Placing order..." : "Place Order"}
      </button>
    </form>
  );
}
