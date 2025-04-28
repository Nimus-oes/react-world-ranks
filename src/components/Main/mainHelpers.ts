import type { CountryType, FilterType } from ".";

function getTrueItems(array: [string, boolean][]) {
  const trueItem: string[] = [];
  for (const [name, isTrue] of array) {
    if (isTrue) {
      trueItem.push(name);
    }
  }
  return trueItem;
}

const sortCountries = (
  countries: CountryType[],
  filters: FilterType,
): CountryType[] => {
  return [...countries].sort((a, b) => {
    switch (filters.sortBy) {
      case "Population":
        return b.population - a.population;
      case "Area":
        return b.area - a.area;
      case "Name":
        return a.name.common.localeCompare(b.name.common);
      case "Region":
        return a.region.localeCompare(b.region);
      default:
        return 0;
    }
  });
};

const filterByRegion = (
  countriesToFilter: CountryType[],
  filters: FilterType,
): CountryType[] => {
  const selectedRegion = getTrueItems(Object.entries(filters.region));

  if (selectedRegion.length === 0) {
    return countriesToFilter;
  } else {
    return countriesToFilter.filter((country) =>
      selectedRegion.includes(country.region),
    );
  }
};

const filterByStatus = (
  countriesToFilter: CountryType[],
  filters: FilterType,
): CountryType[] => {
  const selectedStatus = getTrueItems(Object.entries(filters.status));

  if (selectedStatus.length === 0) {
    return countriesToFilter;
  } else {
    return countriesToFilter.filter(
      (country) =>
        (selectedStatus.includes("Member of the United Nations") &&
          country.unMember) ||
        (selectedStatus.includes("Independent") && country.independent),
    );
  }
};

const serachCountries = (
  countriesToSearch: CountryType[],
  filters: FilterType,
): CountryType[] => {
  const searchKey = filters.searchKey.trim().toLowerCase();

  if (searchKey === "") {
    return countriesToSearch;
  }
  return countriesToSearch.filter(
    (country) =>
      country.name.common.trim().toLowerCase().includes(searchKey) ||
      country.region.trim().toLowerCase().includes(searchKey),
  );
};

export const filterCountries = (
  countriesToFilter: CountryType[],
  filters: FilterType,
) => {
  return sortCountries(
    filterByStatus(
      filterByRegion(serachCountries(countriesToFilter, filters), filters),
      filters,
    ),
    filters,
  );
};
