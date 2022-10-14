const getQueryParam = (param) => {
  return (new URLSearchParams(window.location.search)).get(param);
}

const encodeGetParams = p =>
  Object.entries(p).map(kv => kv.join("=")).join("&");

const isForceMode = () => {
  return getQueryParam('force') === 'true' || window.location.hostname === 'localhost';
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
  return getAirtableData('tbl9ilTjFUtO5Tsnm', {
      cacheTime: 300,
      fields: ['Date', 'Tags', 'Poster', Language],
      filterByFormula: `NOT({${Language}} = '')`
    });
};

export const getContent = async () => {
  return (await getAirtableData('tblDKCe0jqCTAfGpH', {cacheTime: 600}));
};
