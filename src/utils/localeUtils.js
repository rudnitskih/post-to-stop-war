export const getLocale = window.app.getLocale;

export const getLocaleDisplayName = (code) => capitalizeFirstLetter(
  (new Intl.DisplayNames([getLocale()], {type: 'language'})).of(code)
);

export const getLocaleDirection = (locale) => {
  return ['ar', 'he', 'fa'].includes(locale) ? 'rtl' : 'ltr';
};

export const getMessagesLanguage = window.app.getMessagesLanguage;

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

export const codeLocaleToEnglish = window.app.codeLocaleToEnglish;

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
