import type {
  Country,
  LocalizedCountry,
  AppLangType,
} from "../../../types/models";

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

export function localizeData(
  countries: Country[],
  lng: string,
  t: (key: string) => string,
): LocalizedCountry[] {
  return countries.map((country) => ({
    ...country,
    localizedName: getLocalizedCountryName(country, lng),
    localizedRegion: t(`region_options.${country.region}`),
    localizedArea: formatNumber(country.area, lng),
    localizedPopluation: formatNumber(country.population, lng),
  }));
}
