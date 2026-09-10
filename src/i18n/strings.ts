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
    title: string;
    tagline: string;
    emptyTitle: string;
    emptySubtitle: string;
  };
  bar: {
    title: string;
    tagline: (owned: number, total: number) => string;
  };
  canMake: {
    title: string;
    tagline: string;
    canMakeSectionTitle: string;
    canMakeSectionSubtitle: string;
    almostSectionTitle: string;
    almostSectionSubtitle: string;
    missingBadge: (n: number) => string;
    emptyTitleHasIngredients: string;
    emptySubtitleHasIngredients: string;
    emptyTitleNoIngredients: string;
    emptySubtitleNoIngredients: string;
  };
  detail: {
    ingredientsTitle: string;
    stepsTitle: string;
    notesTitle: string;
    videoTitle: string;
    watchButton: string;
    notFoundTitle: string;
  };
  favoriteButton: {
    add: string;
    remove: string;
  };
  settings: {
    title: string;
    tagline: string;
    languageSectionTitle: string;
    idOptionLabel: string;
    enOptionLabel: string;
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
      title: 'Favorit',
      tagline: 'Resep yang kamu tandai untuk dicoba lagi',
      emptyTitle: 'Belum ada favorit',
      emptySubtitle: 'Ketuk ikon hati di sebuah resep untuk menyimpannya di sini.',
    },
    bar: {
      title: 'Bar Saya',
      tagline: (owned, total) => `Tandai bahan yang kamu punya · ${owned}/${total} ditandai`,
    },
    canMake: {
      title: 'Bisa Dibuat',
      tagline: 'Berdasarkan bahan yang kamu tandai di Bar Saya',
      canMakeSectionTitle: 'Bisa Dibuat Sekarang',
      canMakeSectionSubtitle: 'Semua bahan sudah ada di Bar Saya',
      almostSectionTitle: 'Hampir Bisa Dibuat',
      almostSectionSubtitle: 'Tinggal 1-2 bahan lagi',
      missingBadge: (n) => `Butuh ${n} bahan lagi`,
      emptyTitleHasIngredients: 'Belum ada resep yang cocok',
      emptySubtitleHasIngredients: 'Tandai lebih banyak bahan di Bar Saya supaya lebih banyak resep muncul di sini.',
      emptyTitleNoIngredients: 'Bar Saya masih kosong',
      emptySubtitleNoIngredients: 'Buka tab Bar Saya dan tandai bahan yang kamu punya untuk melihat resep yang bisa dibuat.',
    },
    detail: {
      ingredientsTitle: 'Bahan-Bahan',
      stepsTitle: 'Langkah',
      notesTitle: 'Catatan',
      videoTitle: 'Tutorial Video',
      watchButton: '▶ Tonton di Noir D Mix',
      notFoundTitle: 'Resep tidak ditemukan',
    },
    favoriteButton: {
      add: 'Tambah ke favorit',
      remove: 'Hapus dari favorit',
    },
    settings: {
      title: 'Pengaturan',
      tagline: 'Atur preferensi tampilan aplikasi',
      languageSectionTitle: 'Bahasa',
      idOptionLabel: 'Bahasa Indonesia',
      enOptionLabel: 'English',
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
      title: 'Favorites',
      tagline: 'Recipes you saved to try again',
      emptyTitle: 'No favorites yet',
      emptySubtitle: 'Tap the heart icon on a recipe to save it here.',
    },
    bar: {
      title: 'My Bar',
      tagline: (owned, total) => `Mark the ingredients you have · ${owned}/${total} marked`,
    },
    canMake: {
      title: 'Can Make',
      tagline: 'Based on the ingredients you marked in My Bar',
      canMakeSectionTitle: 'Can Make Right Now',
      canMakeSectionSubtitle: 'All ingredients are already in My Bar',
      almostSectionTitle: 'Almost There',
      almostSectionSubtitle: 'Just 1-2 ingredients away',
      missingBadge: (n) => (n === 1 ? 'Need 1 more ingredient' : `Need ${n} more ingredients`),
      emptyTitleHasIngredients: 'No matching recipes yet',
      emptySubtitleHasIngredients: 'Mark more ingredients in My Bar to see more recipes here.',
      emptyTitleNoIngredients: 'My Bar is empty',
      emptySubtitleNoIngredients: 'Open the My Bar tab and mark the ingredients you have to see what you can make.',
    },
    detail: {
      ingredientsTitle: 'Ingredients',
      stepsTitle: 'Steps',
      notesTitle: 'Note',
      videoTitle: 'Video Tutorial',
      watchButton: '▶ Watch on Noir D Mix',
      notFoundTitle: 'Recipe not found',
    },
    favoriteButton: {
      add: 'Add to favorites',
      remove: 'Remove from favorites',
    },
    settings: {
      title: 'Settings',
      tagline: 'Manage your app display preferences',
      languageSectionTitle: 'Language',
      idOptionLabel: 'Bahasa Indonesia',
      enOptionLabel: 'English',
    },
  },
};
