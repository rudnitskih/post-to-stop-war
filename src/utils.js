import {countryToLanguage, getCountryDisplayName} from './localeUtils';
import {getQueryParam} from "./urlUtils";
import Papa from "papaparse";

export * from './localeUtils';

export const filterWrongMessages = (data) => {
  return data.filter((row) => {
    const { Country, LocalizedMessage, Hidden } = row;
    const hasError = countryToLanguage[Country] === undefined || !LocalizedMessage;

    if (hasError) {
      console.error('Row with issues', row);
    }

    return !hasError && (!Hidden || getQueryParam('showAll') !== null);
  });
}

export const loadSpreadsheet = (spreadsheetUrl) => {
  return new Promise((resolve, reject) => {
    Papa.parse(spreadsheetUrl, {
      download: true,
      header: true,
      complete: (results) => {
        resolve(results.data);
      },
      error: (err, file, inputElem, reason) => {
        reject(err);
      }
    });
  })
}
