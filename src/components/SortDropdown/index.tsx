import type { FilterType } from "../Main";

interface FilterProp {
  filters: FilterType;
  setFilters: React.Dispatch<React.SetStateAction<FilterType>>;
}

export default function SortDropdown({ filters, setFilters }: FilterProp) {
  return (
    <select
      name=""
      id=""
      value={filters.sortBy}
      onChange={(e) =>
        setFilters((prevFilters) => ({
          ...prevFilters,
          sortBy: e.target.value as FilterType["sortBy"],
        }))
      }
    >
      <option value="Name">Name</option>
      <option value="Population">Population</option>
      <option value="Area">Area</option>
      <option value="Region">Region</option>
    </select>
  );
}
