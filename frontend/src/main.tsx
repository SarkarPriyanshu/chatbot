import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import 'antd/dist/antd.css'; // or reset.css if available

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error("Root element not found in index.html");

createRoot(rootEl).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);