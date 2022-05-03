const Airtable = require('airtable');
const airtableBase = new Airtable({apiKey: 'keyG6p1dsBC4ZRjNZ'}).base('appQSXeCJyvjWfmwR');


const getAirtableData = (tableId) => {
  let fields = []

  return new Promise((resolve, reject) => {
    airtableBase(tableId).select({
      view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
      fields = records.map(({fields}) => fields);

      fetchNextPage();
    }, function done(err) {
      if (err) { reject(err) } else (resolve(fields))
    });
  });
}

export const getMessages = async () => {
  return getAirtableData('tblHGaLwTLMlN7eNL');
}

export const getContent = async () => {
  return (await getAirtableData('tblU1cR6MIJoY14zJ')).reduce((acc, row) => {
    acc[row.key] = {
      uk: row['Ukrainian'],
      en: row['English'],
    }

    return acc;
  }, {});
}
