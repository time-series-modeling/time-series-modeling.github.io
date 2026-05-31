import { en } from './en';
import { zh } from './zh';
import type { Translations } from './en';

export type { Translations };

export const SUPPORTED_LOCALES = ['en', 'zh'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

const translations: Record<SupportedLocale, Translations> = { en, zh };

export function getTranslations(locale: string): Translations {
  const key = SUPPORTED_LOCALES.includes(locale as SupportedLocale)
    ? (locale as SupportedLocale)
    : 'en';
  return translations[key];
}

export function getAlternateLocales(currentLocale: SupportedLocale): SupportedLocale[] {
  return SUPPORTED_LOCALES.filter((l) => l !== currentLocale);
}

export function localePath(locale: SupportedLocale, path: string): string {
  const base = locale === 'en' ? '' : `/${locale}`;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export { en, zh };
