const axios = require("axios");
const fs = require("fs");

const availableLanguages = [
  'be',
  'uk',
  'fi',
  'hy',
  'ka',
  'en',
  'es',
  'ru',
  'fr',
  'de',
  'it',
  'pt',
  'pl',
  'srp',
  'bs',
  'hr',
  'lt',
  'lv',
  'fa',
  'tr',
  'hu',
  'ro',
  'hi',
  'cs',
  'ja',
  'tl',
  'he',
  'da',
  'sk',
  'no',
];

const codeLocaleToEnglish = {
  ar: 'Arabic',
  be: 'Belarusian',
  bs: 'Bosnian',
  cs: 'Czech',
  da: 'Danish',
  de: 'German',
  en: 'English',
  es: 'Spanish',
  fa: 'Persian',
  fi: 'Finnish',
  fr: 'French',
  he: 'Hebrew',
  hi: 'Hindi',
  hr: 'Croatian',
  hu: 'Hungarian',
  hy: 'Armenian',
  it: 'Italian',
  ja: 'Japanese',
  ka: 'Georgian',
  lt: 'Lithuanian',
  lv: 'Latvian',
  no: 'Norwegian',
  pl: 'Polish',
  pt: 'Portuguese',
  ro: 'Romanian',
  ru: 'Russian',
  sk: 'Slovak',
  sq: 'Albanian',
  srp: 'Serbian',
  sv: 'Swedish',
  tl: 'Filipino',
  tr: 'Turkish',
  uk: 'Ukrainian',
  zh: 'Chinese'
}

const getAirtableData = async (tableId, {filterByFormula, fields, sortBy, sortDirection} = {}) => {
  let params = {
    tableName: tableId,
    perPage: 'all',
    filterByFormula,
    fields: fields.join(','),
    sortBy,
    sortDirection,
  };

  const {data} = await axios({
    method: 'get',
    url: 'https://v1.nocodeapi.com/rudnitskih/airtable/buxqXKgFqYnljHiR',
    params,
  });

  return data.records.map(({fields}) => fields);
};

const getMessages = async (Language) => {
  return getAirtableData('tbl9ilTjFUtO5Tsnm', {
    fields: ['Date', 'Tags', 'Poster', Language],
    cacheTime: 600,
    filterByFormula: `NOT({${Language}} = '')`,
    sortBy: 'Date',
    sortDirection: 'desc',
  });
};


async function run() {
  for (const code of availableLanguages) {
    const Language = codeLocaleToEnglish[code];

    const data = await getMessages(Language);
    console.log('Code=', code);
    console.log('Data=', data);

    fs.writeFileSync(`${__dirname}/byLocale/${Language}.json`, JSON.stringify(data, null, 2));
    // await delay(1000);
  }
}

run();
