import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import FoundResults from "../FoundResults";
import LanguageSelector from "../LanguageSelector";
import SearchBar from "../SearchBar";
import SortBy from "../SortBy";
import Region from "../Region";
import Status from "../Status";
import CountryTable from "../CountryTable";
import type { Country, Filter } from "../../types/models";
import { createInitialFilters, sortFilterCountries } from "./helpers/filters";
import { localizeData } from "./helpers/localization";
import styles from "./Main.module.css";
import { API_BASE_URL, API_PARAMS } from "../../constants";

export default function Main() {
  async function fetchCountries() {
    const queryParams = API_PARAMS.join(",");
    const response = await fetch(`${API_BASE_URL}/all?fields=${queryParams}`);
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

  const { t, i18n } = useTranslation();
  const localizedCountries = useMemo(
    () => localizeData(data ?? [], i18n.language, t),
    [data, i18n.language],
  );
  const [filters, setFilters] = useState<Filter>(createInitialFilters());
  const filteredCountries = sortFilterCountries(localizedCountries, filters);

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
