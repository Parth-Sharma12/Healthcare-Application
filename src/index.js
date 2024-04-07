import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
const root = ReactDOM.createRoot(document.getElementById('root'));
i18n
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        translation: require('../src/Doctor/locales/en.json')
      },
      hi: {
        translation: require('../src/Doctor/locales/hi.json')
      },
      ka: {
        translation: require('../src/Doctor/locales/ka.json')
      }
    },
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false
    }
  });
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
    <App />
    </I18nextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
