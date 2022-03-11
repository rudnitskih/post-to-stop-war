import {countryToLanguage} from './localeUtils';
import {getQueryParam} from "./urlUtils";
import Papa from "papaparse";
import * as Sentry from "@sentry/react";

export * from './localeUtils';

export const filterWrongMessages = (data) => {
  return data.filter((row) => {
    const { Country, LocalizedMessage, Hidden } = row;
    const hasError = countryToLanguage[Country] === undefined || !LocalizedMessage;

    if (hasError && !Hidden) {
      console.error('Row with issues', row);
      Sentry.captureMessage(`Row with issues ${Object.values(row).filter(Boolean).join('__')}`);
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
      error: (error) => {
        reject(error);
      }
    });
  })
}
