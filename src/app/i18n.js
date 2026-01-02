import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enCommon from '../locales/en/common.json';
import frCommon from '../locales/fr/common.json';
import esCommon from '../locales/es/common.json';
import zuCommon from '../locales/zu/common.json';
import haCommon from '../locales/ha/common.json';
import swCommon from '../locales/sw/common.json';

const resources = {
  en: {
    common: enCommon,
  },
  fr: {
    common: frCommon,
  },
  es: {
    common: esCommon,
  },
  zu: {
    common: zuCommon,
  },
  ha: {
    common: haCommon,
  },
  sw: {
    common: swCommon,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    defaultNS: 'common',
  });

export default i18n; 