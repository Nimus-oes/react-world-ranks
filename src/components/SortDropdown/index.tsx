import type { FilterType, SetFilterProp } from "../Main";

export default function SortDropdown({ setFilters }: SetFilterProp) {
  return (
    <select
      name=""
      id=""
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
