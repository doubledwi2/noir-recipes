import React, { useMemo, useRef, useEffect } from 'react';
import { Animated, SectionList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RECIPES } from '../data/recipes';
import type { Recipe } from '../types';
import { colors, shadows } from '../theme/colors';
import { radius, spacing, typography } from '../theme/spacing';
import { RecipeCard } from '../components/RecipeCard';
import { EmptyState } from '../components/EmptyState';
import { useFavorites } from '../context/FavoritesContext';
import { useMyBar } from '../context/MyBarContext';
import { useOpenRecipe } from '../ads/InterstitialProvider';
import { ALMOST_THERE_MAX_MISSING, getRecipeMatches } from '../utils/matching';
import { useI18n } from '../i18n/useI18n';

interface Section {
  title: string;
  subtitle: string;
  data: { recipe: Recipe; missingCount: number }[];
}

export function CanMakeScreen() {
  const insets = useSafeAreaInsets();
  const { ownedIngredientIds } = useMyBar();
  const { isFavorite, toggleFavorite } = useFavorites();
  const openRecipe = useOpenRecipe();
  const { strings } = useI18n();

  const headerFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(headerFade, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

  const sections = useMemo<Section[]>(() => {
    const matches = getRecipeMatches(RECIPES, ownedIngredientIds);

    const canMake = matches
      .filter((m) => m.canMake)
      .map((m) => ({ recipe: m.recipe, missingCount: 0 }));

    const almost = matches
      .filter((m) => !m.canMake && m.missingIngredientIds.length <= ALMOST_THERE_MAX_MISSING)
      .sort((a, b) => a.missingIngredientIds.length - b.missingIngredientIds.length)
      .map((m) => ({ recipe: m.recipe, missingCount: m.missingIngredientIds.length }));

    const result: Section[] = [];
    if (canMake.length > 0) {
      result.push({
        title: strings.canMake.canMakeSectionTitle,
        subtitle: strings.canMake.canMakeSectionSubtitle,
        data: canMake,
      });
    }
    if (almost.length > 0) {
      result.push({
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
      <Animated.View style={[styles.header, { opacity: headerFade }]}>
        <Text style={styles.title}>{strings.canMake.title}</Text>
        <Text style={styles.tagline}>{strings.canMake.tagline}</Text>
      </Animated.View>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.recipe.id}
        contentContainerStyle={styles.listContent}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section }) => {
          const isCanMake = (section as Section).title === strings.canMake.canMakeSectionTitle;
          return (
            <View style={[styles.sectionHeader, isCanMake && styles.sectionHeaderGreen]}>
              <View style={[styles.sectionIndicator, isCanMake ? styles.sectionIndicatorGreen : styles.sectionIndicatorGold]} />
              <View>
                <Text style={styles.sectionTitle}>{(section as Section).title}</Text>
                <Text style={styles.sectionSubtitle}>{(section as Section).subtitle}</Text>
              </View>
            </View>
          );
        }}
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item.recipe}
            isFavorite={isFavorite(item.recipe.id)}
            onPress={() => openRecipe(item.recipe.id)}
            onToggleFavorite={() => toggleFavorite(item.recipe.id)}
            missingCount={item.missingCount}
          />
        )}
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
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  title: { ...typography.h1, color: colors.textPrimary },
  tagline: { color: colors.textSecondary, marginTop: spacing.xs, fontSize: 13 },
  listContent: { padding: spacing.lg, paddingBottom: spacing.xxxl, flexGrow: 1 },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  sectionHeaderGreen: {
    borderColor: `${colors.success}30`,
    backgroundColor: `${colors.success}08`,
  },
  sectionIndicator: {
    width: 4,
    height: 32,
    borderRadius: 2,
  },
  sectionIndicatorGreen: { backgroundColor: colors.success },
  sectionIndicatorGold: { backgroundColor: colors.gold },
  sectionTitle: { ...typography.bodyStrong, color: colors.textPrimary, fontSize: 14 },
  sectionSubtitle: { color: colors.textMuted, fontSize: 11, marginTop: 1 },
});
