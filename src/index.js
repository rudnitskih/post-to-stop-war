import React from 'react';
import ReactDOM from "react-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

console.log('---render.com---');

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: "https://c3f52d7fcaaf44a1bb02480fcbec1d12@o1164917.ingest.sentry.io/6254316",
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 0.1,
  });
}

ReactDOM.render(
  <Sentry.ErrorBoundary fallback={<p>An error has occurred 😢</p>}>
    <App />
  </Sentry.ErrorBoundary>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
