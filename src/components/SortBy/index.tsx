import { useTranslation } from "react-i18next";
import { SORT_CATEGORIES } from "./constants";
import { FilterProp, SorterType } from "../../types/models";
import styles from "./SortBy.module.css";
import { Select } from "radix-ui";

export default function SortBy({ filters, setFilters }: FilterProp) {
  const { t } = useTranslation();
  const handleChange = (value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      sorter: value as SorterType,
    }));
  };

  return (
    <div>
      <h3 className={styles.title}>{t("sorter_title")}</h3>
      <Select.Root value={filters.sorter} onValueChange={handleChange}>
        <Select.Trigger className={styles.trigger}>
          <Select.Value />
          <Select.Icon />
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            className={styles.content}
            position="popper"
            sideOffset={4}
          >
            <Select.Viewport>
              {SORT_CATEGORIES.map((cat) => (
                <Select.Item key={cat} value={cat} className={styles.item}>
                  <Select.ItemText>
                    {t(`sorter_options.${cat}`)}
                  </Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}
