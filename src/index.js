import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import App from 'components/App';
import * as serviceWorker from 'serviceWorkerRegistration';

Sentry.init({
  dsn: "https://e8fe7365216b4314a1a1aa0c43785687@o1065943.ingest.sentry.io/6244136",
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

if ('serviceWorker' in navigator) {
  serviceWorker.register();
}
