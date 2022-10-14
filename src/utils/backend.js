import {getQueryParam} from "./urlUtils";
import {codeLocaleToEnglish, ukrainianToCodeLocale} from "./localeUtils";

const encodeGetParams = p =>
  Object.entries(p).map(kv => kv.join("=")).join("&");

const isForceMode = () => {
  return getQueryParam('force') === 'true';
};

const TableFields = {
  Date: 'Date',
  Poster: 'Poster',
  Tags: 'Tags',
};

const getAirtableData = async (tableId, {filterByFormula, cacheTime, fields} = {}) => {
  let params = {
    tableName: tableId,
    cacheTime: isForceMode() ? 0 : cacheTime,
    perPage: 'all',
  };

  if (filterByFormula) {
    params.filterByFormula = filterByFormula;
  }

  if (fields) {
    params.fields = fields.join(',');
  }

  const response = await fetch(
    `https://v1.nocodeapi.com/rudnitskih/airtable/buxqXKgFqYnljHiR?${encodeGetParams(params)}`
  );

  const {records} = await response.json();

  return records.map(({fields}) => fields);
};

export const getMessages = async (Language) => {
  const englishLanguage = codeLocaleToEnglish[ukrainianToCodeLocale[Language]]

  return (await getAirtableData('tbl9ilTjFUtO5Tsnm', {
      cacheTime: 300,
      fields: [TableFields.Date, TableFields.Tags, TableFields.Poster, englishLanguage],
      filterByFormula: `NOT({${englishLanguage}} = '')`
    })).map((data) => {
      const {Date, Tags, Poster} = data;
      return {
        Language: englishLanguage,
        Date,
        Tags,
        Attachment: Poster,
        Message: data[englishLanguage],
      };
    });
};

export const getContent = async () => {
  return (await getAirtableData('tblDKCe0jqCTAfGpH', {cacheTime: 600})).reduce((acc, row) => {
    acc[row.key] = {
      ua: row['Ukrainian']?.trim(),
      en: row['English']?.trim(),
    };

    return acc;
  }, {});
};
