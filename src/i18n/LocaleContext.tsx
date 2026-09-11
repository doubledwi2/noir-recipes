import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { Locale } from '../types';
import { localeStorage } from '../utils/storage';

const DEFAULT_LOCALE: Locale = 'id';

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  isLoaded: boolean;
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [isLoaded, setIsLoaded] = useState(false);
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    localeStorage.load().then((saved) => {
      if (saved) setLocaleState(saved);
      hasLoadedRef.current = true;
      setIsLoaded(true);
    });
  }, []);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    // Only persist once the initial load has resolved, so we never overwrite
    // a saved preference with the default while it's still being read.
    if (hasLoadedRef.current) localeStorage.save(next);
  };

  const value = useMemo<LocaleContextValue>(() => ({ locale, setLocale, isLoaded }), [locale, isLoaded]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used within a LocaleProvider');
  return ctx;
}
