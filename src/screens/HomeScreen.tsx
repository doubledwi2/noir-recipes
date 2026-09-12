import React, { useMemo, useState, useRef, useEffect } from 'react';
import { Animated, FlatList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { RECIPES, CATEGORIES } from '../data/recipes';
import type { RecipeCategory } from '../types';
import { colors } from '../theme/colors';
import { spacing, typography } from '../theme/spacing';
import { SearchBar } from '../components/SearchBar';
import { CategoryTabs } from '../components/CategoryTabs';
import { RecipeCard } from '../components/RecipeCard';
import { EmptyState } from '../components/EmptyState';
import { BrandLogo } from '../components/BrandLogo';
import { useFavorites } from '../context/FavoritesContext';
import { useOpenRecipe } from '../ads/InterstitialProvider';
import { recipeMatchesQuery } from '../utils/search';
import { CATEGORY_LABELS } from '../i18n/labels';
import { useI18n } from '../i18n/useI18n';

// Ad banner is now rendered once, globally, floating above the tab bar
// on every screen -- see app/(tabs)/_layout.tsx. Don't add <BannerSlot />
// here again or it'll show twice.
export function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<RecipeCategory | null>(null);
  const { isFavorite, toggleFavorite } = useFavorites();
  const openRecipe = useOpenRecipe();
  const { t, strings, locale } = useI18n();

  const headerFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(headerFade, { toValue: 1, duration: 600, useNativeDriver: true }).start();
  }, []);

  const filteredRecipes = useMemo(() => {
    return RECIPES.filter((recipe) => {
      if (category && recipe.category !== category) return false;
      return recipeMatchesQuery(recipe, query, locale);
    });
  }, [query, category, locale]);

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <FlatList
        keyboardShouldPersistTaps="handled"
        data={filteredRecipes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <RecipeCard
              recipe={item}
              isFavorite={isFavorite(item.id)}
              onPress={() => openRecipe(item.id)}
              onToggleFavorite={() => toggleFavorite(item.id)}
            />
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
        ListHeaderComponent={
          <>
            <Animated.View style={[styles.header, { opacity: headerFade }]}>
              <BrandLogo />
              <Text style={styles.subtitle}>{strings.home.tagline}</Text>
              <LinearGradient
                colors={[colors.goldMuted, colors.goldLight, colors.goldMuted]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.divider}
              />
            </Animated.View>

            <View style={styles.searchWrap}>
              <SearchBar value={query} onChangeText={setQuery} placeholder={strings.home.searchPlaceholder} />
            </View>

            <CategoryTabs
              options={CATEGORIES}
              getLabel={(option) => t(CATEGORY_LABELS[option])}
              allLabel={strings.common.all}
              value={category}
              onChange={setCategory}
            />
            <View style={styles.listHeaderSpacing} />
          </>
        }
        ListEmptyComponent={
          <View style={styles.listItem}>
            <EmptyState emoji="🍹" title={strings.home.emptyTitle} subtitle={strings.home.emptySubtitle} />
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  header: {
    paddingHorizontal: spacing.screen,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.sm,
    alignItems: 'center',
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.md,
  },
  divider: {
    height: 1,
    width: '100%',
    marginTop: spacing.md,
    opacity: 0.5,
  },
  searchWrap: {
    paddingHorizontal: spacing.screen,
    marginTop: spacing.screen,
    marginBottom: spacing.md,
  },
  listContent: {
    paddingBottom: spacing.xxxl,
    flexGrow: 1,
  },
  listItem: { paddingHorizontal: spacing.screen },
  listHeaderSpacing: { height: spacing.screen },
});
