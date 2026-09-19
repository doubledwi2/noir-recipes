// Metro selects this file for browser previews, keeping native AdMob views
// out of the web bundle. Native builds continue to use adsModule.ts.
export const AdsModule: typeof import('react-native-google-mobile-ads') | null = null;
