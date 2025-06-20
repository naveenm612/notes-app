interface FilterBarProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ categories, activeCategory, setActiveCategory }) => (
  <div className="filter-bar">
    {["All", ...categories].map((category) => (
      <button
        key={category}
        className={`filter-button ${activeCategory === category ? "active" : ""}`}
        onClick={() => setActiveCategory(category)}
      >
        {category}
      </button>
    ))}
  </div>
);

export default FilterBar;
