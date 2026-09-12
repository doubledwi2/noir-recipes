import React, { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import type { Recipe } from '../types';
import { colors } from '../theme/colors';
import { radius, spacing, typography } from '../theme/spacing';
import { CATEGORY_LABELS, DIFFICULTY_LABELS } from '../i18n/labels';
import { useI18n } from '../i18n/useI18n';

interface Props {
  recipe: Recipe;
  isFavorite: boolean;
  onPress: () => void;
  onToggleFavorite: () => void;
  /** Badge text shown next to the meta pills, e.g. "Lengkap" / "Kurang 2 bahan". */
  note?: string;
}

// Matches the Lovable design exactly: no thumbnail image, a thin gold accent
// bar on the left edge, gold uppercase category eyebrow, serif title, and
// two bordered meta pills (difficulty, time). The heart button sits in the
// top-right of the header row and fills gold (not red/wine) when active.
export function RecipeCard({ recipe, isFavorite, onPress, onToggleFavorite, note }: Props) {
  const { t, strings } = useI18n();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.98, friction: 8, useNativeDriver: true }).start();
  };
  const onPressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, friction: 8, useNativeDriver: true }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      >
        <LinearGradient
          colors={[colors.goldMuted, colors.goldLight, colors.goldMuted]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.accentLine}
        />

        <View style={styles.headerRow}>
          <View style={styles.titleBlock}>
            <Text style={styles.category}>{t(CATEGORY_LABELS[recipe.category]).toUpperCase()}</Text>
            <Text style={styles.title} numberOfLines={2}>
              {t(recipe.title)}
            </Text>
            {recipe.tagline ? (
              <Text style={styles.tagline} numberOfLines={1}>
                {t(recipe.tagline)}
              </Text>
            ) : null}
          </View>
          <Pressable
            onPress={(event) => { event.stopPropagation(); onToggleFavorite(); }}
            hitSlop={8}
            style={[styles.favoriteButton, isFavorite && styles.favoriteButtonActive]}
            accessibilityRole="button"
            accessibilityLabel={isFavorite ? strings.favoriteButton.remove : strings.favoriteButton.add}
          >
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={16}
              color={isFavorite ? colors.gold : colors.textSecondary}
            />
          </Pressable>
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
  accentLine: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    opacity: 0.6,
  },
  headerRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm },
  titleBlock: { flex: 1, minWidth: 0 },
  category: { ...typography.goldLabel, color: colors.gold, opacity: 0.8 },
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
  favoriteButton: {
    width: 32,
    height: 32,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteButtonActive: {
    borderColor: colors.gold,
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
