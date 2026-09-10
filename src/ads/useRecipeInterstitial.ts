import { useCallback, useEffect, useRef } from 'react';
import { INTERSTITIAL_AD_UNIT_ID } from './adUnits';
import { AdsModule } from './adsModule';

interface RecipeInterstitial {
  showThenContinue: (onDone: () => void) => void;
}

/**
 * Real implementation, only ever called when `AdsModule` is non-null (i.e.
 * ARE_ADS_SUPPORTED is true). `AdsModule` is a fixed value for the lifetime
 * of the app, so `useRecipeInterstitial` below always takes the same branch
 * on every render — the two hooks are never swapped mid-session, so this
 * doesn't violate the rules of hooks for any given component instance.
 */
function useSupportedInterstitial(): RecipeInterstitial {
  const { isLoaded, isClosed, load, show } = AdsModule!.useInterstitialAd(INTERSTITIAL_AD_UNIT_ID, {
    requestNonPersonalizedAdsOnly: true,
  });
  const pendingCallbackRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!isClosed || !pendingCallbackRef.current) return;
    const callback = pendingCallbackRef.current;
    pendingCallbackRef.current = null;
    callback();
    load();
  }, [isClosed, load]);

  const showThenContinue = useCallback(
    (onDone: () => void) => {
      if (!isLoaded) {
        onDone();
        return;
      }
      try {
        pendingCallbackRef.current = onDone;
        show();
      } catch {
        pendingCallbackRef.current = null;
        onDone();
      }
    },
    [isLoaded, show],
  );

  return { showThenContinue };
}

/** Expo Go (or any environment without the native module): navigate immediately. */
function useUnsupportedInterstitial(): RecipeInterstitial {
  const showThenContinue = useCallback((onDone: () => void) => onDone(), []);
  return { showThenContinue };
}

/**
 * Preloads a test interstitial and shows it right before a recipe detail
 * screen opens. Falls back to calling `onDone` immediately if ads aren't
 * supported (Expo Go) or the ad isn't ready yet, so navigation is never
 * blocked by a slow/failed ad load.
 */
export function useRecipeInterstitial(): RecipeInterstitial {
  return AdsModule ? useSupportedInterstitial() : useUnsupportedInterstitial();
}
