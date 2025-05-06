import { useTranslation } from "react-i18next";
import { STATUS_OPTIONS } from "./constants";
import styles from "./Status.module.css";
import Checkbox from "../commonUI/Checkbox";
import { useState } from "react";

export default function Status() {
  const { t } = useTranslation();
  const [checkedValue, setCheckedValue] = useState(false);
  const handleChange = () => {
    setCheckedValue((prev) => !prev);
  };
  return (
    <div>
      <h3>{t("status_title")}</h3>
      <div className={styles.statusWrapper}>
        {STATUS_OPTIONS.map((status) => (
          <Checkbox
            id={status}
            labelText={t(`status_options.${status}`)}
            checked={checkedValue}
            onChange={handleChange}
          />
        ))}
      </div>
    </div>
  );
}
