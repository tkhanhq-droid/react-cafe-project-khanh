import "./Header.css";
export default function Header() {
  return (
    <div className="wrap">
      <header>
        <div className="top">REACT PRATICE PROJECT</div>
        <h1>Bean & Leaf - Café Ordering App</h1>
        <p className="lead">
          Build a small café ordering app in React. You must use props,
          conditional rendering, list rendering, events, state, snapshots,
          queued updates, and immutable object and array updates.
        </p>
      </header>
    </div>
  );
}
