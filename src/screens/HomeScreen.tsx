import React, { useMemo, useState, useRef, useEffect } from 'react';
import { Animated, FlatList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { RECIPES, CATEGORIES } from '../data/recipes';
import type { RecipeCategory } from '../types';
import { colors } from '../theme/colors';
import { radius, spacing, typography } from '../theme/spacing';
import { SearchBar } from '../components/SearchBar';
import { CategoryTabs } from '../components/CategoryTabs';
import { RecipeCard } from '../components/RecipeCard';
import { EmptyState } from '../components/EmptyState';
import { BannerSlot } from '../ads/BannerSlot';
import { useFavorites } from '../context/FavoritesContext';
import { useOpenRecipe } from '../ads/InterstitialProvider';
import { recipeMatchesQuery } from '../utils/search';
import { CATEGORY_LABELS } from '../i18n/labels';
import { useI18n } from '../i18n/useI18n';

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
      {/* Premium gradient header background */}
      <LinearGradient
        colors={[`${colors.gold}0A`, 'transparent']}
        style={styles.headerGradient}
      />

      <Animated.View style={[styles.header, { opacity: headerFade }]}>
        <View style={styles.brandRow}>
          <View>
            <Text style={styles.brand}>{strings.home.brand}</Text>
            <View style={styles.taglineWrap}>
              <View style={styles.goldLine} />
              <Text style={styles.tagline}>{strings.home.tagline}</Text>
            </View>
          </View>
        </View>
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

      <BannerSlot />

      <FlatList
        data={filteredRecipes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <RecipeCard
            recipe={item}
            isFavorite={isFavorite(item.id)}
            onPress={() => openRecipe(item.id)}
            onToggleFavorite={() => toggleFavorite(item.id)}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: spacing.md }} />}
        ListEmptyComponent={
          <EmptyState emoji="🍹" title={strings.home.emptyTitle} subtitle={strings.home.emptySubtitle} />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  headerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 160,
  },
  header: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg, paddingBottom: spacing.sm },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  brand: {
    ...typography.display,
    color: colors.gold,
    fontSize: 28,
  },
  taglineWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xs + 2,
  },
  goldLine: {
    width: 20,
    height: 2,
    borderRadius: 1,
    backgroundColor: colors.gold,
  },
  tagline: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '500',
  },
  searchWrap: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  listContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
    flexGrow: 1,
  },
});
