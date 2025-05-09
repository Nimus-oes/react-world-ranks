import { FilterProp } from "../../types/models";
import styles from "./SearchBar.module.css";

export default function SearchBar({ filters, setFilters }: FilterProp) {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const userinput = e.target.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      searchKey: userinput,
    }));
  };
  return (
    <div>
      <input
        type="text"
        value={filters.searchKey}
        onChange={handleChange}
        className={styles.searchField}
        placeholder="Search by name or region..."
      />
    </div>
  );
}
