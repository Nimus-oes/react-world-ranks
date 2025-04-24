import CountryTable from "../CountryTable";
import FoundResults from "../FoundResults";
import RegionFilters from "../RegionFilters";
import SearchBar from "../SearchBar";
import SortDropdown from "../SortDropdown";
import StatusFilters from "../StatusFilters";

export default function Main() {
  return (
    <main>
      <FoundResults />
      <SearchBar />
      <SortDropdown />
      <RegionFilters />
      <StatusFilters />
      <CountryTable />
    </main>
  );
}
