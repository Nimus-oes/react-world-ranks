import FoundResults from "../FoundResults";
import SearchBar from "../SearchBar";
import SortBy from "../SortBy";
import Region from "../Region";
import Status from "../Status";
import CountryTable from "../CountryTable";
import styles from "./Main.module.css";
import { useQuery } from "@tanstack/react-query";
import { Country } from "../../types/models";

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

  return (
    <main className={styles.main}>
      <div className={styles.upperRow}>
        <FoundResults />
        <SearchBar />
      </div>
      <div className={styles.bottomRow}>
        <div className={styles.filterOptions}>
          <SortBy />
          <Region />
          <Status />
        </div>
        <div className={styles.countryTable}>
          {data && <CountryTable countries={data} />}
        </div>
      </div>
    </main>
  );
}
