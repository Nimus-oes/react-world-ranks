import { useTranslation } from "react-i18next";
import { CountryProp } from "../../types/models";

export default function FoundResults({ countries }: CountryProp) {
  const numOfCountries = countries.length;
  const { t } = useTranslation();
  return (
    <div>
      <p>{t("found_results_message", { count: numOfCountries })}</p>
    </div>
  );
}
