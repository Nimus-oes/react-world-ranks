import { useTranslation } from "react-i18next";
import { SORT_CATEGORIES } from "./constants";

export default function SortBy() {
  const { t } = useTranslation();
  return (
    <div>
      <h3>{t("sorter_title")}</h3>
      <select name="" id="">
        {SORT_CATEGORIES.map((cat) => (
          <option>{t(`sorter_options.${cat}`)}</option>
        ))}
      </select>
    </div>
  );
}
