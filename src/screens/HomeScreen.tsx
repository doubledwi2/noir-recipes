import React, { useMemo, useState, useRef, useEffect } from 'react';
import { Animated, FlatList, Image, StyleSheet, Text, View } from 'react-native';
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
      <Animated.View style={[styles.header, { opacity: headerFade }]}>
        <Image
          source={require('../assets/noirdmix-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
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
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.sm,
    alignItems: 'center',
  },
  logo: { width: 220, height: 64 },
  brand: {
    ...typography.display,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  divider: {
    height: 1,
    width: '100%',
    marginTop: spacing.md,
    opacity: 0.5,
  },
  searchWrap: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  listContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
    flexGrow: 1,
  },
});