import type { Recipe } from '../types';

export interface RecipeMatch {
  recipe: Recipe;
  missingIngredientIds: string[];
  canMake: boolean;
}

export function getRecipeMatch(recipe: Recipe, ownedIngredientIds: Set<string>): RecipeMatch {
  const missingIngredientIds = recipe.ingredients
    .map((item) => item.ingredientId)
    .filter((id) => !ownedIngredientIds.has(id));

  return {
    recipe,
    missingIngredientIds,
    canMake: missingIngredientIds.length === 0,
  };
}

export function getRecipeMatches(recipes: Recipe[], ownedIngredientIds: Set<string>): RecipeMatch[] {
  return recipes.map((recipe) => getRecipeMatch(recipe, ownedIngredientIds));
}

// "Almost there" nice-to-have: recipes missing just 1-2 ingredients.
export const ALMOST_THERE_MAX_MISSING = 2;
