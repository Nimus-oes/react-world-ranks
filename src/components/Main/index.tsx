import FoundResults from "../FoundResults";
import SearchBar from "../SearchBar";
import SortBy from "../SortBy";
import Region from "../Region";
import Status from "../Status";
import CountryTable from "../CountryTable";
import styles from "./Main.module.css";
import { useQuery } from "@tanstack/react-query";
import { Country, Filter } from "../../types/models";
import { useState } from "react";
import {
  createInitialFilters,
  filterByRegion,
  filterByStatus,
  sortCountries,
} from "./helpers";

export default function Main() {
  async function fetchCountries() {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,population,flags,area,region,unMember,independent",
    );
    if (!response.ok) {
      throw new Error("Failed to fetch country data.");
    }
    return response.json();
  }

  const { data } = useQuery<Country[]>({
    queryKey: ["countries"],
    queryFn: fetchCountries,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
  });

  const [filters, setFilters] = useState<Filter>(createInitialFilters());
  const sortedCountries = sortCountries(data ?? [], filters);
  const filteredCountries = filterByRegion(sortedCountries, filters);
  const secondFilteredCountries = filterByStatus(filteredCountries, filters);

  return (
    <main className={styles.main}>
      <div className={styles.upperRow}>
        <FoundResults />
        <SearchBar />
      </div>
      <div className={styles.bottomRow}>
        <div className={styles.filterOptions}>
          <SortBy filters={filters} setFilters={setFilters} />
          <Region setFilters={setFilters} />
          <Status filters={filters} setFilters={setFilters} />
        </div>
        <div className={styles.countryTable}>
          <CountryTable countries={secondFilteredCountries} />
        </div>
      </div>
    </main>
  );
}
