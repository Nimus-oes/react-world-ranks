import { FilterProp } from "../../types/models";

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
      <input type="text" value={filters.searchKey} onChange={handleChange} />
    </div>
  );
}
