import FoundResults from "../FoundResults";
import SearchBar from "../SearchBar";
import SortBy from "../SortBy";
import Region from "../Region";
import Status from "../Status";
import CountryTable from "../CountryTable";
import styles from "./Main.module.css";

export default function Main() {
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
          <CountryTable />
        </div>
      </div>
    </main>
  );
}
