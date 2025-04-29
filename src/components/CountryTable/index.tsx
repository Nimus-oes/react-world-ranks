import type { CountryType, FilteredCountriesProp } from "../Main";

export default function CountryTable({
  filteredCountries,
}: FilteredCountriesProp) {
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
        {filteredCountries.map((country) => (
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
