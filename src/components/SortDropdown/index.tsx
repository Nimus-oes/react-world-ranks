import type { FilterType, FilterProp } from "../Main";

export default function SortDropdown({ filters, setFilters }: FilterProp) {
  return (
    <>
      <h3>Sort by</h3>
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
    </>
  );
}
