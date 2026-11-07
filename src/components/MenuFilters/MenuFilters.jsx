import "./MenuFilters.css";
export default function MenuFilters({
  categories,
  activeCategory,
  search,
  sort,
  onCategoryChange,
  onSearchChange,
  onSortChange,
}) {
  const sortOption = [
    { value: "default", label: "Sort: default" },
    { value: "low", label: "Price: low to high" },
    { value: "high", label: "Price: high to low" },
  ];
  return (
    <div className="btn-select">
      {categories.map((category) => (
        <button
          key={category}
          className={activeCategory === category ? "cat on" : "cat"}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
      <input
        className="search"
        placeholder="Search menu..."
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <select
        className="select"
        name=""
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
      >
        {sortOption.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
