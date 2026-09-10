import React, { useRef, useEffect, useState } from 'react';
import { Animated, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { RECIPE_MAP } from '../data/recipes';
import { INGREDIENT_MAP } from '../data/ingredients';
import { categoryColors, colors, shadows } from '../theme/colors';
import { radius, spacing, typography } from '../theme/spacing';
import { DifficultyBadge } from '../components/DifficultyBadge';
import { FavoriteButton } from '../components/FavoriteButton';
import { IngredientRow } from '../components/IngredientRow';
import { EmptyState } from '../components/EmptyState';
import { useFavorites } from '../context/FavoritesContext';
import { useMyBar } from '../context/MyBarContext';
import { CATEGORY_LABELS, GLASS_TYPE_LABELS } from '../i18n/labels';
import { useI18n } from '../i18n/useI18n';

const CATEGORY_GLYPH: Record<string, string> = {
  Cocktail: '🍸',
  Mocktail: '🥂',
  'Minuman Kekinian': '🧋',
};

export function RecipeDetailScreen({ recipeId }: { recipeId: string }) {
  const recipe = RECIPE_MAP[recipeId];
  const { isFavorite, toggleFavorite } = useFavorites();
  const { hasIngredient } = useMyBar();
  const { t, strings } = useI18n();
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const toggleStep = (index: number) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const contentFade = useRef(new Animated.Value(0)).current;
  const contentSlide = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    if (recipe) {
      Animated.parallel([
        Animated.timing(contentFade, { toValue: 1, duration: 500, useNativeDriver: true }),
        Animated.spring(contentSlide, { toValue: 0, friction: 8, useNativeDriver: true }),
      ]).start();
    }
  }, [recipeId]);

  if (!recipe) {
    return <EmptyState emoji="🚫" title={strings.detail.notFoundTitle} />;
  }

  const tint = categoryColors[recipe.category] ?? colors.gold;

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Premium hero with layered gradients */}
      <LinearGradient
        colors={[`${tint}45`, `${tint}10`, colors.bg]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.3, y: 1 }}
        style={styles.hero}
      >
        {/* Decorative rings */}
        <View style={[styles.heroRing, { borderColor: `${tint}15` }]} />
        <View style={[styles.heroRing, styles.heroRingInner, { borderColor: `${tint}10` }]} />

        <Text style={styles.heroGlyph}>{CATEGORY_GLYPH[recipe.category] ?? '🍹'}</Text>

        <View style={styles.heroFavorite}>
          <FavoriteButton isFavorite={isFavorite(recipe.id)} onToggle={() => toggleFavorite(recipe.id)} size={42} />
        </View>

        {/* Bottom gradient fade */}
        <LinearGradient
          colors={['transparent', colors.bg]}
          style={styles.heroBottomFade}
        />
      </LinearGradient>

      <Animated.View style={[styles.body, { opacity: contentFade, transform: [{ translateY: contentSlide }] }]}>
        {/* Category tag */}
        <View style={[styles.categoryBadge, { backgroundColor: `${tint}18` }]}>
          <Text style={[styles.category, { color: tint }]}>
            {t(CATEGORY_LABELS[recipe.category]).toUpperCase()}
          </Text>
        </View>

        <Text style={styles.title}>{t(recipe.title)}</Text>

        {/* Gold divider */}
        <View style={styles.divider} />

        {/* Meta pills row */}
        <View style={styles.metaRow}>
          <DifficultyBadge difficulty={recipe.difficulty} />
          <View style={styles.metaDot} />
          <Text style={styles.metaText}>⏱ {strings.common.minutesLabel(recipe.prepTimeMinutes)}</Text>
          <View style={styles.metaDot} />
          <Text style={styles.metaText}>🥃 {t(GLASS_TYPE_LABELS[recipe.glassType])}</Text>
        </View>

        {/* Tags */}
        {recipe.tags.length > 0 && (
          <View style={styles.tagsRow}>
            {recipe.tags.map((tag) => (
              <View key={tag.id} style={styles.tag}>
                <Text style={styles.tagText}>#{t(tag)}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Ingredients */}
        <Section title={strings.detail.ingredientsTitle}>
          <View style={styles.ingredientsCard}>
            {recipe.ingredients.map((item, idx) => {
              const ingredient = INGREDIENT_MAP[item.ingredientId];
              return (
                <View key={item.ingredientId}>
                  <IngredientRow
                    name={ingredient ? t(ingredient.name) : item.ingredientId}
                    amount={t(item.amount)}
                    owned={hasIngredient(item.ingredientId)}
                  />
                  {idx < recipe.ingredients.length - 1 && <View style={styles.ingredientSeparator} />}
                </View>
              );
            })}
          </View>
        </Section>

        {/* Steps */}
        <Section title={strings.detail.stepsTitle}>
          {recipe.steps.map((step, index) => {
            const isCompleted = completedSteps.has(index);
            return (
              <TouchableOpacity
                key={index}
                style={styles.stepRow}
                onPress={() => toggleStep(index)}
                activeOpacity={0.7}
              >
                <View style={[styles.stepNumber, isCompleted && styles.stepNumberCompleted]}>
                  <Text style={[styles.stepNumberText, isCompleted && styles.stepNumberTextCompleted]}>
                    {isCompleted ? '✓' : index + 1}
                  </Text>
                </View>
                <Text style={[styles.stepText, isCompleted && styles.stepTextCompleted]}>
                  {t(step)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </Section>

        {/* Notes */}
        {recipe.notes && (
          <Section title={strings.detail.notesTitle}>
            <View style={styles.notesCard}>
              <Text style={styles.notesText}>{t(recipe.notes)}</Text>
            </View>
          </Section>
        )}

        {/* Video */}
        {recipe.videoUrl && (
          <Section title={strings.detail.videoTitle}>
            <TouchableOpacity
              style={styles.videoButton}
              onPress={() => Linking.openURL(recipe.videoUrl!)}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={[colors.wine, colors.wineMuted]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.videoGradient}
              >
                <Text style={styles.videoButtonText}>{strings.detail.watchButton}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Section>
        )}
      </Animated.View>
    </ScrollView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { paddingBottom: spacing.xxxl },
  hero: {
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  heroRing: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 1,
    top: 20,
  },
  heroRingInner: {
    width: 120,
    height: 120,
    borderRadius: 60,
    top: 40,
  },
  heroGlyph: { fontSize: 80, zIndex: 1 },
  heroFavorite: { position: 'absolute', top: spacing.xl, right: spacing.xl, zIndex: 2 },
  heroBottomFade: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  body: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    marginBottom: spacing.sm,
  },
  category: {
    ...typography.goldLabel,
    fontSize: 10,
  },
  title: {
    ...typography.display,
    color: colors.textPrimary,
    fontSize: 26,
  },
  divider: {
    width: 40,
    height: 2,
    borderRadius: 1,
    backgroundColor: colors.gold,
    marginVertical: spacing.lg,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: colors.textMuted,
    opacity: 0.5,
  },
  metaText: { color: colors.textSecondary, fontSize: 12, fontWeight: '500' },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.lg },
  tag: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 1,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  tagText: { color: colors.textMuted, fontSize: 11, fontWeight: '600' },
  section: { marginTop: spacing.xl },
  sectionTitle: {
    ...typography.h2,
    color: colors.gold,
    marginBottom: spacing.md,
  },
  ingredientsCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    padding: spacing.md,
    ...shadows.subtle,
  },
  ingredientSeparator: {
    height: 1,
    backgroundColor: colors.borderSubtle,
    marginVertical: 2,
  },
  stepRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
    ...shadows.goldGlow,
  },
  stepNumberCompleted: {
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.goldMuted,
    shadowOpacity: 0,
    elevation: 0,
  },
  stepNumberText: { color: colors.bg, fontSize: 12, fontWeight: '800' },
  stepNumberTextCompleted: {
    color: colors.gold,
  },
  stepText: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 14,
    lineHeight: 22,
  },
  stepTextCompleted: {
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },
  notesCard: {
    backgroundColor: `${colors.gold}0A`,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: `${colors.gold}20`,
    padding: spacing.lg,
  },
  notesText: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  videoButton: {
    borderRadius: radius.md,
    overflow: 'hidden',
    ...shadows.card,
  },
  videoGradient: {
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  videoButtonText: { color: colors.textPrimary, fontWeight: '800', fontSize: 15, letterSpacing: 0.3 },
});
