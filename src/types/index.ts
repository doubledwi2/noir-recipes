// Supported UI/content languages. Indonesian is the default; English is
// opt-in. Add a new locale here plus a new key on every `LocalizedText`
// value and every entry in src/i18n/strings.ts to extend this list.
export type Locale = 'id' | 'en';

// A piece of user-facing text with both language versions. Recipe/ingredient
// matching never looks at this — it only ever compares `ingredientId`s, so
// switching locale can never change which recipes are "makeable".
export interface LocalizedText {
  id: string;
  en: string;
}

// Master list of ingredient types. Add new types here (and to INGREDIENT_TYPES
// in data/ingredients.ts) to extend the catalog without touching matching logic.
export type IngredientType = 'Spirits' | 'Liqueur' | 'Mixer' | 'Garnish' | 'Lainnya';

export interface Ingredient {
  id: string;
  name: LocalizedText;
  type: IngredientType;
  // Treated as always "owned" in Bar Saya / Bisa Dibuat matching regardless
  // of what the user has actually marked -- for things like ice/water that
  // are assumed to always be on hand and would otherwise make nearly every
  // recipe show as incomplete.
  alwaysAvailable?: boolean;
}

// The three launch categories. Adding a new one only requires extending this
// union, the CATEGORIES array in data/recipes.ts, and CATEGORY_LABELS in
// src/i18n/labels.ts.
export type RecipeCategory = 'Cocktail' | 'Mocktail' | 'Minuman Kekinian';

export type Difficulty = 'Mudah' | 'Sedang' | 'Sulit';

// Controlled vocabulary for glass types, same pattern as IngredientType —
// display labels live in GLASS_TYPE_LABELS (src/i18n/labels.ts), not here.
export type GlassTypeId =
  | 'highball'
  | 'coupe-martini'
  | 'tall-or-cup'
  | 'rocks'
  | 'flute'
  | 'irish-coffee-mug'
  | 'shot'
  | 'goblet'
  | 'hurricane'
  | 'julep-cup'
  | 'mule-mug'
  | 'tiki'
  | 'wine-glass'
  // Added when merging in the 363-recipe research dataset.
  | 'collins'
  | 'margarita'
  | 'snifter'
  | 'pitcher'
  | 'bowl';

export interface RecipeIngredient {
  ingredientId: string;
  amount: LocalizedText;
}

export interface Recipe {
  id: string;
  title: LocalizedText;
  // Optional one-line description shown under the title on the recipe card
  // and detail screen. Not every recipe has one yet -- render conditionally.
  tagline?: LocalizedText;
  category: RecipeCategory;
  tags: LocalizedText[];
  glassType: GlassTypeId;
  difficulty: Difficulty;
  prepTimeMinutes: number;
  // Local editorial ranking used only to order the Home catalog. This is a
  // relative score, not a view count or externally sourced popularity claim.
  popularityScore?: number;
  ingredients: RecipeIngredient[];
  steps: LocalizedText[];
  videoUrl?: string;
  imageUrl?: string;
  // Optional bartender's tip/caveat, shown below the steps when present.
  notes?: LocalizedText;
}
