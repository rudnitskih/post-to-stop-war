import * as Sentry from "@sentry/react";

export const logError = (error) => {
  console.error(error);
  Sentry.captureException(error);
}

export const logMessage = (message) => {
  console.error(message);
  Sentry.captureMessage(message);
}
