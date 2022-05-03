import {getSiteLang} from "./urlUtils";

export const setTranslations = (translations) => {
  if (!window.app) window.app = {};

  window.app.translationKeys = translations;
}

export const getTranslations = () => window.app.translationKeys;

export function t(key) {
  const keys = getTranslations();
  let lang = getSiteLang();

  if (lang !== 'en') {
    lang = 'uk';
  }

  return keys[key]?.[lang] || (keys[key] ? Object.values(keys[key])[0] : '');
}
