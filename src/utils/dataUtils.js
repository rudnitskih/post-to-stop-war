import {countryToLanguage} from './localeUtils';
import {getQueryParam} from "./urlUtils";
import {logMessage} from "./errorHandlingUtils";

const filterWrongMessages = (data, spreadsheetName) => {
  return data.filter((row, i) => {
    if (Object.values(row).filter((value) => /\w/.test(value)).length === 0) {
      return false;
    }

    const {Country, LocalizedMessage, Hidden} = row;
    let error = null;

    if (!Country) {
      error = 'MISSING_LOCALE';
    } else if (countryToLanguage[Country] === undefined) {
      error = 'WRONG_LOCALE';
    } else if (!LocalizedMessage) {
      error = 'MISSING_LOCALIZED_MESSAGE';
    }

    if (!error && (!Hidden || getQueryParam('showAll') !== null)) {
      return true;
    }

    logMessage(`${error} on ${i + 2} line in "${spreadsheetName}"`);

    return false;
  });
}

// https://stackoverflow.com/a/34890276
const groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
