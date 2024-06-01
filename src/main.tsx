import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
    <input id="device_token" name="device_token" placeholder="ggggggggg" />
  </React.StrictMode>,
);
