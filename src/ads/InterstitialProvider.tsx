import React, { createContext, useContext } from 'react';
import { router } from 'expo-router';
import { useRecipeInterstitial } from './useRecipeInterstitial';

interface InterstitialContextValue {
  openRecipe: (recipeId: string) => void;
}

const InterstitialContext = createContext<InterstitialContextValue | undefined>(undefined);

// A single interstitial instance is shared by every screen that can open a
// recipe (Home, Favorites, Bisa Dibuat), so we preload one test ad instead of
// one per screen.
export function InterstitialProvider({ children }: { children: React.ReactNode }) {
  const { showThenContinue } = useRecipeInterstitial();

  const openRecipe = (recipeId: string) => {
    showThenContinue(() => router.push(`/recipe/${recipeId}`));
  };

  return <InterstitialContext.Provider value={{ openRecipe }}>{children}</InterstitialContext.Provider>;
}

export function useOpenRecipe(): (recipeId: string) => void {
  const ctx = useContext(InterstitialContext);
  if (!ctx) throw new Error('useOpenRecipe must be used within an InterstitialProvider');
  return ctx.openRecipe;
}
