import Header from "./components/Header/Header";
import MenuFilters from "./components/MenuFilters/MenuFilters";
import { Menu } from "./data";
import MenuList from "./components/MenuList/MenuList";
import { useState } from "react";
export default function App() {
  const categories = ["All", "Coffee", "Tea", "Bakery"];
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const filteredItems = Menu.filter((item) =>
    category === "All" ? true : item.category === category,
  );
  return (
    <>
      <Header cartCount={0} />
      <MenuFilters
        categories={categories}
        activeCategory={category}
        search={search}
        sort={sort}
        onCategoryChange={setCategory}
        onSearchChange={setSearch}
        onSortChange={setSort}
      />
      <MenuList
        items={filteredItems}
        onAddToCart={() => {}}
        onQuickAdd={() => {}}
      />
    </>
  );
}
