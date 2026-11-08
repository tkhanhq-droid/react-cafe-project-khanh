import "./MenuItemCard.css";
import { useState } from "react";
export default function MenuItemCard({ item, onAddToCart, onQuickAdd }) {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <div className="menu-card" onClick={() => setShowDetails((prev) => !prev)}>
      <div className={`item-emoji ${item.category.toLowerCase()}`}>
        {item.emoji}
      </div>
      <h4 className="item-name">{item.name}</h4>
      {item.popular && <span className="badge-popular"> Popular </span>}
      {item.soldOut && <span className="badge-soldOut"> Sold Out </span>}
      <p className="item-info">
        ${item.price.toFixed(2)} · {item.category}
      </p>
      <p className="details">
        {showDetails ? item.description : "Tap Card for details"}
      </p>
      <button
        className="btn-add"
        onClick={(e) => {
          e.stopPropagation();
          onAddToCart(item);
        }}
        disabled={item.soldOut}
      >
        Add
      </button>
      <button
        className="btn-quickAdd"
        onClick={(e) => {
          e.stopPropagation();
          onQuickAdd(item);
        }}
        disabled={item.soldOut}
      >
        +2
      </button>
    </div>
  );
}
