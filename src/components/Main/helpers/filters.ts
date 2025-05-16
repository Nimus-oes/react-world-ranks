import { REGIONS, SORT_CATEGORIES, STATUS_OPTIONS } from "../../../constants";
import type { LocalizedCountry, Filter } from "../../../types/models";

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

function sortCountries(
  countries: LocalizedCountry[],
  filters: Filter,
): LocalizedCountry[] {
  return countries.sort((a, b) => {
    switch (filters.sorter) {
      case "population":
        return b.population - a.population; // Raw data used instead of localized one for value comparison
      case "area":
        return b.area - a.area; // Raw data used instead of localized one for value comparison
      case "name":
        return a.localizedName.localeCompare(b.localizedName);
      case "region":
        return a.localizedRegion.localeCompare(b.localizedRegion);
      default:
        return 0;
    }
  });
}

function getTrueItems(array: [string, boolean][]): string[] {
  return array.filter(([, value]) => value === true).map(([key]) => key);
}

function filterByRegion(
  countries: LocalizedCountry[],
  filters: Filter,
): LocalizedCountry[] {
  const selectedRegions = getTrueItems(Object.entries(filters.region));
  if (selectedRegions.length) {
    return countries.filter((country) =>
      selectedRegions.includes(country.region),
    );
  } else {
    return countries;
  }
}

function filterByStatus(
  countries: LocalizedCountry[],
  filters: Filter,
): LocalizedCountry[] {
  const selectedStatus = getTrueItems(Object.entries(filters.status));
  if (selectedStatus.length) {
    return countries.filter((country) =>
      selectedStatus.some((key) => country[key as keyof LocalizedCountry]),
    );
  } else {
    return countries;
  }
}

function searchCountries(
  countries: LocalizedCountry[],
  filters: Filter,
): LocalizedCountry[] {
  const keyword = filters.searchKey.trim().toLowerCase();

  if (keyword) {
    return countries.filter(
      (country) =>
        country.localizedName.trim().toLowerCase().includes(keyword) ||
        country.region.trim().toLowerCase().includes(keyword),
    );
  } else {
    return countries;
  }
}

export function sortFilterCountries(
  countries: LocalizedCountry[],
  filters: Filter,
): LocalizedCountry[] {
  let result = [...countries];
  result = filterByRegion(result, filters);
  result = filterByStatus(result, filters);
  result = searchCountries(result, filters);
  result = sortCountries(result, filters);
  return result;
}
