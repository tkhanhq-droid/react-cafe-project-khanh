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

  const filteredItems = Menu.filter((item) =>
    category === "All" ? true : item.category === category,
  );

  const cartCount = cart.reduce(
    (total, product) => total + product.quantity,
    0,
  );

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
        <MenuList
          items={filteredItems}
          onAddToCart={handleAddToCart}
          onQuickAdd={handleQuickAdd}
        />

        <div className="right-panel">
          <Panel title="Your Cart">
            <Cart
              cart={cart}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
              onClear={handleClear}
            />
          </Panel>

          <Panel title="Order Summary">
            <OrderSummary subtotal={0} discount={0} total={0} />
          </Panel>

          <Panel title="Checkout">
            <CheckoutForm
              customer={{ name: "", phone: "", address: "" }}
              coupon=""
              status="idle"
              onCustomerChange={() => {}}
              onAddressChange={() => {}}
              onCouponChange={() => {}}
              onSubmit={(e) => e.preventDefault()}
            />
          </Panel>

          {false && (
            <Panel title="Success Message">
              <SuccessMessage />
            </Panel>
          )}

          <Panel title="Order History">
            <OrderHistory orders={[]} />
          </Panel>
        </div>
      </div>
    </div>
  );
}
