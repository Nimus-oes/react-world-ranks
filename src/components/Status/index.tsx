import { Checkbox } from "radix-ui";
import { CheckIcon } from "@radix-ui/react-icons";
import { useTranslation } from "react-i18next";
import { STATUS_OPTIONS } from "../../constants";
import { FilterProp, StatusType } from "../../types/models";
import styles from "./Status.module.css";

export default function Status({ filters, setFilters }: FilterProp) {
  const { t } = useTranslation();
  const handleChange = (value: StatusType) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      status: {
        ...prevFilters.status,
        [value]: !prevFilters.status[value],
      },
    }));
  };

  return (
    <div>
      <h3 className={styles.title}>{t("status_title")}</h3>
      <div className={styles.statusWrapper}>
        {STATUS_OPTIONS.map((value) => (
          <div className={styles.checkboxItem} key={value}>
            <Checkbox.Root
              id={value}
              className={styles.checkboxSquare}
              checked={filters.status[value]}
              onCheckedChange={() => handleChange(value)}
            >
              <Checkbox.Indicator className={styles.checkmarkWrapper}>
                <CheckIcon className={styles.checkmark} />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <label htmlFor={value} className={styles.label}>
              {t(`status_options.${value}`)}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
