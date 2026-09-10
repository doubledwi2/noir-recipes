import React, { useMemo, useRef, useEffect } from 'react';
import { Animated, FlatList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RECIPES } from '../data/recipes';
import { colors, shadows } from '../theme/colors';
import { radius, spacing, typography } from '../theme/spacing';
import { RecipeCard } from '../components/RecipeCard';
import { EmptyState } from '../components/EmptyState';
import { useFavorites } from '../context/FavoritesContext';
import { useOpenRecipe } from '../ads/InterstitialProvider';
import { useI18n } from '../i18n/useI18n';

export function FavoritesScreen() {
  const insets = useSafeAreaInsets();
  const { favoriteIds, isFavorite, toggleFavorite } = useFavorites();
  const openRecipe = useOpenRecipe();
  const { strings } = useI18n();

  const headerFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(headerFade, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

  const favoriteRecipes = useMemo(
    () => RECIPES.filter((recipe) => favoriteIds.has(recipe.id)),
    [favoriteIds],
  );

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <Animated.View style={[styles.header, { opacity: headerFade }]}>
        <Text style={styles.title}>{strings.favorites.title}</Text>
        <Text style={styles.tagline}>{strings.favorites.tagline}</Text>
        {favoriteRecipes.length > 0 && (
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{favoriteRecipes.length}</Text>
          </View>
        )}
      </Animated.View>

      <FlatList
        data={favoriteRecipes}
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
          <EmptyState emoji="🤍" title={strings.favorites.emptyTitle} subtitle={strings.favorites.emptySubtitle} />
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  title: { ...typography.h1, color: colors.textPrimary },
  tagline: { display: 'none' },
  countBadge: {
    backgroundColor: colors.wineMuted,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: `${colors.wine}40`,
  },
  countText: {
    color: colors.wineLight,
    fontSize: 13,
    fontWeight: '800',
  },
  listContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
    flexGrow: 1,
  },
});
