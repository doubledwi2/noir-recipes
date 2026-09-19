import React, { useMemo } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { RECIPES } from '../data/recipes';
import { colors, shadows } from '../theme/colors';
import { spacing, typography } from '../theme/spacing';
import { RecipeCard } from '../components/RecipeCard';
import { ScreenHeader } from '../components/ScreenHeader';
import { useFavorites } from '../context/FavoritesContext';
import { useOpenRecipe } from '../ads/InterstitialProvider';
import { useI18n } from '../i18n/useI18n';

export function FavoritesScreen() {
  const insets = useSafeAreaInsets();
  const { favoriteIds, isFavorite, toggleFavorite } = useFavorites();
  const openRecipe = useOpenRecipe();
  const { strings } = useI18n();
  const router = useRouter();

  const favoriteRecipes = useMemo(
    () => RECIPES.filter((recipe) => favoriteIds.has(recipe.id)),
    [favoriteIds],
  );

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <FlatList
        data={favoriteRecipes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <ScreenHeader
            eyebrow={strings.favorites.eyebrow}
            title={strings.favorites.title}
            subtitle={strings.favorites.tagline(favoriteRecipes.length)}
          />
        }
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
          <View style={styles.empty}>
            <View style={styles.emptyIconWrap}>
              <Ionicons name="heart" size={36} color={colors.gold} />
            </View>
            <Text style={styles.emptyTitle}>{strings.favorites.emptyTitle}</Text>
            <Text style={styles.emptySubtitle}>{strings.favorites.emptySubtitle}</Text>
            <Pressable
              onPress={() => router.push('/')}
              style={({ pressed }) => [styles.emptyCtaWrap, pressed && styles.emptyCtaPressed]}
            >
              <LinearGradient
                colors={[colors.goldMuted, colors.goldLight, colors.goldMuted]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.emptyCta}
              >
                <Text style={styles.emptyCtaText}>{strings.favorites.emptyCta}</Text>
              </LinearGradient>
            </Pressable>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  listContent: {
    paddingHorizontal: spacing.screen,
    paddingBottom: spacing.xxxl,
    flexGrow: 1,
  },
  empty: {
    alignItems: 'center',
    marginTop: spacing.xxxl,
    paddingHorizontal: spacing.xl,
  },
  emptyIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: colors.gold,
    backgroundColor: colors.goldOverlay12,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.goldGlow,
  },
  emptyTitle: { ...typography.h1, color: colors.textPrimary, marginTop: spacing.xl, textAlign: 'center' },
  emptySubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.sm,
    textAlign: 'center',
    maxWidth: 260,
  },
  emptyCtaWrap: { marginTop: spacing.xl },
  emptyCtaPressed: { opacity: 0.84, transform: [{ scale: 0.98 }] },
  emptyCta: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: 999,
  },
  emptyCtaText: { ...typography.bodyStrong, color: colors.primaryForeground },
});
