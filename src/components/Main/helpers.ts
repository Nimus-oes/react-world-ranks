import { REGIONS } from "../Region/constants";
import { SORT_CATEGORIES } from "../SortBy/constants";
import { STATUS_OPTIONS } from "../Status/constants";
import type { Country, Filter } from "../../types/models";

export function createInitialFilters(): Filter {
  return {
    region: Object.fromEntries(
      REGIONS.map((region) => [region, false]),
    ) as Filter["region"],
    sorter: SORT_CATEGORIES[0],
    status: Object.fromEntries(
      STATUS_OPTIONS.map((status) => [status, false]),
    ) as Filter["status"],
    searchKey: "",
  };
}

export function sortCountries(
  countries: Country[],
  filters: Filter,
): Country[] {
  return [...countries].sort((a, b) => {
    switch (filters.sorter) {
      case "population":
        return b.population - a.population;
      case "area":
        return b.area - a.area;
      case "name":
        return a.name.common.localeCompare(b.name.common);
      case "region":
        return a.region.localeCompare(b.region);
      default:
        return 0;
    }
  });
}

function getTrueItems(array: [string, boolean][]): string[] {
  return array.filter(([, value]) => value === true).map(([key]) => key);
}

export function filterByRegion(
  countries: Country[],
  filters: Filter,
): Country[] {
  const regions = getTrueItems(Object.entries(filters.region));
  if (regions.length) {
    return [...countries].filter((country) => regions.includes(country.region));
  } else {
    return countries;
  }
}
