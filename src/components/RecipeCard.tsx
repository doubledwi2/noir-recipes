import React, { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import type { Recipe } from '../types';
import { categoryColors, colors, shadows } from '../theme/colors';
import { radius, spacing, typography } from '../theme/spacing';
import { RecipeThumb } from './RecipeThumb';
import { FavoriteButton } from './FavoriteButton';
import { DifficultyBadge } from './DifficultyBadge';
import { CATEGORY_LABELS, GLASS_TYPE_LABELS } from '../i18n/labels';
import { useI18n } from '../i18n/useI18n';

interface Props {
  recipe: Recipe;
  isFavorite: boolean;
  onPress: () => void;
  onToggleFavorite: () => void;
  missingCount?: number;
}

export function RecipeCard({ recipe, isFavorite, onPress, onToggleFavorite, missingCount }: Props) {
  const { t, strings } = useI18n();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.97, friction: 8, useNativeDriver: true }).start();
  };
  const onPressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, friction: 8, useNativeDriver: true }).start();
  };

  const tint = categoryColors[recipe.category] ?? colors.gold;

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }]}>
      <Pressable
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={({ pressed }) => [
          styles.card,
          pressed && styles.cardPressed,
        ]}
      >
        {/* Gold accent line on left */}
        <View style={[styles.accentLine, { backgroundColor: tint }]} />

        <RecipeThumb category={recipe.category} />
        <View style={styles.body}>
          <View style={styles.headerRow}>
            <View style={[styles.categoryBadge, { backgroundColor: `${tint}18` }]}>
              <Text style={[styles.category, { color: tint }]}>
                {t(CATEGORY_LABELS[recipe.category]).toUpperCase()}
              </Text>
            </View>
            {typeof missingCount === 'number' && missingCount > 0 && (
              <View style={styles.missingBadge}>
                <Text style={styles.missingBadgeText}>{strings.canMake.missingBadge(missingCount)}</Text>
              </View>
            )}
          </View>
          <Text style={styles.title} numberOfLines={2}>
            {t(recipe.title)}
          </Text>
          <View style={styles.metaRow}>
            <DifficultyBadge difficulty={recipe.difficulty} />
            <View style={styles.metaDot} />
            <Text style={styles.metaText}>{strings.common.minutesLabel(recipe.prepTimeMinutes)}</Text>
            <View style={styles.metaDot} />
            <Text style={styles.metaText} numberOfLines={1}>
              {t(GLASS_TYPE_LABELS[recipe.glassType])}
            </Text>
          </View>
        </View>
        <View style={styles.favoriteWrap}>
          <FavoriteButton isFavorite={isFavorite} onToggle={onToggleFavorite} size={34} />
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    paddingLeft: 0,
    gap: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    ...shadows.card,
  },
  cardPressed: {
    backgroundColor: colors.surfaceHover,
    borderColor: colors.goldDim,
  },
  accentLine: {
    width: 3,
    height: '80%',
    borderRadius: 2,
    marginLeft: spacing.sm,
  },
  body: { flex: 1, gap: 5 },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  categoryBadge: {
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 2,
    borderRadius: radius.pill,
  },
  category: { ...typography.goldLabel, fontSize: 10 },
  title: {
    ...typography.h2,
    color: colors.textPrimary,
    fontSize: 16,
    lineHeight: 22,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: colors.textMuted,
    opacity: 0.5,
  },
  metaText: { color: colors.textSecondary, fontSize: 12, flexShrink: 1 },
  missingBadge: {
    backgroundColor: colors.successBg,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: `${colors.success}30`,
  },
  missingBadgeText: { color: colors.success, fontSize: 10, fontWeight: '700' },
  favoriteWrap: {
    paddingRight: spacing.md,
  },
});
