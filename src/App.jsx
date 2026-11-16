import "./App.css";
import Header from "./components/Header/Header";
import MenuFilters from "./components/MenuFilters/MenuFilters";
import Panel from "./components/Panel/Panel";
import OrderHistory from "./components/OrderHistory/OrderHistory";
import CheckoutForm from "./components/CheckoutForm/CheckoutForm";
import OrderSummary from "./components/OrderSummary/OrderSummary";
import SuccessMessage from "./components/SuccessMessage/SuccessMessage";
import Cart from "./components/Cart/Cart";
import { Menu } from "./data";
import MenuList from "./components/MenuList/MenuList";
import { useState } from "react";

export default function App() {
  const categories = ["All", "Coffee", "Tea", "Bakery"];

  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [cart, setCart] = useState([]);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    note: "",
    address: {
      street: "",
      city: "",
    },
  });

  const [coupon, setCoupon] = useState("");
  const [status, setStatus] = useState("idle");
  const [orders, setOrders] = useState([]);
  const [lastOrder, setLastOrder] = useState(null);
  const [showErrors, setShowErrors] = useState(false);

  const filteredItems = Menu.filter((item) => {
    const matchCategory = category === "All" || item.category === category;

    const matchSearch = item.name //Cappuchino
      .toLowerCase() //cappuchino.includes("ca")
      .includes(search.trim().toLowerCase()); //ca

    return matchCategory && matchSearch;
  });

  const sortedItems = filteredItems;

  if (sort === "low") {
    sortedItems.sort((a, b) => a.price - b.price);
  } else if (sort === "high") {
    sortedItems.sort((a, b) => b.price - a.price);
  }

  const cartCount = cart.reduce(
    (total, product) => total + product.quantity,
    0,
  );

  const subtotal = cart.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0,
  );

  const validCoupon = coupon.trim().toUpperCase() === "REACT10";

  const discount = validCoupon ? subtotal * 0.1 : 0;

  const total = subtotal - discount;

  function handleAddToCart(item) {
    setCart((prevCart) => {
      const exists = prevCart.some((product) => product.id === item.id);

      if (exists) {
        const updateCart = prevCart.map((product) =>
          product.id === item.id
            ? { ...product, quantity: product.quantity + 1 }
            : product,
        );
        return updateCart;
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  }

  function handleQuickAdd(item) {
    handleAddToCart(item);
    handleAddToCart(item);
  }

  function handleIncrease(id) {
    setCart((prevCart) => {
      const updateQuantity = prevCart.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product,
      );
      return updateQuantity;
    });
  }

  function handleDecrease(id) {
    setCart((prevCart) => {
      const updateQuantity = prevCart.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity - 1 }
          : product,
      );

      const remainingCart = updateQuantity.filter(
        (product) => product.quantity > 0,
      );

      return remainingCart;
    });
  }

  function handleClear() {
    setCart([]);
  }

  function handleCustomerChange(field, value) {
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [field]: value,
    }));
  }

  function handleAddressChange(field, value) {
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      address: {
        ...prevCustomer.address,
        [field]: value,
      },
    }));
  }

  const errors = {};

  if (!customer.name.trim()) {
    errors.name = "Name is required";
  }

  if (!/^\d{9,11}$/.test(customer.phone.trim())) {
    errors.phone = "Phone must be 9-11 digits";
  }

  if (!customer.address.street.trim()) {
    errors.street = "Street is required";
  }

  if (!customer.address.city.trim()) {
    errors.city = "City is required";
  }

  function handleSubmit(e) {
    e.preventDefault();
    setShowErrors(true);

    if (status !== "idle" || cart.length === 0) {
      return;
    }

    if (Object.keys(errors).length > 0) {
      return;
    }

    const newOrder = {
      id: orders.length + 1,
      customer: {
        ...customer,
        address: { ...customer.address },
      },
      items: cart.map((item) => ({ ...item })),
      total: total,
      time: new Date().toLocaleTimeString(),
    };

    setStatus("sending");

    setTimeout(() => {
      setOrders((prevOrders) => [newOrder, ...prevOrders]);
      setLastOrder(newOrder);
      setCart([]);
      setStatus("done");
    }, 2000);
  }

  function handleNewOrder() {
    setCustomer({
      name: "",
      phone: "",
      note: "",
      address: {
        street: "",
        city: "",
      },
    });

    setCoupon("");
    setLastOrder(null);
    setShowErrors(false);
    setStatus("idle");
  }

  return (
    <div>
      <Header cartCount={cartCount} />

      <MenuFilters
        categories={categories}
        activeCategory={category}
        search={search}
        sort={sort}
        onCategoryChange={setCategory}
        onSearchChange={setSearch}
        onSortChange={setSort}
      />

      <div className="main-layout">
        <div>
          {sortedItems.length === 0 ? (
            <p>No drinks match your search</p>
          ) : (
            <MenuList
              items={sortedItems}
              onAddToCart={handleAddToCart}
              onQuickAdd={handleQuickAdd}
            />
          )}
        </div>

        <div className="right-panel">
          <Panel title="Your Cart">
            <Cart
              cart={cart}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
              onClear={handleClear}
            />
            <OrderSummary
              subtotal={subtotal}
              discount={discount}
              total={total}
            />
          </Panel>
          <Panel title="Checkout">
            {status === "idle" && (
              <CheckoutForm
                customer={customer}
                coupon={coupon}
                status={status}
                errors={showErrors ? errors : {}}
                canSubmit={cart.length > 0}
                onCustomerChange={handleCustomerChange}
                onAddressChange={handleAddressChange}
                onCouponChange={setCoupon}
                onSubmit={handleSubmit}
              />
            )}

            {status === "sending" && <p>Placing your order...</p>}

            {status === "done" && lastOrder && (
              <SuccessMessage order={lastOrder} onNewOrder={handleNewOrder} />
            )}
          </Panel>

          <Panel title="Order History">
            <OrderHistory orders={orders} />
          </Panel>
        </div>
      </div>
    </div>
  );
}
