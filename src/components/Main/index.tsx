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
  region: Record<RegionType, boolean>;
  status: Record<StatusType, boolean>;
  searchKey: string;
}

export interface SetFilterProp {
  setFilters: React.Dispatch<React.SetStateAction<FilterType>>;
}

export interface FilterProp {
  filters: FilterType;
  setFilters: React.Dispatch<React.SetStateAction<FilterType>>;
}

export default function Main() {
  const [filters, setFilters] = useState<FilterType>({
    sortBy: "Population",
    region: {
      Americas: false,
      Antarctic: false,
      Africa: false,
      Asia: false,
      Europe: false,
      Oceania: false,
    },
    status: {
      "Member of the United Nations": false,
      Independent: false,
    },
    searchKey: "",
  });

  return (
    <main className={styles.main}>
      <div className={styles.searchResults}>
        <FoundResults />
        <SearchBar />
      </div>
      <div className={styles.countryWrapper}>
        <div className={styles.filters}>
          <SortDropdown setFilters={setFilters} />
          <RegionFilters setFilters={setFilters} />
          <StatusFilters filters={filters} setFilters={setFilters} />
        </div>
        <div className={styles.country}>
          <CountryTable />
        </div>
      </div>
    </main>
  );
}
