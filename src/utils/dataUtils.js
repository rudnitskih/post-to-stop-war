import {ukrainianToCodeLocale} from './localeUtils';
import {getQueryParam} from "./urlUtils";
import {getTranslations} from "./translate";

export const getPosterUrl = (poster) => {
  return poster?.thumbnails?.large?.url;
}

export const normalizeTags = (Tags) => {
  const tagsTranslations = Object.fromEntries(Object.entries(getTranslations()).filter(([key]) => key.startsWith('main.tags')).map(
    ([key, {ua}]) => [ua, key]
  ));

  return Array.isArray(Tags) ? Tags.map((tagInUkrainian) => tagsTranslations[tagInUkrainian]) : []
}

export const prepareMessages = (messages) => {
  return groupBy(
    filterWrongMessages(messages).map((rawMessage) => {
      const {Language, Attachment, Message, Tags} = rawMessage;
      return {
        date: new Date(rawMessage.Date),
        locale: ukrainianToCodeLocale[Language],
        poster: Attachment[0],
        content: Message,
        tags: normalizeTags(Tags),
      };
    }).sort((a, b) => b.date - a.date),
    'locale',
  );
};

export const prepareGallery = (galleryBase) => {
  return shuffleArray(
    galleryBase
      .filter(({Poster}) => Poster?.length > 0)
      .flatMap(({Poster, Tags}) => Poster.map((onePoster) => ({...onePoster, tags: normalizeTags(Tags)})))
      .filter((poster) => poster?.thumbnails?.large?.url)
  );
}

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

// https://stackoverflow.com/a/12646864
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}
