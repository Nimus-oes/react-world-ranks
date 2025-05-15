import { AppLangType, Country, HeaderType } from "../../types/models";

function getAPILng(appLng: AppLangType) {
  const apiLngs = { en: "", ko: "kor" };
  return apiLngs[appLng];
}

function getLocalizedCountryName(country: Country, lng: string) {
  if (lng === "en") return country.name.common;
  const apiLng = getAPILng(lng as AppLangType);
  return country.translations[apiLng].common ?? country.name.common;
}

function formatNumber(number: number, lng: string) {
  return Intl.NumberFormat(lng).format(number);
}

export function getCellData(
  country: Country,
  key: HeaderType,
  t: (key: string) => string,
  appLng: string,
) {
  switch (key) {
    case "flag":
      return (
        <img src={country.flags.svg} alt={country.flags.alt} width="50px" />
      );
    case "area":
      return formatNumber(country.area, appLng);
    case "name":
      return getLocalizedCountryName(country, appLng);
    case "population":
      return formatNumber(country.population, appLng);
    case "region":
      return t(`region_options.${country.region}`);
    default:
      return null;
  }
}
