import showdown from "showdown";
import {getLocale} from "./localeUtils";

export const setTranslations = (translations) => {
  if (!window.app) window.app = {};

  window.app.translationKeys = translations;
}

export const getTranslations = () => window.app.translationKeys;

const markdownConverter = new showdown.Converter();

export function t(key, isMarkdown) {
  const keys = getTranslations();
  const locale = getLocale();

  const content = keys[key]?.[locale] || (keys[key] ? Object.values(keys[key])[0] : '');

  return isMarkdown ? markdownConverter.makeHtml(content) : content;
}
