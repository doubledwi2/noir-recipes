import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { Recipe } from '../types';
import { colors } from '../theme/colors';
import { radius, spacing, typography } from '../theme/spacing';
import { CATEGORY_LABELS, DIFFICULTY_LABELS } from '../i18n/labels';
import { useI18n } from '../i18n/useI18n';
import { useSubscription } from '../subscription/SubscriptionContext';
import { FavoriteButton } from './FavoriteButton';

interface Props {
  recipe: Recipe;
  isFavorite: boolean;
  onPress: () => void;
  onToggleFavorite: () => void;
  /** Badge text shown next to the meta pills, e.g. "Lengkap" / "Kurang 2 bahan". */
  note?: string;
}

// Recipe card with a gold uppercase category eyebrow, serif title, and
// two bordered meta pills (difficulty, time). The heart button sits in the
// top-right of the header row and fills gold (not red/wine) when active.
export function RecipeCard({ recipe, isFavorite, onPress, onToggleFavorite, note }: Props) {
  const { t, strings } = useI18n();
  const { isPro } = useSubscription();
  const isLocked = !recipe.isFree && !isPro;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const entryOpacity = useRef(new Animated.Value(0)).current;
  const entryTranslateY = useRef(new Animated.Value(10)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(entryOpacity, { toValue: 1, duration: 280, useNativeDriver: true }),
      Animated.spring(entryTranslateY, { toValue: 0, friction: 9, useNativeDriver: true }),
    ]).start();
  }, [entryOpacity, entryTranslateY]);

  const onPressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.98, friction: 8, useNativeDriver: true }).start();
  };
  const onPressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, friction: 8, useNativeDriver: true }).start();
  };

  return (
    <Animated.View
      style={{ opacity: entryOpacity, transform: [{ translateY: entryTranslateY }, { scale: scaleAnim }] }}
    >
      <Pressable
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      >
        <View style={styles.headerRow}>
          <View style={styles.titleBlock}>
            <View style={styles.categoryRow}>
              <Text style={styles.category}>{t(CATEGORY_LABELS[recipe.category]).toUpperCase()}</Text>
              {isLocked ? (
                <View style={styles.proBadge}>
                  <Ionicons name="lock-closed" size={9} color={colors.primaryForeground} />
                  <Text style={styles.proBadgeText}>{strings.paywall.recipeLockedBadge}</Text>
                </View>
              ) : null}
            </View>
            <Text style={styles.title} numberOfLines={2}>
              {t(recipe.title)}
            </Text>
            {recipe.tagline ? (
              <Text style={styles.tagline} numberOfLines={1}>
                {t(recipe.tagline)}
              </Text>
            ) : null}
          </View>
          <FavoriteButton isFavorite={isFavorite} onToggle={onToggleFavorite} size={32} />
        </View>

        <View style={styles.metaRow}>
          <View style={styles.metaPill}>
            <Ionicons name="wine-outline" size={12} color={colors.goldMuted} />
            <Text style={styles.metaText}>{t(DIFFICULTY_LABELS[recipe.difficulty])}</Text>
          </View>
          <View style={styles.metaPill}>
            <Ionicons name="time-outline" size={12} color={colors.goldMuted} />
            <Text style={styles.metaText}>{strings.common.minutesLabel(recipe.prepTimeMinutes)}</Text>
          </View>
          {note ? (
            <View style={styles.noteBadge}>
              <Text style={styles.noteBadgeText}>{note}</Text>
            </View>
          ) : null}
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md + 4,
    overflow: 'hidden',
  },
  cardPressed: {
    borderColor: colors.gold,
  },
  headerRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm },
  titleBlock: { flex: 1, minWidth: 0 },
  categoryRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  category: { ...typography.goldLabel, color: colors.gold, opacity: 0.8 },
  proBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: colors.gold,
    borderRadius: radius.sm,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  proBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: colors.primaryForeground,
  },
  title: {
    ...typography.h2,
    color: colors.textPrimary,
    marginTop: 4,
  },
  tagline: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: 4,
    letterSpacing: 0,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  metaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  metaText: { ...typography.small, color: colors.textSecondary, letterSpacing: 0 },
  noteBadge: {
    backgroundColor: colors.goldOverlay15,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  noteBadgeText: { ...typography.small, color: colors.gold, letterSpacing: 0 },
});
