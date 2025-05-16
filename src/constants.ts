export const API_BASE_URL = "https://restcountries.com/v3.1";
export const API_PARAMS = [
  "name",
  "population",
  "flags",
  "area",
  "region",
  "unMember",
  "independent",
  "cca2",
  "translations",
];

export const LANGUAGES = [
  { lng: "en", text: "English" },
  { lng: "ko", text: "한국어" },
] as const;

export const COUNTRY_TABLE_HEADERS = [
  "flag",
  "name",
  "population",
  "area",
  "region",
] as const;

// The REGIONS values, including cases must match the Region values of the REST Countries API
export const REGIONS = [
  "Americas",
  "Antarctic",
  "Africa",
  "Asia",
  "Europe",
  "Oceania",
] as const;

export const SORT_CATEGORIES = [
  "population",
  "name",
  "area",
  "region",
] as const;

// The STATUS_OPTIONS alues, including cases must match the keys of the REST Countries API
export const STATUS_OPTIONS = ["unMember", "independent"] as const;
