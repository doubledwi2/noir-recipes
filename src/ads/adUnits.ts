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

// TODO(production): Belum ada akun AdMob produksi. Sebelum submit ke Play
// Store, daftar aplikasi ini di AdMob lalu ganti dua ID di bawah (dan
// androidAppId/iosAppId di app.json) dengan Ad Unit ID asli milikmu.
//
// Nilai di bawah ini adalah Test Ad Unit ID resmi dari Google (sama persis
// dengan yang diekspor sebagai `TestIds.BANNER` / `TestIds.INTERSTITIAL` oleh
// react-native-google-mobile-ads), ditulis langsung sebagai string supaya
// file ini tidak perlu mengimpor package tersebut.
// Referensi: https://developers.google.com/admob/android/test-ads
//            https://developers.google.com/admob/ios/test-ads
export const BANNER_AD_UNIT_ID = Platform.select({
  ios: 'ca-app-pub-3940256099942544/2934735716',
  android: 'ca-app-pub-3940256099942544/6300978111',
  default: 'ca-app-pub-3940256099942544/6300978111',
});

export const INTERSTITIAL_AD_UNIT_ID = Platform.select({
  ios: 'ca-app-pub-3940256099942544/4411468910',
  android: 'ca-app-pub-3940256099942544/1033173712',
  default: 'ca-app-pub-3940256099942544/1033173712',
});
