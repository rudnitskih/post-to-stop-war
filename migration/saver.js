const fs = require('fs');
const converter = require('./converter2to3');
const initialData = require('./10_10_2022.json');

Object.entries(converter(initialData)).forEach(([date, data]) => {
  fs.writeFileSync(`${__dirname}/byDate/${date}.json`, JSON.stringify(data, null, 2));
})
