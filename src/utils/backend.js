import {codeLocaleToUkrainian, getLocale} from "./localeUtils";
import {getQueryParam} from "./urlUtils";

const encodeGetParams = p =>
  Object.entries(p).map(kv => kv.map(encodeURIComponent).join("=")).join("&");

const getAirtableData = async (tableId, {filterByFormula, cacheTime} = {}) => {
  let params = {
    tableName: tableId,
    cacheTime: getQueryParam('force') === 'true' ? 0 : cacheTime,
  }

  if (filterByFormula) {
    params.filterByFormula = filterByFormula;
  } else {
    params.perPage = 'all';
  }

  const response = await fetch(`https://v1.nocodeapi.com/rudnitskih/airtable/IqXAPQmtDjOXxDtO?${encodeGetParams(params)}`);
  const {records} = await response.json();

  return records.map(({fields}) => fields);
};

export const getMessages = async (language) => {
  language = codeLocaleToUkrainian[language] || codeLocaleToUkrainian[getLocale()];

  return getAirtableData('tblHGaLwTLMlN7eNL', {
    cacheTime: 300,
    filterByFormula: getQueryParam('loadAll') === 'true' ? undefined : `({Language} = "${language}")`
  });
}

export const getContent = async () => {
  return (await getAirtableData('tblU1cR6MIJoY14zJ', {cacheTime: 600})).reduce((acc, row) => {
    acc[row.key] = {
      ua: row['Ukrainian']?.trim(),
      en: row['English']?.trim(),
    }

    return acc;
  }, {});
}

export const getGallery = async () => {
  return getMessages('en');
}
