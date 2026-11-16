import "./CheckoutForm.css";

export default function CheckoutForm({
  customer,
  coupon,
  status,
  errors,
  canSubmit,
  onCustomerChange,
  onAddressChange,
  onCouponChange,
  onSubmit,
  validCoupon,
}) {
  return (
    <form className="checkout-form" onSubmit={onSubmit}>
      <div>
        <label htmlFor="customer-name">Customer name</label>
        <input
          id="customer-name"
          type="text"
          placeholder="Enter your name"
          value={customer.name}
          onChange={(e) => onCustomerChange("name", e.target.value)}
        />
        {errors.name && <p>{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="customer-phone">Phone number</label>
        <input
          id="customer-phone"
          type="text"
          placeholder="Enter your phone number"
          value={customer.phone}
          onChange={(e) => onCustomerChange("phone", e.target.value)}
        />
        {errors.phone && <p>{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="customer-street">Street</label>
        <input
          id="customer-street"
          type="text"
          placeholder="Enter street"
          value={customer.address.street}
          onChange={(e) => onAddressChange("street", e.target.value)}
        />
        {errors.street && <p>{errors.street}</p>}
      </div>

      <div>
        <label htmlFor="customer-city">City</label>
        <input
          id="customer-city"
          type="text"
          placeholder="Enter city"
          value={customer.address.city}
          onChange={(e) => onAddressChange("city", e.target.value)}
        />
        {errors.city && <p>{errors.city}</p>}
      </div>

      <div>
        <label htmlFor="customer-note">Note (optional)</label>
        <input
          id="customer-note"
          type="text"
          placeholder="Enter a note"
          value={customer.note}
          onChange={(e) => onCustomerChange("note", e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="customer-coupon">Coupon code</label>
        <input
          id="customer-coupon"
          type="text"
          placeholder="e.g. REACT10"
          value={coupon}
          onChange={(e) => onCouponChange(e.target.value)}
        />

        {coupon.trim() !== "" && (
          <p className={validCoupon ? "coupon-valid" : "coupon-invalid"}>
            {validCoupon
              ? "Coupon applied! You get 10% off."
              : "Invalid coupon code."}
          </p>
        )}
      </div>
      <button type="submit" disabled={!canSubmit || status === "sending"}>
        {status === "sending" ? "Placing order..." : "Place Order"}
      </button>
    </form>
  );
}
