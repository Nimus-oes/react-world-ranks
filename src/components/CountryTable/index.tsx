import { useTranslation } from "react-i18next";
import { COUNTRY_TABLE_HEADERS } from "../../constants";
import type { CountryFetchProp } from "../../types/models";
import styles from "./CountryTable.module.css";
import { getCellData } from "./helpers";

export default function CountryTable({
  countries,
  isPending,
  isError,
}: CountryFetchProp) {
  const { t, i18n } = useTranslation();

  const messageCell = (i18nKey: string) => (
    <tr>
      <td colSpan={COUNTRY_TABLE_HEADERS.length} className={styles.message}>
        {t(i18nKey)}
      </td>
    </tr>
  );

  const countryCell = countries.map((country) => (
    <tr key={country.cca2}>
      {COUNTRY_TABLE_HEADERS.map((header) => (
        <td key={header}>{getCellData(country, header, t, i18n.language)}</td>
      ))}
    </tr>
  ));

  return (
    <div className={styles.tableWrapper}>
      <table>
        <thead>
          <tr>
            {COUNTRY_TABLE_HEADERS.map((header) => {
              const headerClass =
                header === "flag" ? styles.flagHeader : styles.headers;
              return (
                <th className={headerClass} key={header}>
                  {t(`country_table_headers.${header}`)}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {isPending && messageCell("fetch_loading_message")}
          {isError && messageCell("fetch_error_message")}
          {!isPending &&
            !isError &&
            countries.length === 0 &&
            messageCell("no_match_fallback_message")}
          {!isPending && !isError && countryCell}
        </tbody>
      </table>
    </div>
  );
}
