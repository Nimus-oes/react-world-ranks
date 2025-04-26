import { useEffect, useState } from "react";

interface CountryType {
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

// React.Dispatch<React.SetStateAction<CountryType[]>>

export default function CountryTable() {
  const [countries, setCountries] = useState<CountryType[]>([]);

  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,population,flags,area,region,unMember,independent",
    )
      .then((response) => response.json())
      .then((data) => setCountries(data));
  }, []);

  return <div>Country Table</div>;
}
