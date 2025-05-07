import { useTranslation } from "react-i18next";
import { COUNTRY_TABLE_HEADERS } from "./constants";
import type { CountryProp } from "../../types/models";

export default function CountryTable({ countries }: CountryProp) {
  const { t } = useTranslation();
  return (
    <div>
      <table>
        <thead>
          <tr>
            {COUNTRY_TABLE_HEADERS.map((header) => (
              <th>{t(`country_table_headers.${header.value}`)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {countries.map((country) => (
            <tr>
              {COUNTRY_TABLE_HEADERS.map((header) => (
                <td>{header.getProperty(country)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
