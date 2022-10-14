import {englishToCodeLocale} from './localeUtils';
import {getTranslations} from "./translate";

const MessagesFields = {
  Date: 'Date',
  Poster: 'Poster',
  Tags: 'Tags',
};

export const getPosterUrl = (poster) => {
  return poster?.thumbnails?.large?.url;
};

export const normalizeTags = (Tags) => {
  const tagsTranslations = Object.fromEntries(Object.entries(getTranslations()).filter(([key]) => key.startsWith('main.tags')).map(
    ([key, {ua}]) => [ua, key]
  ));

  return Array.isArray(Tags) ? Tags.map((tagInUkrainian) => tagsTranslations[tagInUkrainian]) : [];
};

export const prepareMessages = (messages) => {
  return groupBy(
    filterWrongMessages(messages).map((rawMessage) => {
      const [Language, Message] = Object.entries(rawMessage).filter(([key, value]) => {
        return !Object.keys(MessagesFields).includes(key);
      })[0];

      return {
        date: new Date(rawMessage[MessagesFields.Date]),
        locale: englishToCodeLocale[Language],
        poster: rawMessage[MessagesFields.Poster][0],
        content: Message,
        tags: normalizeTags(rawMessage[MessagesFields.Tags]),
      };
    }).sort((a, b) => b.date - a.date),
    'locale',
  );
};

export const prepareGallery = (messages) => {
  return messages
    .filter(({Poster}) => Poster?.[0]?.thumbnails?.large?.url)
    .map(({Poster, Tags}) => ({...Poster[0], tags: normalizeTags(Tags)}));
};

export const prepareTranslations = (siteContent) => {
  return siteContent.reduce((acc, row) => {
    acc[row.key] = {
      ua: row['Ukrainian']?.trim(),
      en: row['English']?.trim(),
    };

    return acc;
  }, {});
};

const filterWrongMessages = (data) => {
  return data.filter((row, i) => {

    try {
      const {Date, Poster, Tags, ...rest} = row;
      let error = null;

      if (typeof rest !== 'object' || !Object.entries(rest)[0]) {
        error = 'MISSING_DYNAMIC_PROPERTIES';
      } else if (Object.entries(rest).length > 1) {
        error = 'UNKNOWN_DYNAMIC_PROPERTIES';
      } else if (!Tags) {
        error = 'MISSING_TAGS';
      } else if (!Date) {
        error = 'MISSING_DATE';
      } else if (!Poster?.[0]?.thumbnails?.large?.url) {
        error = 'MISSING_POSTER';
      }

      if (error) {
        throw new Error(error);
      } else {
        return true;
      }
    } catch (e) {
      console.error(`${e.message} on ${i} line in "Messages"`);

      return false;
    }
  });
};

// https://stackoverflow.com/a/34890276
const groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
