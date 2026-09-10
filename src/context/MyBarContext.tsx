import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { myBarStorage } from '../utils/storage';

interface MyBarContextValue {
  ownedIngredientIds: Set<string>;
  hasIngredient: (ingredientId: string) => boolean;
  toggleIngredient: (ingredientId: string) => void;
  isLoaded: boolean;
}

const MyBarContext = createContext<MyBarContextValue | undefined>(undefined);

export function MyBarProvider({ children }: { children: React.ReactNode }) {
  const [ownedIngredientIds, setOwnedIngredientIds] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    myBarStorage.load().then((ids) => {
      setOwnedIngredientIds(new Set(ids));
      hasLoadedRef.current = true;
      setIsLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!hasLoadedRef.current) return;
    myBarStorage.save(Array.from(ownedIngredientIds));
  }, [ownedIngredientIds]);

  const toggleIngredient = (ingredientId: string) => {
    setOwnedIngredientIds((prev) => {
      const next = new Set(prev);
      if (next.has(ingredientId)) {
        next.delete(ingredientId);
      } else {
        next.add(ingredientId);
      }
      return next;
    });
  };

  const value = useMemo<MyBarContextValue>(
    () => ({
      ownedIngredientIds,
      hasIngredient: (ingredientId: string) => ownedIngredientIds.has(ingredientId),
      toggleIngredient,
      isLoaded,
    }),
    [ownedIngredientIds, isLoaded],
  );

  return <MyBarContext.Provider value={value}>{children}</MyBarContext.Provider>;
}

export function useMyBar(): MyBarContextValue {
  const ctx = useContext(MyBarContext);
  if (!ctx) throw new Error('useMyBar must be used within a MyBarProvider');
  return ctx;
}
