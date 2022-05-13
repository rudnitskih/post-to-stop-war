const getAirtableData = async (tableId) => {
  const response = await fetch(`https://v1.nocodeapi.com/rudnitskih/airtable/IqXAPQmtDjOXxDtO?tableName=${tableId}&perPage=all`);
  const {records} = await response.json();

  return records.map(({fields}) => fields);
};

export const getMessages = async () => {
  return getAirtableData('tblHGaLwTLMlN7eNL');
}

export const getContent = async () => {
  return (await getAirtableData('tblU1cR6MIJoY14zJ')).reduce((acc, row) => {
    acc[row.key] = {
      ua: row['Ukrainian']?.trim(),
      en: row['English']?.trim(),
    }

    return acc;
  }, {});
}

export const getGallery = async () => {
  return getAirtableData('tblrGKBALioqrnz1r');
}
