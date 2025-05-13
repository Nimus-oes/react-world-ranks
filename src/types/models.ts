import {
  REGIONS,
  SORT_CATEGORIES,
  STATUS_OPTIONS,
  COUNTRY_TABLE_HEADERS,
} from "../constants";

export type HeaderType = (typeof COUNTRY_TABLE_HEADERS)[number];
export type RegionType = (typeof REGIONS)[number];
export type SorterType = (typeof SORT_CATEGORIES)[number];
export type StatusType = (typeof STATUS_OPTIONS)[number];

export interface Country {
  name: {
    common: string;
  };
  cca2: string;
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

export interface CountryProp {
  countries: Country[];
}

export interface CountryFetchProp {
  countries: Country[];
  isPending: boolean;
  isError: boolean;
}

export interface Filter {
  region: Record<RegionType, boolean>;
  sorter: SorterType;
  status: Record<StatusType, boolean>;
  searchKey: string;
}

export interface FilterProp {
  filters: Filter;
  setFilters: React.Dispatch<React.SetStateAction<Filter>>;
}
