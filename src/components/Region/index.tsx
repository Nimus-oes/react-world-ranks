import { useTranslation } from "react-i18next";
import { REGIONS } from "./constants";
import { RegionType, SetFilterProp } from "../../types/models";

export default function Region({ setFilters }: SetFilterProp) {
  const { t } = useTranslation();
  const handleChange: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const selectedRegion = e.currentTarget.value as RegionType;
    setFilters((prevFilters) => ({
      ...prevFilters,
      region: {
        ...prevFilters.region,
        [selectedRegion]: !prevFilters.region[selectedRegion],
      },
    }));
  };
  return (
    <div>
      <h3>{t("region_filter_title")}</h3>
      {REGIONS.map((region) => (
        <button type="button" value={region} onClick={handleChange}>
          {t(`region_filter_options.${region}`)}
        </button>
      ))}
    </div>
  );
}
