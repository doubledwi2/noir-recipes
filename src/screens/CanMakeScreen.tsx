import React, { useMemo } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RECIPES } from '../data/recipes';
import { INGREDIENT_MAP } from '../data/ingredients';
import type { Recipe } from '../types';
import { colors } from '../theme/colors';
import { spacing, typography } from '../theme/spacing';
import { RecipeCard } from '../components/RecipeCard';
import { ScreenHeader } from '../components/ScreenHeader';
import { EmptyState } from '../components/EmptyState';
import { useFavorites } from '../context/FavoritesContext';
import { useMyBar } from '../context/MyBarContext';
import { useOpenRecipe } from '../ads/InterstitialProvider';
import { ALMOST_THERE_MAX_MISSING, getRecipeMatches } from '../utils/matching';
import { useI18n } from '../i18n/useI18n';

interface Section {
  kind: 'canMake' | 'almost';
  title: string;
  subtitle: string;
  data: { recipe: Recipe; missingIngredientIds: string[] }[];
}

export function CanMakeScreen() {
  const insets = useSafeAreaInsets();
  const { ownedIngredientIds } = useMyBar();
  const { isFavorite, toggleFavorite } = useFavorites();
  const openRecipe = useOpenRecipe();
  const { t, strings } = useI18n();

  const sections = useMemo<Section[]>(() => {
    const matches = getRecipeMatches(RECIPES, ownedIngredientIds);

    const canMake = matches
      .filter((m) => m.canMake)
      .map((m) => ({ recipe: m.recipe, missingIngredientIds: [] as string[] }));

    const almost = matches
      .filter((m) => !m.canMake && m.missingIngredientIds.length <= ALMOST_THERE_MAX_MISSING)
      .sort((a, b) => a.missingIngredientIds.length - b.missingIngredientIds.length)
      .map((m) => ({ recipe: m.recipe, missingIngredientIds: m.missingIngredientIds }));

    const result: Section[] = [];
    if (canMake.length > 0) {
      result.push({
        kind: 'canMake',
        title: strings.canMake.canMakeSectionTitle,
        subtitle: strings.canMake.canMakeSectionSubtitle,
        data: canMake,
      });
    }
    if (almost.length > 0) {
      result.push({
        kind: 'almost',
        title: strings.canMake.almostSectionTitle,
        subtitle: strings.canMake.almostSectionSubtitle,
        data: almost,
      });
    }
    return result;
  }, [ownedIngredientIds, strings]);

  const hasAnyOwnedIngredient = ownedIngredientIds.size > 0;

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.recipe.id}
        contentContainerStyle={styles.listContent}
        stickySectionHeadersEnabled={false}
        ListHeaderComponent={
          <ScreenHeader
            eyebrow={strings.canMake.eyebrow}
            title={strings.canMake.title}
            subtitle={strings.canMake.tagline}
          />
        }
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionTitle}>{(section as Section).title}</Text>
        )}
        renderItem={({ item }) => {
          const missingNames = item.missingIngredientIds
            .map((id) => {
              const ingredient = INGREDIENT_MAP[id];
              return ingredient ? t(ingredient.name) : id;
            })
            .join(', ');
          return (
            <View>
              <RecipeCard
                recipe={item.recipe}
                isFavorite={isFavorite(item.recipe.id)}
                onPress={() => openRecipe(item.recipe.id)}
                onToggleFavorite={() => toggleFavorite(item.recipe.id)}
                note={
                  item.missingIngredientIds.length === 0
                    ? strings.canMake.complete
                    : strings.canMake.missingBadge(item.missingIngredientIds.length)
                }
              />
              {missingNames ? (
                <Text style={styles.missingText}>
                  {strings.canMake.missingLabel}: {missingNames}
                </Text>
              ) : null}
            </View>
          );
        }}
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
        SectionSeparatorComponent={() => <View style={{ height: spacing.xl }} />}
        ListEmptyComponent={
          <EmptyState
            emoji={hasAnyOwnedIngredient ? '🧊' : '🗄️'}
            title={
              hasAnyOwnedIngredient ? strings.canMake.emptyTitleHasIngredients : strings.canMake.emptyTitleNoIngredients
            }
            subtitle={
              hasAnyOwnedIngredient
                ? strings.canMake.emptySubtitleHasIngredients
                : strings.canMake.emptySubtitleNoIngredients
            }
            dashed
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  listContent: { paddingHorizontal: spacing.screen, paddingBottom: spacing.xxxl, flexGrow: 1 },
  sectionTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  missingText: {
    ...typography.caption,
    color: colors.textMuted,
    letterSpacing: 0,
    marginTop: -spacing.xs,
    marginBottom: spacing.xs,
    marginLeft: spacing.xs,
  },
});
