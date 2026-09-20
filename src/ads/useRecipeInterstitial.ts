import { useCallback, useEffect, useRef } from 'react';
import { INTERSTITIAL_AD_UNIT_ID } from './adUnits';
import { AdsModule } from './adsModule';
import { useSubscription } from '../subscription/SubscriptionContext';

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
 * supported (Expo Go), the ad isn't ready yet, or the user is Pro (no ads
 * at all), so navigation is never blocked by a slow/failed ad load.
 *
 * Both branches below are hooks, called unconditionally on every render (the
 * `AdsModule` check is a fixed value for the app's lifetime, same as before
 * this file gated on subscription status too) -- only the returned value
 * differs based on `isPro`, which is safe under the rules of hooks.
 */
export function useRecipeInterstitial(): RecipeInterstitial {
  const { isPro } = useSubscription();
  const adInterstitial = AdsModule ? useSupportedInterstitial() : useUnsupportedInterstitial();
  const skipInterstitial = useUnsupportedInterstitial();
  return isPro ? skipInterstitial : adInterstitial;
}
