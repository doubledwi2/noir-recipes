import type { Locale, Recipe } from '../types';
import { INGREDIENT_MAP } from '../data/ingredients';

// Matches against whichever language is currently displayed, so a user
// searching in English doesn't need to know the Indonesian ingredient name
// (and vice versa).
export function recipeMatchesQuery(recipe: Recipe, rawQuery: string, locale: Locale): boolean {
  const query = rawQuery.trim().toLowerCase();
  if (!query) return true;

  if (recipe.title[locale].toLowerCase().includes(query)) return true;

  return recipe.ingredients.some((item) => {
    const ingredient = INGREDIENT_MAP[item.ingredientId];
    return ingredient?.name[locale].toLowerCase().includes(query);
  });
}
