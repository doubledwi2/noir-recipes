import { useCallback } from 'react';
import type { LocalizedText } from '../types';
import { useLocale } from './LocaleContext';
import { UI_STRINGS } from './strings';
import { translateText } from './translate';

/**
 * One-stop hook for screens/components: current locale, the switcher, the
 * static UI string table for that locale, and `t()` to resolve any
 * `LocalizedText` field from recipe/ingredient data.
 */
export function useI18n() {
  const { locale, setLocale, isLoaded } = useLocale();
  const strings = UI_STRINGS[locale];
  const t = useCallback((text: LocalizedText) => translateText(text, locale), [locale]);

  return { locale, setLocale, isLoaded, strings, t };
}
