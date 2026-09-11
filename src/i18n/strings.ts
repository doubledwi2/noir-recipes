import type { Locale } from '../types';

export interface Strings {
  common: {
    all: string;
    minutesLabel: (n: number) => string;
  };
  tabs: {
    home: string;
    canMake: string;
    bar: string;
    favorites: string;
    settings: string;
  };
  home: {
    brand: string;
    tagline: string;
    searchPlaceholder: string;
    emptyTitle: string;
    emptySubtitle: string;
  };
  favorites: {
    eyebrow: string;
    title: string;
    tagline: (n: number) => string;
    emptyTitle: string;
    emptySubtitle: string;
    emptyCta: string;
  };
  bar: {
    eyebrow: string;
    title: string;
    tagline: (owned: number) => string;
    cta: string;
  };
  canMake: {
    eyebrow: string;
    title: string;
    tagline: string;
    canMakeSectionTitle: string;
    canMakeSectionSubtitle: string;
    almostSectionTitle: string;
    almostSectionSubtitle: string;
    missingBadge: (n: number) => string;
    complete: string;
    emptyTitleHasIngredients: string;
    emptySubtitleHasIngredients: string;
    emptyTitleNoIngredients: string;
    emptySubtitleNoIngredients: string;
  };
  detail: {
    ingredientsTitle: string;
    stepsTitle: string;
    notesTitle: string;
    notFoundTitle: string;
    favSave: string;
    favSaved: string;
  };
  favoriteButton: {
    add: string;
    remove: string;
  };
  settings: {
    eyebrow: string;
    title: string;
    tagline: string;
    languageSectionTitle: string;
    languageHint: string;
    idOptionLabel: string;
    enOptionLabel: string;
    proTitle: string;
    proBody: string;
    proCta: string;
    proNotice: string;
  };
}

export const UI_STRINGS: Record<Locale, Strings> = {
  id: {
    common: {
      all: 'Semua',
      minutesLabel: (n) => `${n} menit`,
    },
    tabs: {
      home: 'Resep',
      canMake: 'Bisa Dibuat',
      bar: 'Bar Saya',
      favorites: 'Favorit',
      settings: 'Pengaturan',
    },
    home: {
      brand: 'Noir Mixology Recipes',
      tagline: 'Resep cocktail, mocktail & minuman kekinian — Noir D Mix',
      searchPlaceholder: 'Cari nama atau bahan...',
      emptyTitle: 'Resep tidak ditemukan',
      emptySubtitle: 'Coba kata kunci lain atau ganti kategori filter.',
    },
    favorites: {
      eyebrow: 'Koleksi Pribadi',
      title: 'Favorit',
      tagline: (n) => `${n} resep tersimpan di rak kamu.`,
      emptyTitle: 'Rak masih kosong',
      emptySubtitle: 'Ketuk ikon hati di resep mana pun untuk menyimpannya di sini.',
      emptyCta: 'Jelajahi resep',
    },
    bar: {
      eyebrow: 'Home Bar',
      title: 'Bar Saya',
      tagline: (owned) => `${owned} bahan tersedia di rak kamu.`,
      cta: 'Lihat resep yang bisa dibuat',
    },
    canMake: {
      eyebrow: 'Dari Rak Kamu',
      title: 'Bisa Dibuat',
      tagline: 'Berdasarkan bahan yang kamu tandai di Bar Saya',
      canMakeSectionTitle: 'Bisa Dibuat Sekarang',
      canMakeSectionSubtitle: 'Semua bahan sudah ada di Bar Saya',
      almostSectionTitle: 'Hampir Bisa Dibuat',
      almostSectionSubtitle: 'Tinggal 1-2 bahan lagi',
      missingBadge: (n) => `Kurang ${n} bahan`,
      complete: 'Lengkap',
      emptyTitleHasIngredients: 'Belum ada resep yang cocok',
      emptySubtitleHasIngredients: 'Tandai lebih banyak bahan di Bar Saya supaya lebih banyak resep muncul di sini.',
      emptyTitleNoIngredients: 'Bar Saya masih kosong',
      emptySubtitleNoIngredients: 'Buka tab Bar Saya dan tandai bahan yang kamu punya untuk melihat resep yang bisa dibuat.',
    },
    detail: {
      ingredientsTitle: 'Bahan',
      stepsTitle: 'Cara Membuat',
      notesTitle: 'Catatan',
      notFoundTitle: 'Resep tidak ditemukan',
      favSave: 'Simpan ke Favorit',
      favSaved: 'Tersimpan di Favorit',
    },
    favoriteButton: {
      add: 'Tambah ke favorit',
      remove: 'Hapus dari favorit',
    },
    settings: {
      eyebrow: 'Preferensi',
      title: 'Pengaturan',
      tagline: 'Atur pengalaman aplikasi sesuai seleramu.',
      languageSectionTitle: 'Ubah Bahasa',
      languageHint: 'Pilih bahasa tampilan aplikasi.',
      idOptionLabel: 'Bahasa Indonesia',
      enOptionLabel: 'English',
      proTitle: 'Upgrade ke Pro untuk hapus iklan',
      proBody: 'Nikmati semua resep tanpa gangguan banner iklan.',
      proCta: 'Upgrade ke Pro',
      proNotice: 'Pembayaran Pro akan segera tersedia.',
    },
  },
  en: {
    common: {
      all: 'All',
      minutesLabel: (n) => `${n} min`,
    },
    tabs: {
      home: 'Recipes',
      canMake: 'Can Make',
      bar: 'My Bar',
      favorites: 'Favorites',
      settings: 'Settings',
    },
    home: {
      brand: 'Noir Mixology Recipes',
      tagline: 'Cocktail, mocktail & trendy drink recipes — Noir D Mix companion',
      searchPlaceholder: 'Search by name or ingredient...',
      emptyTitle: 'No recipes found',
      emptySubtitle: 'Try a different search term or category filter.',
    },
    favorites: {
      eyebrow: 'Personal Collection',
      title: 'Favorites',
      tagline: (n) => `${n} recipes saved on your shelf.`,
      emptyTitle: 'Shelf still empty',
      emptySubtitle: 'Tap the heart icon on any recipe to save it here.',
      emptyCta: 'Browse recipes',
    },
    bar: {
      eyebrow: 'Home Bar',
      title: 'My Bar',
      tagline: (owned) => `${owned} ingredients available on your shelf.`,
      cta: 'See recipes you can make',
    },
    canMake: {
      eyebrow: 'From Your Shelf',
      title: 'Can Make',
      tagline: 'Based on the ingredients you marked in My Bar',
      canMakeSectionTitle: 'Can Make Right Now',
      canMakeSectionSubtitle: 'All ingredients are already in My Bar',
      almostSectionTitle: 'Almost There',
      almostSectionSubtitle: 'Just 1-2 ingredients away',
      missingBadge: (n) => (n === 1 ? '1 missing' : `${n} missing`),
      complete: 'Complete',
      emptyTitleHasIngredients: 'No matching recipes yet',
      emptySubtitleHasIngredients: 'Mark more ingredients in My Bar to see more recipes here.',
      emptyTitleNoIngredients: 'My Bar is empty',
      emptySubtitleNoIngredients: 'Open the My Bar tab and mark the ingredients you have to see what you can make.',
    },
    detail: {
      ingredientsTitle: 'Ingredients',
      stepsTitle: 'Instructions',
      notesTitle: 'Note',
      notFoundTitle: 'Recipe not found',
      favSave: 'Save to Favorites',
      favSaved: 'Saved to Favorites',
    },
    favoriteButton: {
      add: 'Add to favorites',
      remove: 'Remove from favorites',
    },
    settings: {
      eyebrow: 'Preferences',
      title: 'Settings',
      tagline: 'Tune the app experience to your taste.',
      languageSectionTitle: 'Change Language',
      languageHint: 'Choose the app display language.',
      idOptionLabel: 'Bahasa Indonesia',
      enOptionLabel: 'English',
      proTitle: 'Upgrade to Pro to remove ads',
      proBody: 'Enjoy every recipe without ad banner interruptions.',
      proCta: 'Upgrade to Pro',
      proNotice: 'Pro payments will be available soon.',
    },
  },
};
