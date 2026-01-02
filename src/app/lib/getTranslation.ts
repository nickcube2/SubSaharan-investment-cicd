import en from '@/locales/en/common.json';
import fr from '@/locales/fr/common.json';
import es from '@/locales/es/common.json';
import zu from '@/locales/zu/common.json';
import ha from '@/locales/ha/common.json';
import sw from '@/locales/sw/common.json';

const resources: Record<string, Record<string, string>> = { en, fr, es, zu, ha, sw };

export function getTranslation(locale: string, key: string, fallback = ''): string {
  return resources[locale]?.[key] || fallback;
} 