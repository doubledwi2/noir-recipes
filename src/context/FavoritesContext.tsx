import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { favoritesStorage } from '../utils/storage';

interface FavoritesContextValue {
  favoriteIds: Set<string>;
  isFavorite: (recipeId: string) => boolean;
  toggleFavorite: (recipeId: string) => void;
  isLoaded: boolean;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    favoritesStorage.load().then((ids) => {
      setFavoriteIds(new Set(ids));
      hasLoadedRef.current = true;
      setIsLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!hasLoadedRef.current) return;
    favoritesStorage.save(Array.from(favoriteIds));
  }, [favoriteIds]);

  const toggleFavorite = (recipeId: string) => {
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (next.has(recipeId)) {
        next.delete(recipeId);
      } else {
        next.add(recipeId);
      }
      return next;
    });
  };

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favoriteIds,
      isFavorite: (recipeId: string) => favoriteIds.has(recipeId),
      toggleFavorite,
      isLoaded,
    }),
    [favoriteIds, isLoaded],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within a FavoritesProvider');
  return ctx;
}
