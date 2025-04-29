import { FilteredCountriesProp } from "../Main";

export default function FoundResults({
  filteredCountries,
}: FilteredCountriesProp) {
  const numsOfCountries = filteredCountries.length;
  return <div>Found {numsOfCountries} Results</div>;
}
