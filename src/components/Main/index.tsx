import { useState, useEffect } from "react";
import CountryTable from "../CountryTable";
import FoundResults from "../FoundResults";
import RegionFilters from "../RegionFilters";
import SearchBar from "../SearchBar";
import SortDropdown from "../SortDropdown";
import StatusFilters from "../StatusFilters";
import styles from "./Main.module.css";

// "Americas"
// "Antarctic"
// "Africa"
// "Asia"
// "Europe"
// "Oceania"
// "Name"
// "Population"
// "Area"
// "Region"
// "Member of the United Nations"
// "Independent"

export default function Main() {
  return (
    <main className={styles.main}>
      <div className={styles.searchResults}>
        <FoundResults />
        <SearchBar />
      </div>
      <div className={styles.countryWrapper}>
        <div className={styles.filters}>
          <SortDropdown />
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
