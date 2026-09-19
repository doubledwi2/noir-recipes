#!/bin/bash
# Jalankan ini SEBELUM setiap `eas build`, dari root proyek:
#   bash verify-before-build.sh
#
# Cek beberapa setting penting yang pernah beberapa kali ke-revert tanpa
# sengaja (biasanya karena AI tool lain kerja dari kode versi lama tanpa
# git pull dulu). Kalau ada yang FAIL, JANGAN jalanin eas build dulu --
# benerin dulu poin yang gagal.

FAIL=0

check() {
  if [ "$2" = "1" ]; then
    echo "✅ $1"
  else
    echo "❌ FAIL: $1"
    FAIL=1
  fi
}

# 1. expo-splash-screen harus punya key "image"
grep -q '"image": "./assets/splash-icon.png"' app.json && A=1 || A=0
check "app.json: expo-splash-screen punya key 'image'" "$A"

# 2. blockedPermissions harus ada, buat nutup izin READ_MEDIA_IMAGES yang
#    nggak kepake (dari expo-screen-capture)
grep -q "READ_MEDIA_IMAGES" app.json && B=1 || B=0
check "app.json: blockedPermissions READ_MEDIA_IMAGES ada" "$B"

# 3. expo-screen-capture harus ada di package.json (buat fitur blokir
#    screenshot di halaman resep)
grep -q '"expo-screen-capture"' package.json && C=1 || C=0
check "package.json: expo-screen-capture ada" "$C"

# 4. react-native-google-mobile-ads harus versi 16.0.0 (BUKAN ^16.5.0 atau
#    versi lain -- versi 16.0.0 ini yang narik Play Services Ads 24.6.0,
#    yang cocok sama Kotlin default proyek. Versi lain (terutama 16.4.0+)
#    pernah bikin build gagal total gara-gara bentrok versi Kotlin.)
grep -q '"react-native-google-mobile-ads": "16.0.0"' package.json && D=1 || D=0
check "package.json: react-native-google-mobile-ads pinned ke 16.0.0" "$D"

# 5. .npmrc harus ada, biar npm ci di server EAS nggak gagal gara-gara
#    konflik peer dependency
[ -f .npmrc ] && grep -q "legacy-peer-deps=true" .npmrc && E=1 || E=0
check ".npmrc: legacy-peer-deps=true ada" "$E"

echo ""
if [ "$FAIL" = "1" ]; then
  echo "🚨 Ada yang FAIL di atas. Benerin dulu sebelum eas build, biar nggak"
  echo "   buang-buang waktu nunggu build gagal lagi."
  exit 1
else
  echo "🎉 Semua aman, boleh lanjut eas build."
  exit 0
fi
