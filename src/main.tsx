import * as Sentry from "@sentry/react";
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

Sentry.init({
  dsn: "https://27b397b1d9f80a214e538a50172aca2e@o4508534139715584.ingest.us.sentry.io/4508590967291904",
  integrations: [],
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
