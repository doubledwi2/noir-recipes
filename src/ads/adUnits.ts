import { Platform } from 'react-native';
import Constants, { AppOwnership } from 'expo-constants';

// AdMob native module hanya tersedia di custom dev client / build produksi
// (lewat config plugin di app.json), bukan di Expo Go. `appOwnership` sudah
// deprecated di SDK terbaru untuk kebutuhan umum, tapi masih paling akurat
// khusus untuk mendeteksi "sedang jalan di dalam Expo Go" seperti di sini.
//
// PENTING: konstanta ini harus dihitung tanpa mengimpor
// 'react-native-google-mobile-ads' sama sekali di file ini. File ini dipakai
// oleh hampir semua modul ads/*, dan `import` statement dari package itu
// di-hoist lalu dieksekusi lebih dulu sebelum kode kita sendiri jalan —
// itulah yang bikin Expo Go crash sebelumnya meski sudah ada pengecekan if.
export const ARE_ADS_SUPPORTED = Constants.appOwnership !== AppOwnership.Expo;

// Ad Unit ID produksi (Android) — akun AdMob asli "Noir Mix", terpasang
// 13 Sep 2026. iOS belum ada app/ad unit di AdMob (belum ada rencana build
// iOS), jadi nilai iOS masih sengaja dibiarkan Test Ad Unit ID resmi dari
// Google supaya tidak pernah kepakai di produksi sebelum benar-benar disiapkan.
// Referensi test ID: https://developers.google.com/admob/ios/test-ads
export const BANNER_AD_UNIT_ID = Platform.select({
  ios: 'ca-app-pub-3940256099942544/2934735716',
  android: 'ca-app-pub-4796059747594177/2822076168',
  default: 'ca-app-pub-4796059747594177/2822076168',
});

export const INTERSTITIAL_AD_UNIT_ID = Platform.select({
  ios: 'ca-app-pub-3940256099942544/4411468910',
  android: 'ca-app-pub-4796059747594177/5169037906',
  default: 'ca-app-pub-4796059747594177/5169037906',
});
