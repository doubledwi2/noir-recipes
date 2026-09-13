import type { Difficulty, GlassTypeId, LocalizedText, RecipeCategory } from '../types';

// Display-only translations for controlled-vocabulary fields. The values of
// RecipeCategory/Difficulty/GlassTypeId themselves stay fixed (they're used
// as internal identifiers, e.g. in styling lookups) — only the label shown
// to the user changes with locale.
export const CATEGORY_LABELS: Record<RecipeCategory, LocalizedText> = {
  Cocktail: { id: 'Cocktail', en: 'Cocktail' },
  Mocktail: { id: 'Mocktail', en: 'Mocktail' },
  'Minuman Kekinian': { id: 'Minuman Kekinian', en: 'Trendy Indonesian Drinks' },
};

export const DIFFICULTY_LABELS: Record<Difficulty, LocalizedText> = {
  Mudah: { id: 'Mudah', en: 'Easy' },
  Sedang: { id: 'Sedang', en: 'Medium' },
  Sulit: { id: 'Sulit', en: 'Hard' },
};

export const GLASS_TYPE_LABELS: Record<GlassTypeId, LocalizedText> = {
  highball: { id: 'Gelas Tinggi (Highball)', en: 'Highball Glass' },
  'coupe-martini': { id: 'Gelas Coupe / Martini', en: 'Coupe / Martini Glass' },
  'tall-or-cup': { id: 'Gelas Tinggi / Cup Plastik', en: 'Highball Glass / Plastic Cup' },
  // Added when merging in the 96-recipe Cocktail Recipe Bible, whose recipes
  // use a much wider range of glassware than the original 3 slugs covered.
  rocks: { id: 'Gelas Rocks (Old Fashioned)', en: 'Rocks / Old Fashioned Glass' },
  flute: { id: 'Gelas Flute', en: 'Champagne Flute' },
  'irish-coffee-mug': { id: 'Gelas Irish Coffee', en: 'Irish Coffee Glass' },
  shot: { id: 'Gelas Shot', en: 'Shot Glass' },
  goblet: { id: 'Goblet', en: 'Goblet' },
  hurricane: { id: 'Gelas Hurricane', en: 'Hurricane Glass' },
  'julep-cup': { id: 'Cangkir Julep', en: 'Julep Cup' },
  'mule-mug': { id: 'Mug Mule (atau Gelas Tinggi)', en: 'Mule Mug (or Highball)' },
  tiki: { id: 'Gelas Tiki', en: 'Tiki Glass' },
  'wine-glass': { id: 'Gelas Wine', en: 'Wine Glass' },
  collins: { id: 'Gelas Collins', en: 'Collins Glass' },
  margarita: { id: 'Gelas Margarita', en: 'Margarita Glass' },
  snifter: { id: 'Gelas Snifter', en: 'Snifter Glass' },
  pitcher: { id: 'Pitcher (buat porsi banyak)', en: 'Pitcher (batch serving)' },
  bowl: { id: 'Mangkuk Punch', en: 'Punch Bowl' },
};
