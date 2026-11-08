import "./MenuList.css";
import MenuItemCard from "../MenuItemCard/MenuItemCard";
export default function MenuList({ items, onAddToCart, onQuickAdd }) {
  return (
    <div className="menu-grid">
      {items.map((item) => (
        <MenuItemCard
          key={item.id}
          item={item}
          onAddToCart={onAddToCart}
          onQuickAdd={onQuickAdd}
        />
      ))}
    </div>
  );
}
