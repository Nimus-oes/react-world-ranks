import { useTranslation } from "react-i18next";
import { STATUS_OPTIONS } from "./constants";
import styles from "./Status.module.css";
import Checkbox from "../commonUI/Checkbox";
import { FilterProp, StatusType } from "../../types/models";

export default function Status({ filters, setFilters }: FilterProp) {
  const { t } = useTranslation();
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const selectedStatus = e.target.id as StatusType;
    setFilters((prevFilters) => ({
      ...prevFilters,
      status: {
        ...prevFilters.status,
        [selectedStatus]: !prevFilters.status[selectedStatus],
      },
    }));
  };

  return (
    <div>
      <h3 className={styles.title}>{t("status_title")}</h3>
      <div className={styles.statusWrapper}>
        {STATUS_OPTIONS.map((value) => (
          <Checkbox
            id={value}
            labelText={t(`status_options.${value}`)}
            checked={filters.status[value]}
            onChange={handleChange}
          />
        ))}
      </div>
    </div>
  );
}
