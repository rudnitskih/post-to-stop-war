import {ukrainianToCodeLocale} from './localeUtils';
import {getQueryParam} from "./urlUtils";
import {getTranslations} from "./translate";

export const getPosterUrl = (poster) => {
  return poster?.thumbnails?.large?.url;
}

export const prepareMessages = (messages) => {
  const tagsTranslations = Object.fromEntries(Object.entries(getTranslations()).filter(([key]) => key.startsWith('main.tags')).map(
    ([key, {uk}]) => [uk, key]
  ));

  return groupBy(
    filterWrongMessages(messages).map((rawMessage) => {
      const {Language, Attachment, Message, Tags} = rawMessage;
      return {
        date: new Date(rawMessage.Date),
        locale: ukrainianToCodeLocale[Language],
        poster: Attachment[0],
        content: Message,
        tags: Array.isArray(Tags) ? Tags.map((tagInUkrainian) => tagsTranslations[tagInUkrainian]) : [],
      };
    }).sort((a, b) => b.date - a.date),
    'locale',
  );
};

const filterWrongMessages = (data) => {
  return data.filter((row, i) => {

    try {
      const {Language, Date, Attachment, Message} = row;
      let error = null;

      if (!Language) {
        error = 'MISSING_LOCALE';
      } else if (ukrainianToCodeLocale[Language] === undefined) {
        error = 'WRONG_LOCALE';
      } else if (!Message) {
        error = 'MISSING_MESSAGE';
      } else if (!Date) {
        error = 'MISSING_DATE';
      } else if (!Attachment?.[0]?.thumbnails?.large?.url) {
        error = 'MISSING_POSTER';
      }

      if (error) {
        throw new Error(error);
      } else {
        return true;
      }
    } catch (e) {
      console.error(`${e.message} on ${i} line in "Messages"`);

      return getQueryParam('showAll') !== null;
    }
  });
}

// https://stackoverflow.com/a/34890276
const groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
