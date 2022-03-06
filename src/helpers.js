import {getLang} from "./translate";

const getLocale = () => getLang() === 'ua' ? 'uk' : 'en';

export const getCountryDisplayName = (countryCode) => {
  const regionNames = new Intl.DisplayNames([getLocale()], {type: 'region'});

  return regionNames.of(countryCode);
}

export const getCountryLanguage = (countryCode) => {
  const languageNames = new Intl.DisplayNames([getLocale()], {type: 'language'});
  const countryMainLanguage = countryToLanguage[countryCode];

  if (countryMainLanguage) {
    return languageNames.of(countryMainLanguage);
  }

  const fallback = languageNames.of(countryCode);

  if (fallback !== countryCode) {
    return fallback;
  }

  return getCountryDisplayName(countryCode);
}

// https://wiki.openstreetmap.org/wiki/Nominatim/Country_Codes
const countryToLanguage = {
  DE: 'de',
  DK: 'da',
  CN: 'zh',
  TR: 'tr',
  AT: 'de',
  GB: 'en',
  IN: 'hi',
  ES: 'es',
  IT: 'it',
  IL: 'he',
  KZ: 'kk',
  LT: 'lt',
  PL: 'pl',
  PT: 'pt',
  RU: 'ru',
  SK: 'sk',
  US: 'en',
  FI: 'fi',
  CZ: 'cs',
  MD: 'ro',
  FR: 'fr',
  JP: 'ja',
  GE: 'ka',
  BY: 'be',
  BA: 'bs',
  BR: 'pt',
  IR: 'fa',
  RS: 'sr',
  SE: 'sv',
  AF: 'fa',
  CA: 'en',
  KG: 'ru',
  LV: 'lv',
  HU: 'hu',
  NO: 'nb',
  SY: 'ar',
}

