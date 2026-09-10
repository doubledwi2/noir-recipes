import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Locale } from '../types';

const FAVORITES_KEY = '@noirmix/favorites';
const BAR_KEY = '@noirmix/my-bar';
const LOCALE_KEY = '@noirmix/locale';

async function readIdSet(key: string): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === 'string') : [];
  } catch {
    return [];
  }
}

async function writeIdSet(key: string, ids: string[]): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(ids));
  } catch {
    // Local persistence best-effort only; in-memory state still works this session.
  }
}

export const favoritesStorage = {
  load: () => readIdSet(FAVORITES_KEY),
  save: (ids: string[]) => writeIdSet(FAVORITES_KEY, ids),
};

export const myBarStorage = {
  load: () => readIdSet(BAR_KEY),
  save: (ids: string[]) => writeIdSet(BAR_KEY, ids),
};

export const localeStorage = {
  async load(): Promise<Locale | null> {
    try {
      const raw = await AsyncStorage.getItem(LOCALE_KEY);
      return raw === 'id' || raw === 'en' ? raw : null;
    } catch {
      return null;
    }
  },
  async save(locale: Locale): Promise<void> {
    try {
      await AsyncStorage.setItem(LOCALE_KEY, locale);
    } catch {
      // Best-effort only — locale still applies for the rest of this session.
    }
  },
};
