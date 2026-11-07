import "./Header.css";
export default function Header({ cartCount }) {
  return (
    <header className="app-head">
      <div className="nameCafe">
        <h1 className="logo">☕ Bean & Leaf</h1>
        <p>order ahead, skip the line</p>
      </div>
      <div className="pill">🛒 Cart ({cartCount})</div>
    </header>
  );
}
