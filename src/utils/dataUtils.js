import {countryToLanguage} from './localeUtils';
import {getQueryParam} from "./urlUtils";
import Papa from "papaparse";
import {logMessage} from "./errorHandlingUtils";

export * from './localeUtils';

export const combineMessages = (generalMessages, messagesOfTheDay) => {
  generalMessages = filterWrongMessages(generalMessages, 'All Messages');
  messagesOfTheDay = filterWrongMessages(messagesOfTheDay, 'Messages of The Day')
    .map((messageOfTheDay) => ({
      highlighted: true,
      ...messageOfTheDay,
    }));

  const groupedGeneralMessages = groupBy(generalMessages, 'Country');
  const groupedMessagesOfTheDay = groupBy(messagesOfTheDay, 'Country');

  return Object.entries(groupedGeneralMessages).reduce((acc, [country, messages]) => {
    const messagesOfTheDayForCountry = groupedMessagesOfTheDay[country];

    acc[country] = [
      ...(messagesOfTheDayForCountry ? messagesOfTheDayForCountry : []),
      ...messages
    ];

    return acc;
  }, {});
};

const filterWrongMessages = (data, spreadsheetName) => {
  return data.filter((row, i) => {
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

    logMessage(`${error} on ${i + 1} line in "${spreadsheetName}"`);
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
