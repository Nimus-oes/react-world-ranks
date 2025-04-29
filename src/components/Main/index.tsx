import { useState, useEffect } from "react";
import CountryTable from "../CountryTable";
import FoundResults from "../FoundResults";
import RegionFilters from "../RegionFilters";
import SearchBar from "../SearchBar";
import SortDropdown from "../SortDropdown";
import StatusFilters from "../StatusFilters";
import styles from "./Main.module.css";
import { filterCountries } from "./mainHelpers";
import { useQuery } from "@tanstack/react-query";

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

export interface FilterProp extends SetFilterProp {
  filters: FilterType;
}

export interface CountryType {
  name: {
    common: string;
  };
  population: number;
  flags: {
    svg: string;
    alt: string;
  };
  area: number;
  region: string;
  unMember: boolean;
  independent: boolean;
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

  //   const [countries, setCountries] = useState<CountryType[]>([]);

  async function fetchCountries() {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,population,flags,area,region,unMember,independent",
    );

    if (!response.ok) {
      throw new Error("Failed to fetch countries data.");
    }

    return response.json();
  }

  //   useEffect(() => {
  //     fetch(
  //       "https://restcountries.com/v3.1/all?fields=name,population,flags,area,region,unMember,independent",
  //     )
  //       .then((response) => response.json())
  //       .then((data) => setCountries(data));
  //   }, []);

  const { data } = useQuery<CountryType[]>({
    queryKey: ["countries"],
    queryFn: fetchCountries,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
  });

  const filteredCountries = filterCountries(data ?? [], filters);

  return (
    <main className={styles.main}>
      <div className={styles.searchResults}>
        <FoundResults />
        <SearchBar filters={filters} setFilters={setFilters} />
      </div>
      <div className={styles.countryWrapper}>
        <div className={styles.filters}>
          <SortDropdown setFilters={setFilters} />
          <RegionFilters setFilters={setFilters} />
          <StatusFilters filters={filters} setFilters={setFilters} />
        </div>
        <div className={styles.country}>
          <CountryTable filteredCountries={filteredCountries} />
        </div>
      </div>
    </main>
  );
}
