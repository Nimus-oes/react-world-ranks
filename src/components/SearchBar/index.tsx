import type { FilterProp } from "../Main";

export default function SearchBar({ filters, setFilters }: FilterProp) {
  return (
    <input
      type="text"
      value={filters.searchKey}
      onChange={(e) =>
        setFilters((prevFilters) => ({
          ...prevFilters,
          searchKey: e.target.value,
        }))
      }
    />
  );
}
