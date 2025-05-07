import { REGIONS } from "../components/Region/constants";
import { SORT_CATEGORIES } from "../components/SortBy/constants";
import { STATUS_OPTIONS } from "../components/Status/constants";

export type RegionType = (typeof REGIONS)[number];
export type SorterType = (typeof SORT_CATEGORIES)[number];
export type StatusType = (typeof STATUS_OPTIONS)[number];

export interface Country {
  name: {
    common: string;
  };
  independent: boolean;
  unMember: boolean;
  region: string;
  area: number;
  population: number;
  flags: {
    svg: string;
    alt: string;
  };
}

export interface Filter {
  region: Record<RegionType, boolean>;
  sorter: SorterType;
  status: Record<StatusType, boolean>;
  searchKey: string;
}

export interface SetFilterProp {
  setFilters: React.Dispatch<React.SetStateAction<Filter>>;
}

export interface FilterProp extends SetFilterProp {
  filters: Filter;
}
