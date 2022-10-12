const rtlLocales = ['ar', 'he', 'fa'];


export const getLocale = () => window.location.pathname.split('/')?.[1]?.toLowerCase() === 'ua' ? 'uk' : 'en';

export const getLocaleDisplayName = (code) => capitalizeFirstLetter(
  (new Intl.DisplayNames([getLocale()], {type: 'language'})).of(code)
);

export const getLocaleDirection = (locale) => {
  return rtlLocales.includes(locale) ? 'rtl' : 'ltr';
};

export const getMessagesLanguage = (desiredLanguageCode) => {
  return codeLocaleToUkrainian[desiredLanguageCode] || codeLocaleToUkrainian[getLocale()];
}

export const availableLanguages = [
  'be',
  'uk',
  'fi',
  'hy',
  'ka',
  'en',
  'es',
  'ru',
  'fr',
  'de',
  'it',
  'pt',
  'pl',
  'srp',
  'bs',
  'hr',
  'lt',
  'lv',
  'fa',
  'tr',
  'hu',
  'ro',
  'hi',
  'cs',
  'ja',
  'tl',
  'he',
  'da',
  'sk',
  'no',
]

export const codeLocaleToUkrainian = {
  ar: 'Арабська',
  be: 'Білоруська',
  bs: 'Боснійська',
  cs: 'Чеська',
  da: 'Данська',
  de: 'Німецька',
  en: 'Англійська',
  es: 'Іспанська',
  fa: 'Перська',
  fi: 'Фінська',
  fr: 'Французька',
  he: 'Іврит',
  hi: 'Гінді',
  hr: 'Хорватська',
  hu: 'Угорська',
  hy: 'Вірменська',
  it: 'Італійська',
  ja: 'Японська',
  ka: 'Грузинська',
  lt: 'Литовська',
  lv: 'Латиська',
  no: 'Норвезька',
  pl: 'Польська',
  pt: 'Португальська',
  ro: 'Румунська',
  ru: 'Російська',
  sk: 'Словацька',
  sq: 'Албанська',
  srp: 'Сербська',
  sv: 'Шведська',
  tl: 'Філіппінська',
  tr: 'Турецька',
  uk: 'Українська',
  zh: 'Китайська'
};

export const codeLocaleToEnglish = {
  ar: 'Arabic',
  be: 'Belarusian',
  bs: 'Bosnian',
  cs: 'Czech',
  da: 'Danish',
  de: 'German',
  en: 'English',
  es: 'Spanish',
  fa: 'Persian',
  fi: 'Finnish',
  fr: 'French',
  he: 'Hebrew',
  hi: 'Hindi',
  hr: 'Croatian',
  hu: 'Hungarian',
  hy: 'Armenian',
  it: 'Italian',
  ja: 'Japanese',
  ka: 'Georgian',
  lt: 'Lithuanian',
  lv: 'Latvian',
  no: 'Norwegian',
  pl: 'Polish',
  pt: 'Portuguese',
  ro: 'Romanian',
  ru: 'Russian',
  sk: 'Slovak',
  sq: 'Albanian',
  srp: 'Serbian',
  sv: 'Swedish',
  tl: 'Filipino',
  tr: 'Turkish',
  uk: 'Ukrainian',
  zh: 'Chinese'
}

export const ukrainianToCodeLocale = swapKeysAndValues(codeLocaleToUkrainian);
export const englishToCodeLocale = swapKeysAndValues(codeLocaleToEnglish);

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// https://bobbyhadz.com/blog/javascript-swap-object-key-and-value#:~:text=To%20swap%20the%20keys%20and,with%20swapped%20keys%20and%20values.
function swapKeysAndValues(obj) {
  const swapped = Object.entries(obj).map(
    ([key, value]) => [value, key]
  );

  return Object.fromEntries(swapped);
}
