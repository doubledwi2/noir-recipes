import React, { useRef, useEffect, useState } from 'react';
import { Animated, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { RECIPE_MAP } from '../data/recipes';
import { INGREDIENT_MAP } from '../data/ingredients';
import { colors, shadows } from '../theme/colors';
import { radius, spacing, typography } from '../theme/spacing';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IngredientRow } from '../components/IngredientRow';
import { EmptyState } from '../components/EmptyState';
import { useFavorites } from '../context/FavoritesContext';
import { useMyBar } from '../context/MyBarContext';
import { CATEGORY_LABELS, GLASS_TYPE_LABELS, DIFFICULTY_LABELS } from '../i18n/labels';
import { useI18n } from '../i18n/useI18n';

// NOTE: the "Video Tutorial" section that used to live here has been
// intentionally removed to match the current approved design (see
// Lovable plan: hapus-video-tutorial-dan-tambah-upgrade-pro). Recipe data
// may still carry a `videoUrl` field -- it's just not rendered anymore.
export function RecipeDetailScreen({ recipeId }: { recipeId: string }) {
  const insets = useSafeAreaInsets();
  const recipe = RECIPE_MAP[recipeId];
  const router = useRouter();
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
  const contentSlide = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    setCompletedSteps(new Set());
    if (recipe) {
      Animated.parallel([
        Animated.timing(contentFade, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.spring(contentSlide, { toValue: 0, friction: 8, useNativeDriver: true }),
      ]).start();
    }
  }, [recipeId]);

  if (!recipe) {
    return <EmptyState emoji="🚫" title={strings.detail.notFoundTitle} />;
  }

  const fav = isFavorite(recipe.id);
  const stats = [
    { label: t(GLASS_TYPE_LABELS[recipe.glassType]), icon: 'wine-outline' as const },
    { label: t(DIFFICULTY_LABELS[recipe.difficulty]), icon: 'sparkles-outline' as const },
    { label: strings.common.minutesLabel(recipe.prepTimeMinutes), icon: 'time-outline' as const },
  ];

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + spacing.xl, paddingBottom: insets.bottom + spacing.xxxl }]}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View style={{ opacity: contentFade, transform: [{ translateY: contentSlide }] }}>
        <Pressable onPress={() => router.canGoBack() ? router.back() : router.replace("/")} hitSlop={8} style={styles.backRow}>
          <Ionicons name="arrow-back" size={18} color={colors.textSecondary} />
          <Text style={styles.backLabel}>{strings.detail.backLabel}</Text>
        </Pressable>

        <Text style={styles.category}>{t(CATEGORY_LABELS[recipe.category]).toUpperCase()}</Text>
        <Text style={styles.title}>{t(recipe.title)}</Text>
        {recipe.tagline ? <Text style={styles.tagline}>{t(recipe.tagline)}</Text> : null}

        {/* 3-stat grid: glass / difficulty / time -- exact match to Lovable */}
        <View style={styles.statsRow}>
          {stats.map((stat) => (
            <View key={stat.label} style={styles.statBox}>
              <Ionicons name={stat.icon} size={16} color={colors.gold} />
              <Text style={styles.statLabel} numberOfLines={1}>
                {stat.label}
              </Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          onPress={() => toggleFavorite(recipe.id)}
          accessibilityRole="button"
          accessibilityState={{ selected: fav }}
          activeOpacity={0.85}
          style={[styles.favButton, fav && styles.favButtonActive]}
        >
          {fav && <LinearGradient colors={[...colors.gradientGold]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill} />}
          <Ionicons
            name={fav ? 'heart' : 'heart-outline'}
            size={16}
            color={fav ? colors.primaryForeground : colors.gold}
          />
          <Text style={[styles.favButtonText, fav && styles.favButtonTextActive]}>
            {fav ? strings.detail.favSaved : strings.detail.favSave}
          </Text>
        </TouchableOpacity>

        {/* Ingredients */}
        <Section title={strings.detail.ingredientsTitle}>
          <View style={styles.ingredientsCard}>
            {recipe.ingredients.map((item, idx) => {
              const ingredient = INGREDIENT_MAP[item.ingredientId];
              return (
                <View key={`${item.ingredientId}-${idx}`}>
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
                accessibilityRole="checkbox"
                accessibilityState={{ checked: isCompleted }}
                accessibilityLabel={t(step)}
                activeOpacity={0.7}
              >
                <View style={[styles.stepNumber, isCompleted && styles.stepNumberCompleted]}>
                  <Text style={[styles.stepNumberText, isCompleted && styles.stepNumberTextCompleted]}>
                    {isCompleted ? '✓' : index + 1}
                  </Text>
                </View>
                <Text style={[styles.stepText, isCompleted && styles.stepTextCompleted]}>{t(step)}</Text>
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
  content: { paddingHorizontal: spacing.screen, paddingTop: spacing.xxxl, paddingBottom: spacing.xxxl },
  backRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs + 2, marginBottom: spacing.xl },
  backLabel: { ...typography.body, color: colors.textSecondary },
  category: { ...typography.goldLabel, color: colors.gold, opacity: 0.8 },
  title: { ...typography.display, fontSize: 36, lineHeight: 40, color: colors.textPrimary, marginTop: spacing.xs + 2 },
  tagline: { ...typography.body, color: colors.textSecondary, marginTop: spacing.xs + 2 },
  statsRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.screen },
  statBox: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.md,
  },
  statLabel: { ...typography.small, color: colors.textSecondary, letterSpacing: 0 },
  favButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs + 2,
    marginTop: spacing.lg,
    overflow: 'hidden',
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.goldOverlay15,
    paddingVertical: spacing.md,
  },
  favButtonActive: {
    backgroundColor: colors.gold,
    borderColor: colors.gold,
    ...shadows.goldGlow,
  },
  favButtonText: { ...typography.bodyStrong, color: colors.gold },
  favButtonTextActive: { color: colors.primaryForeground },
  section: { marginTop: spacing.xxl },
  sectionTitle: { ...typography.h2, fontSize: 24, lineHeight: 32, color: colors.textPrimary, marginBottom: spacing.md },
  ingredientsCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
  },
  ingredientSeparator: { height: 1, backgroundColor: colors.border, marginVertical: 2 },
  stepRow: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.md, padding: spacing.lg, borderRadius: radius.card, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.goldOverlay15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  stepNumberCompleted: {
    backgroundColor: colors.gold,
    borderColor: colors.gold,
  },
  stepNumberText: { color: colors.gold, fontSize: 12, fontWeight: '700' },
  stepNumberTextCompleted: { color: colors.primaryForeground },
  stepText: { ...typography.body, flex: 1, color: colors.textSecondary, fontSize: 14, lineHeight: 22 },
  stepTextCompleted: { color: colors.textMuted, textDecorationLine: 'line-through' },
  notesCard: {
    backgroundColor: colors.goldOverlay12,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.goldOverlay15,
    padding: spacing.lg,
  },
  notesText: { color: colors.textSecondary, fontSize: 13, lineHeight: 20, fontStyle: 'italic' },
});
