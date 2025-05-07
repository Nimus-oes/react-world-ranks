import { useTranslation } from "react-i18next";
import { REGIONS } from "./constants";
import { FilterProp, RegionType } from "../../types/models";
import styles from "./Region.module.css";

export default function Region({ filters, setFilters }: FilterProp) {
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
      {REGIONS.map((regionValue) => {
        const tagSelected = filters.region[regionValue]
          ? styles.tagSelected
          : "";
        return (
          <button
            type="button"
            value={regionValue}
            onClick={handleChange}
            className={`${styles.regionTag} ${tagSelected}`}
            key={regionValue}
          >
            {t(`region_filter_options.${regionValue}`)}
          </button>
        );
      })}
    </div>
  );
}
