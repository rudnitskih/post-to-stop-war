import {getQueryParam} from "./urlUtils";
import {codeLocaleToEnglish, ukrainianToCodeLocale} from "./localeUtils";

const encodeGetParams = p =>
  Object.entries(p).map(kv => kv.map((part) => isNewDB() ? part : encodeURIComponent(part)).join("=")).join("&");

const isForceMode = () => {
  return getQueryParam('force') === 'true';
};

export const isNewDB = () => {
  return getQueryParam('newBase') === 'true';
};

const isLoadAll = () => {
  return getQueryParam('loadAll') === 'true';
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
  };

  if (filterByFormula) {
    params.filterByFormula = filterByFormula;
  } else {
    params.perPage = 'all';
  }

  if (fields) {
    params.fields = fields.join(',');
  }

  const response = await fetch(
    `https://v1.nocodeapi.com/rudnitskih/airtable/${
      isNewDB() ? 'buxqXKgFqYnljHiR' : 'IqXAPQmtDjOXxDtO'
    }?${encodeGetParams(params)}`
  );

  const {records} = await response.json();

  return records.map(({fields}) => fields);
};

export const getMessages = async (Language) => {
  const englishLanguage = codeLocaleToEnglish[ukrainianToCodeLocale[Language]]

  return isNewDB() ? (await getAirtableData('tbl9ilTjFUtO5Tsnm', {
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
    }) :
    getAirtableData('tblHGaLwTLMlN7eNL', {
      cacheTime: 300,
      filterByFormula: isLoadAll() ? undefined : `({Language} = "${Language}")`
    });
};

export const getContent = async () => {
  return (await getAirtableData(isNewDB() ? 'tblDKCe0jqCTAfGpH' : 'tblU1cR6MIJoY14zJ', {cacheTime: 600})).reduce((acc, row) => {
    acc[row.key] = {
      ua: row['Ukrainian']?.trim(),
      en: row['English']?.trim(),
    };

    return acc;
  }, {});
};
