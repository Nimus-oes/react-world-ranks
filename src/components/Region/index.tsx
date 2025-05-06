import { useTranslation } from "react-i18next";
import { REGIONS } from "./constants";

export default function Region() {
  const { t } = useTranslation();
  return (
    <div>
      <h3>{t("region_filter_title")}</h3>
      {REGIONS.map((region) => (
        <button>{t(`region_filter_options.${region}`)}</button>
      ))}
    </div>
  );
}
