import type { SetFilterProp, FilterType } from "../Main";

export default function RegionFilters({ setFilters }: SetFilterProp) {
  const toggleRegion = (regionName: keyof FilterType["region"]) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      region: {
        ...prevFilters.region,
        [regionName]: !prevFilters.region[regionName],
      },
    }));
  };

  return (
    <div>
      <h3>Region</h3>
      <a onClick={() => toggleRegion("Americas")}>Americas</a>
      <a onClick={() => toggleRegion("Antarctic")}>Antarctic</a>
      <a onClick={() => toggleRegion("Africa")}>Africa</a>
      <a onClick={() => toggleRegion("Asia")}>Asia</a>
      <a onClick={() => toggleRegion("Europe")}>Europe</a>
      <a onClick={() => toggleRegion("Oceania")}>Oceania</a>
    </div>
  );
}
