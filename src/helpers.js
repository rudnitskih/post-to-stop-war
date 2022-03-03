const regionNames = new Intl.DisplayNames(['uk'], {type: 'region'});
const languageNames = new Intl.DisplayNames(['uk'], {type: 'language'});

export const getCountryDisplayName = (countryCode) => {
  return regionNames.of(countryCode);
}

export const getCountryLanguage = (countryCode) => {
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
}

