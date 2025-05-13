import { REGIONS, SORT_CATEGORIES, STATUS_OPTIONS } from "../../constants";
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

function sortCountries(countries: Country[], filters: Filter): Country[] {
  return countries.sort((a, b) => {
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

function filterByRegion(countries: Country[], filters: Filter): Country[] {
  const selectedRegions = getTrueItems(Object.entries(filters.region));
  if (selectedRegions.length) {
    return countries.filter((country) =>
      selectedRegions.includes(country.region),
    );
  } else {
    return countries;
  }
}

function filterByStatus(countries: Country[], filters: Filter): Country[] {
  const selectedStatus = getTrueItems(Object.entries(filters.status));
  if (selectedStatus.length) {
    return countries.filter((country) =>
      selectedStatus.some((key) => country[key as keyof Country]),
    );
  } else {
    return countries;
  }
}

function searchCountries(countries: Country[], filters: Filter): Country[] {
  const keyword = filters.searchKey.trim().toLowerCase();

  if (keyword) {
    return countries.filter(
      (country) =>
        country.name.common.trim().toLowerCase().includes(keyword) ||
        country.region.trim().toLowerCase().includes(keyword),
    );
  } else {
    return countries;
  }
}

export function sortFilterCountries(
  countries: Country[],
  filters: Filter,
): Country[] {
  let result = [...countries];
  result = filterByRegion(result, filters);
  result = filterByStatus(result, filters);
  result = searchCountries(result, filters);
  result = sortCountries(result, filters);
  return result;
}
