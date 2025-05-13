import { useTranslation } from "react-i18next";
import { FilterProp } from "../../types/models";
import styles from "./SearchBar.module.css";

export default function SearchBar({ filters, setFilters }: FilterProp) {
  const { t } = useTranslation();
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
        placeholder={t("search_field_placeholder")}
      />
    </div>
  );
}
