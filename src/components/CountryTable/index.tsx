import { useTranslation } from "react-i18next";
import { COUNTRY_TABLE_HEADERS } from "./constants";
import type { CountryProp } from "../../types/models";
import styles from "./CountryTable.module.css";

export default function CountryTable({ countries }: CountryProp) {
  const { t } = useTranslation();
  return (
    <div className={styles.tableWrapper}>
      <table>
        <thead>
          <tr>
            {COUNTRY_TABLE_HEADERS.map((header) => {
              const headerClass =
                header.value === "flag" ? styles.flagHeader : styles.headers;
              return (
                <th className={headerClass}>
                  {t(`country_table_headers.${header.value}`)}
                </th>
              );
            })}
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
