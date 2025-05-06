import { useTranslation } from "react-i18next";
import { SORT_CATEGORIES } from "./constants";
import { FilterProp, SorterType } from "../../types/models";

export default function SortBy({ filters, setFilters }: FilterProp) {
  const { t } = useTranslation();
  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const selected = e.target.value as SorterType;
    setFilters((prevFilters) => ({ ...prevFilters, sorter: selected }));
  };
  return (
    <div>
      <h3>{t("sorter_title")}</h3>
      <select name="" id="" value={filters.sorter} onChange={handleChange}>
        {SORT_CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {t(`sorter_options.${cat}`)}
          </option>
        ))}
      </select>
    </div>
  );
}
