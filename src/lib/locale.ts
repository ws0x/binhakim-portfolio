import { LOCALE, TEXT_DIRECTION } from "./site";

export type SupportedLocale = typeof LOCALE;

export function localeConfig(locale: SupportedLocale = LOCALE) {
  return { locale, direction: TEXT_DIRECTION } as const;
}

export function localizedPath(path: string, locale: SupportedLocale = LOCALE) {
  // English remains the default unprefixed URL. Arabic can add a locale
  // segment later without changing content ownership or URL helpers.
  return locale === LOCALE ? path : path;
}
