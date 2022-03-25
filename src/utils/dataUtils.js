import {countryToLanguage} from './localeUtils';
import {getQueryParam} from "./urlUtils";
import Papa from "papaparse";
import {logMessage} from "./errorHandlingUtils";

export * from './localeUtils';

export const combineMessages = (generalMessages, messagesOfTheDay) => {
  generalMessages = filterWrongMessages(generalMessages, 'All Messages');
  messagesOfTheDay = filterWrongMessages(messagesOfTheDay, 'Messages of The Day')
    .map((messageOfTheDay) => ({
      highlighted: messageOfTheDay['GeneralMessage'] !== 'TRUE',
      ...messageOfTheDay,
    }))
    .sort((a, b) => (a.highlighted === b.highlighted) ? 0 : a.highlighted ? -1 : 1);


  const groupedGeneralMessages = groupBy(generalMessages, 'Country');
  const groupedMessagesOfTheDay = groupBy(messagesOfTheDay, 'Country');

  const countries = [...new Set([
    ...Object.keys(groupedGeneralMessages),
    ...Object.keys(groupedMessagesOfTheDay)
  ])];

  return countries.reduce((acc, country) => {
    const messagesOfTheDayForCountry = groupedMessagesOfTheDay[country];
    const generalMessagesForCountry = groupedGeneralMessages[country]

    acc[country] = [
      ...(messagesOfTheDayForCountry ? messagesOfTheDayForCountry : []),
      ...(generalMessagesForCountry ? generalMessagesForCountry : [])
    ];

    return acc;
  }, {});
};

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

export const loadSpreadsheet = (spreadsheetID) => {
  return new Promise((resolve, reject) => {
    Papa.parse(`https://docs.google.com/spreadsheets/d/e/${spreadsheetID}/pub?output=csv`, {
      download: true,
      header: true,
      complete: (results) => {
        resolve(results.data);
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};

// https://stackoverflow.com/a/34890276
const groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
