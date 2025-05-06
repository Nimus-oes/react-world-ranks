import { useTranslation } from "react-i18next";
import { COUNTRY_TABLE_HEADERS } from "./constants";

export default function CountryTable() {
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
        <tbody></tbody>
      </table>
    </div>
  );
}
