import {
  REGIONS,
  SORT_CATEGORIES,
  STATUS_OPTIONS,
  COUNTRY_TABLE_HEADERS,
  LANGUAGES,
} from "../constants";

export type AppLangType = (typeof LANGUAGES)[number]["lng"];
export type HeaderType = (typeof COUNTRY_TABLE_HEADERS)[number];
export type RegionType = (typeof REGIONS)[number];
export type SorterType = (typeof SORT_CATEGORIES)[number];
export type StatusType = (typeof STATUS_OPTIONS)[number];

// Country is the original data model as defined by the external REST Countries API
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
  translations: Record<string, Record<string, string>>;
}

// LocalizedCountry is is an app-specific extension of the original Country model
export interface LocalizedCountry extends Country {
  localizedName: string;
  localizedRegion: string;
  localizedPopluation: string;
  localizedArea: string;
}

export interface CountryProp {
  countries: LocalizedCountry[];
}

export interface CountryFetchProp {
  countries: LocalizedCountry[];
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
