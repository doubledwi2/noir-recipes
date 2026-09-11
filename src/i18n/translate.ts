import type { Locale, LocalizedText } from '../types';

export function translateText(text: LocalizedText, locale: Locale): string {
  return text[locale] ?? text.id;
}
