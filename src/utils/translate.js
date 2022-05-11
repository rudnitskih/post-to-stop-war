import {getSiteLang} from "./urlUtils";
import showdown from "showdown";

export const setTranslations = (translations) => {
  if (!window.app) window.app = {};

  window.app.translationKeys = translations;
}

export const getTranslations = () => window.app.translationKeys;

const markdownConverter = new showdown.Converter();

export function t(key, isMarkdown) {
  const keys = getTranslations();
  let lang = getSiteLang();

  if (lang !== 'ua') {
    lang = 'en';
  }

  const content = keys[key]?.[lang] || (keys[key] ? Object.values(keys[key])[0] : '');

  return isMarkdown ? markdownConverter.makeHtml(content) : content;
}
