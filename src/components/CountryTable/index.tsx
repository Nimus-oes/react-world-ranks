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

  return (
    <table>
      <thead>
        <tr>
          <th>Flag</th>
          <th>Name</th>
          <th>Population</th>
          <th>Area</th>
          <th>Region</th>
        </tr>
      </thead>
      <tbody>
        {countries.map((country) => (
          <tr>
            <td>
              <div>
                <img
                  src={country.flags.svg}
                  alt={country.flags.alt}
                  width="50px"
                />
              </div>
            </td>
            <td>{country.name.common}</td>
            <td>{country.population}</td>
            <td>{country.area}</td>
            <td>{country.region}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
