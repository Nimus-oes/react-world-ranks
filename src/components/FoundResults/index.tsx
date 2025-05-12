import { useTranslation } from "react-i18next";
import { CountryProp } from "../../types/models";
import styles from "./FoundResults.module.css";

export default function FoundResults({ countries }: CountryProp) {
  const numOfCountries = countries.length;
  const { t } = useTranslation();
  return (
    <div>
      <h3 className={styles.foundResults}>
        {t("found_results_message", { count: numOfCountries })}
      </h3>
    </div>
  );
}
