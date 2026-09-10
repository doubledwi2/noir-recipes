import { ARE_ADS_SUPPORTED } from './adUnits';

/**
 * The one and only place that touches `react-native-google-mobile-ads`.
 *
 * A plain `import ... from 'react-native-google-mobile-ads'` is hoisted by
 * the module system and runs immediately when the file is loaded — before
 * any `if (ARE_ADS_SUPPORTED)` check in our own code gets a chance to run.
 * That's what caused the "TurboModuleRegistry.getEnforcing(...):
 * 'RNGoogleMobileAdsModule' could not be found" crash in Expo Go, even
 * though every call site already guarded its *usage* of the module.
 *
 * A `require()` call, in contrast, executes exactly where it's written. By
 * wrapping it in this ternary, the native module is only ever touched when
 * `ARE_ADS_SUPPORTED` is true (i.e. never inside Expo Go) — every other
 * ads/* file should import `AdsModule` from here instead of importing the
 * package directly.
 */
export const AdsModule: typeof import('react-native-google-mobile-ads') | null = ARE_ADS_SUPPORTED
  ? (require('react-native-google-mobile-ads') as typeof import('react-native-google-mobile-ads'))
  : null;
