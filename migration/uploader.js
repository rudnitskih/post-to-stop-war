const axios = require('axios');
const converter = require('./converter2to3');
const initialData = require('./10_10_2022.json');

const result = Object.entries(converter(initialData)).map(([date, info]) => {
  return {
    ...info,
    Date: date,
    Poster: info.Poster.map((url) => ({url}))
  }
}).sort((a, b) => new Date(a['Date']) - new Date(b['Date']))

async function run() {
  for (const group of result) {
    try {
      await axios({
        method: 'post',
        url: 'https://v1.nocodeapi.com/rudnitskih/airtable/buxqXKgFqYnljHiR',
        params: {tableName: 'Messages'},
        data: [group]
      });
      await delay(1000);
    } catch (e) {
      console.log('group', group.date);
      console.log(e);
    }
  }
}

run();

function delay(t) {
  return new Promise(function(resolve) {
    setTimeout(() => resolve(), t)
  });
}
