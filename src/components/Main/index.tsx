import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import FoundResults from "../FoundResults";
import SearchBar from "../SearchBar";
import SortBy from "../SortBy";
import Region from "../Region";
import Status from "../Status";
import CountryTable from "../CountryTable";
import type { Country, Filter } from "../../types/models";
import styles from "./Main.module.css";
import { createInitialFilters, sortFilterCountries } from "./helpers";
import LanguageSelector from "../LanguageSelector";

export default function Main() {
  async function fetchCountries() {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,population,flags,area,region,unMember,independent,cca2",
    );
    if (!response.ok) {
      throw new Error("Failed to fetch country data.");
    }
    return response.json();
  }

  const { data, isPending, isError } = useQuery<Country[]>({
    queryKey: ["countries"],
    queryFn: fetchCountries,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
  });

  const [filters, setFilters] = useState<Filter>(createInitialFilters());
  const filteredCountries = sortFilterCountries(data ?? [], filters);

  return (
    <main className={styles.main}>
      <div className={styles.upperRow}>
        <FoundResults countries={filteredCountries} />
        <div className={styles.upperLeftRow}>
          <LanguageSelector />
          <SearchBar filters={filters} setFilters={setFilters} />
        </div>
      </div>
      <div className={styles.bottomRow}>
        <div className={styles.filterOptions}>
          <SortBy filters={filters} setFilters={setFilters} />
          <Region filters={filters} setFilters={setFilters} />
          <Status filters={filters} setFilters={setFilters} />
        </div>
        <div className={styles.countryTable}>
          <CountryTable
            countries={filteredCountries}
            isPending={isPending}
            isError={isError}
          />
        </div>
      </div>
    </main>
  );
}
