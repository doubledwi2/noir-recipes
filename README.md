# Noir Mix

Aplikasi katalog resep minuman pendamping channel **Noir D Mix** — Cocktail,
Mocktail, dan Minuman Kekinian ala Indonesia. Semua data resep & bahan
statis di dalam kode, tanpa backend, tanpa akun. Favorit dan "Bar Saya"
disimpan lokal di HP lewat AsyncStorage.

## Menjalankan project

```bash
npm install
npx expo start
```

Buka dengan Expo Go untuk development cepat. **Iklan AdMob (banner &
interstitial) hanya aktif di custom dev client atau build produksi** —
Expo Go tidak bisa memuat native module AdMob, jadi di Expo Go slot banner
akan menampilkan placeholder bertuliskan "Slot iklan (test)" dan interstitial
otomatis dilewati (langsung navigasi ke detail resep tanpa iklan). Ini bukan
bug — semua tempat yang menyentuh AdMob native module sudah dijaga (`ARE_ADS_SUPPORTED`
di [src/ads/adUnits.ts](src/ads/adUnits.ts)) supaya `npx expo start` + Expo Go tetap
berjalan tanpa crash untuk development sehari-hari.

Untuk menguji iklan test yang sesungguhnya, buat dev client:

```bash
npx expo prebuild -p android
npx expo run:android
```

atau build lewat EAS:

```bash
eas build --platform android --profile development
```

## Kenapa Expo Router (bukan React Navigation manual)

Expo Router dipilih karena satu paket dengan rilis Expo SDK (risiko drift
versi lebih kecil untuk proyek solo yang di-build lewat EAS), routing
berbasis file mengurangi boilerplate untuk kombinasi tab + stack yang
dibutuhkan app ini (4 tab utama + 1 layar detail), dan deep-linking/typed
routes sudah otomatis tersedia. Di balik layar tetap React Navigation, jadi
tidak ada konsep baru yang eksotis.

## Struktur folder

```
app/                     Routing (Expo Router) — tipis, cuma wiring layar
  _layout.tsx             Root: providers, Stack (tabs + recipe detail)
  (tabs)/_layout.tsx       Tab navigator (Resep, Bisa Dibuat, Bar Saya, Favorit)
  (tabs)/index.tsx         -> HomeScreen
  (tabs)/can-make.tsx      -> CanMakeScreen
  (tabs)/bar.tsx           -> BarScreen
  (tabs)/favorites.tsx     -> FavoritesScreen
  recipe/[id].tsx          -> RecipeDetailScreen

src/
  types/                  Ingredient, Recipe, kategori, dsb
  data/                   Katalog bahan master + daftar resep (statis)
  context/                FavoritesContext, MyBarContext (state + AsyncStorage)
  utils/                  storage.ts, matching.ts ("bisa dibuat"), search.ts
  components/             Kartu resep, search bar, filter chip, dst (reusable)
  screens/                Implementasi UI tiap layar
  theme/                  Warna, spacing, tipografi ("noir home-bar")
  ads/                    Wrapper AdMob yang aman dipakai di Expo Go
```

## Struktur data (penting untuk fitur "Bisa Dibuat")

`Recipe.ingredients` berisi referensi `{ ingredientId, amount }` ke katalog
master `INGREDIENTS` ([src/data/ingredients.ts](src/data/ingredients.ts)), bukan teks bebas.
Ini yang membuat [src/utils/matching.ts](src/utils/matching.ts) bisa membandingkan bahan resep
dengan bahan yang ditandai user di Bar Saya secara otomatis dan akurat.

Menambah kategori resep baru: tambahkan ke union `RecipeCategory` di
[src/types/index.ts](src/types/index.ts) dan ke array `CATEGORIES` di
[src/data/recipes.ts](src/data/recipes.ts). Menambah tipe bahan baru: sama polanya di
`IngredientType` + `INGREDIENT_TYPES`/`INGREDIENT_TYPE_LABELS` di
[src/data/ingredients.ts](src/data/ingredients.ts).

## Sebelum submit ke Google Play — TODO

- [ ] **Ad Unit ID produksi**: daftar app ini di akun AdMob asli, lalu ganti
      `BANNER_AD_UNIT_ID` / `INTERSTITIAL_AD_UNIT_ID` di
      [src/ads/adUnits.ts](src/ads/adUnits.ts) dan `androidAppId`/`iosAppId` di
      [app.json](app.json) (saat ini semua masih Test ID resmi Google).
- [ ] **Privacy Policy**: wajib untuk Play Store + AdMob. Buat halaman gratis
      (mis. lewat Google Sites / GitHub Pages) dan cantumkan link-nya di
      Play Console.
- [ ] **App icon & splash art**: masih pakai placeholder default Expo.
      Ganti file di `assets/` (icon, adaptive icon Android, favicon) dengan
      desain final brand Noir Mix.
- [ ] **Nama brand & package name final**: `com.noirdmix.drinkrecipes` di
      [app.json](app.json) masih placeholder sesuai brief — konfirmasi dulu sebelum
      rilis karena package name Android tidak bisa diganti setelah publish.
- [ ] Isi `videoUrl` di resep tertentu ([src/data/recipes.ts](src/data/recipes.ts)) dengan link
      video tutorial asli dari channel Noir D Mix bila ada.
