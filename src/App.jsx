import Header from "./components/Header/Header";
import MenuFilters from "./components/MenuFilters/MenuFilters";
export default function App() {
  const categories = ["All", "Coffee", "Tea", "Bakery"];
  return (
    <>
      <Header cartCount={0} />
      <MenuFilters
        categories={categories}
        activeCategory="All"
        search=""
        sort="default"
        onCategoryChange={() => {}}
        onSearchChange={() => {}}
        onSortChange={() => {}}
      />
    </>
  );
}
