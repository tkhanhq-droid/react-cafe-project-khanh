import "./Panel.css";

export default function Panel({ title, children }) {
  return (
    <div className="panel">
      <h3>{title}</h3>
      <div className="panel-content">{children}</div>
    </div>
  );
}
