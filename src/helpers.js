export const getSiteLang = () => {
  return (window.location.pathname || '').replace('/', '') || 'ua';
}

const getLocale = () => getSiteLang() === 'ua' ? 'uk' : 'en';

const languageNames = new Intl.DisplayNames([getLocale()], {type: 'language'});
const regionNames = new Intl.DisplayNames([getLocale()], {type: 'region'});

export const filterWrongMessages = (data) => {
  return data.filter((row) => {
    const { Country, LocalizedMessage, Hidden } = row;
    const hasError = countryToLanguage[Country] === undefined || !LocalizedMessage;

    if (hasError) {
      console.error('Row with issues', row);
    }

    return !hasError && (!Hidden || (new URLSearchParams(window.location.search)).get('showAll') !== null);
  });
}

export const getCountryDisplayName = (countryCode) => {
  return regionNames.of(countryCode);
}

const MULTIPLE_LANGUAGES_IN_COLUMN_SIGN = ' + ';

export const getCountryLanguageDisplayNames = (countryCode) => {
  const columnsLanguages = getLocalesForCountry(countryCode);

  if (columnsLanguages) {
    return columnsLanguages.map((columnLanguages) => {
      return columnLanguages
        .split(MULTIPLE_LANGUAGES_IN_COLUMN_SIGN)
        .map((oneOfColumnLanguage) => languageNames.of(oneOfColumnLanguage))
        .join(' / ')
    });
  }

  const fallback = languageNames.of(countryCode);

  if (fallback !== countryCode) {
    return [fallback];
  }

  return [getCountryDisplayName(countryCode)];
}

export const getLocalesForCountry = (countryCode) => {
  return [].concat(countryToLanguage[countryCode]);
}

export const getLocaleDirection = (locale) => {
  return rtlLocales.includes(locale) ? 'rtl' : 'ltr';
}

// https://wiki.openstreetmap.org/wiki/Nominatim/Country_Codes
const countryToLanguage = {
  DE: 'de',
  DK: 'da',
  CN: 'zh',
  TR: 'tr',
  AT: 'de',
  GB: 'en',
  IN: ['hi', 'en'],
  ES: 'es',
  IT: 'it',
  IL: 'he',
  KZ: 'ru',
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
  BY: `be${MULTIPLE_LANGUAGES_IN_COLUMN_SIGN}ru`,
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
  AD: 'ca',
  AE: 'ar',
  AG: 'en',
  AI: 'en',
  AL: 'sq',
  AM: 'hy',
  AO: 'pt',
  AQ: 'en',
  AR: 'es',
  AS: 'en',
  AU: 'en',
  AW: 'nl',
  AX: 'sv',
  AZ: 'az',
  BB: 'en',
  BD: 'bn',
  BE: 'nl',
  BF: 'fr',
  BG: 'bg',
  BH: 'ar',
  BI: 'fr',
  BJ: 'fr',
  BL: 'fr',
  BM: 'en',
  BN: 'ms',
  BO: 'es',
  BQ: 'nl',
  BS: 'en',
  BT: 'dz',
  BV: 'no',
  BW: 'en',
  BZ: 'en',
  CC: 'en',
  CD: 'fr',
  CF: 'fr',
  CG: 'fr',
  CH: 'de',
  CI: 'fr',
  CK: 'en',
  CL: 'es',
  CM: 'fr',
  CO: 'es',
  CR: 'es',
  CU: 'es',
  CV: 'pt',
  CW: 'nl',
  CX: 'en',
  CY: 'el',
  DJ: 'fr',
  DM: 'en',
  DO: 'es',
  DZ: 'ar',
  EC: 'es',
  EE: 'et',
  EG: 'ar',
  EH: 'ar',
  ER: 'ti',
  ET: 'am',
  FJ: 'en',
  FK: 'en',
  FM: 'en',
  FO: 'fo',
  GA: 'fr',
  GD: 'en',
  GF: 'fr',
  GG: 'en',
  GH: 'en',
  GI: 'en',
  GL: 'kl',
  GM: 'en',
  GN: 'fr',
  GP: 'fr',
  GQ: 'es',
  GR: 'el',
  GS: 'en',
  GT: 'es',
  GU: 'en',
  GW: 'pt',
  GY: 'en',
  HK: 'zh',
  HM: 'en',
  HN: 'es',
  HR: 'hr',
  HT: 'fr',
  ID: 'id',
  IE: 'en',
  IM: 'en',
  IO: 'en',
  IQ: 'ar',
  IS: 'is',
  JE: 'en',
  JM: 'en',
  JO: 'ar',
  KE: 'sw',
  KH: 'km',
  KI: 'en',
  KM: 'ar',
  KN: 'en',
  KP: 'ko',
  KR: 'ko',
  KW: 'ar',
  KY: 'en',
  LA: 'lo',
  LB: 'ar',
  LC: 'en',
  LI: 'de',
  LK: 'si',
  LR: 'en',
  LS: 'en',
  LU: 'lb',
  LY: 'ar',
  MA: 'ar',
  MC: 'fr',
  ME: 'srp',
  MF: 'fr',
  MG: 'mg',
  MH: 'en',
  MK: 'mk',
  ML: 'fr',
  MM: 'my',
  MN: 'mn',
  MO: 'zh',
  MP: 'en',
  MQ: 'fr',
  MR: 'ar',
  MS: 'en',
  MT: 'mt',
  MU: 'mfe',
  MV: 'dv',
  MW: 'en',
  MX: 'es',
  MY: 'ms',
  MZ: 'pt',
  NA: 'en',
  NC: 'fr',
  NE: 'fr',
  NF: 'en',
  NG: 'en',
  NI: 'es',
  NL: 'nl',
  NP: 'ne',
  NR: 'na',
  NU: 'niu',
  NZ: 'mi',
  OM: 'ar',
  PA: 'es',
  PE: 'es',
  PF: 'fr',
  PG: 'en',
  PH: 'tl',
  PK: 'en',
  PM: 'fr',
  PN: 'en',
  PR: 'es',
  PS: 'ar',
  PW: 'en',
  PY: 'es',
  QA: 'ar',
  RE: 'fr',
  RO: 'ro',
  RW: 'rw',
  SA: 'ar',
  SB: 'en',
  SC: 'fr',
  SD: 'ar',
  SG: 'zh',
  SH: 'en',
  SI: 'sl',
  SJ: 'no',
  SL: 'en',
  SM: 'it',
  SN: 'fr',
  SO: 'so',
  SR: 'nl',
  ST: 'pt',
  SS: 'en',
  SV: 'es',
  SX: 'nl',
  SZ: 'en',
  TC: 'en',
  TD: 'fr',
  TF: 'fr',
  TG: 'fr',
  TH: 'th',
  TJ: 'tg',
  TK: 'tkl',
  TL: 'pt',
  TM: 'tk',
  TN: 'ar',
  TO: 'en',
  TT: 'en',
  TV: 'en',
  TW: 'zh',
  TZ: 'sw',
  UA: 'uk',
  UG: 'en',
  UM: 'en',
  UY: 'es',
  UZ: 'uz',
  VA: 'it',
  VC: 'en',
  VE: 'es',
  VG: 'en',
  VI: 'en',
  VN: 'vi',
  VU: 'bi',
  WF: 'fr',
  WS: 'sm',
  YE: 'ar',
  YT: 'fr',
  ZA: 'en',
  ZM: 'en',
  ZW: 'en',
}

export const rtlLocales = [
  'ar', 'he', 'fa',
]
