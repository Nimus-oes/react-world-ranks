import { Country } from "../../types/models";

interface TableHeaders {
  value: string;
  getProperty: (country: Country) => React.ReactNode;
}

export const COUNTRY_TABLE_HEADERS: TableHeaders[] = [
  {
    value: "flag",
    getProperty: (country) => (
      <img src={country.flags.svg} alt={country.flags.alt} width="50px" />
    ),
  },
  { value: "name", getProperty: (country) => country.name.common },
  {
    value: "population",
    getProperty: (country) => country.population,
  },
  { value: "area", getProperty: (country) => country.area },
  { value: "region", getProperty: (country) => country.region },
];
