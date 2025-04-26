import { useState } from "react";
import CountryTable from "../CountryTable";
import FoundResults from "../FoundResults";
import RegionFilters from "../RegionFilters";
import SearchBar from "../SearchBar";
import SortDropdown from "../SortDropdown";
import StatusFilters from "../StatusFilters";
import styles from "./Main.module.css";

type SortByType = "Name" | "Population" | "Area" | "Region";
type StatusType = "Member of the United Nations" | "Independent";
type RegionType =
  | "Americas"
  | "Antarctic"
  | "Africa"
  | "Asia"
  | "Europe"
  | "Oceania";

export interface FilterType {
  sortBy: SortByType;
  region: RegionType | undefined;
  status: StatusType | undefined;
}

export default function Main() {
  const [filters, setFilters] = useState<FilterType>({
    sortBy: "Population",
    region: undefined,
    status: undefined,
  });

  return (
    <main className={styles.main}>
      <div className={styles.searchResults}>
        <FoundResults />
        <SearchBar />
      </div>
      <div className={styles.countryWrapper}>
        <div className={styles.filters}>
          <SortDropdown filters={filters} setFilters={setFilters} />
          <RegionFilters />
          <StatusFilters />
        </div>
        <div className={styles.country}>
          <CountryTable />
        </div>
      </div>
    </main>
  );
}
