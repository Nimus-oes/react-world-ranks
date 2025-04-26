import type { FilterType, FilterProp } from "../Main";
import Checkbox from "./Checkbox";

export default function StatusFilters({ filters, setFilters }: FilterProp) {
  const updateFilters = (label: keyof FilterType["status"]) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      status: { ...prevFilters.status, [label]: !prevFilters.status[label] },
    }));
  };

  return (
    <div>
      <h3>Status</h3>
      <Checkbox
        labelText="Member of the United Nations"
        checked={filters.status["Member of the United Nations"]}
        onChange={() => updateFilters("Member of the United Nations")}
      />
      <Checkbox
        labelText="Independent"
        checked={filters.status["Independent"]}
        onChange={() => updateFilters("Independent")}
      />
    </div>
  );
}
