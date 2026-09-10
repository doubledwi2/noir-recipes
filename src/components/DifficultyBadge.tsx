import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { Difficulty } from '../types';
import { colors } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';
import { DIFFICULTY_LABELS } from '../i18n/labels';
import { useI18n } from '../i18n/useI18n';

const DOTS: Record<Difficulty, number> = { Mudah: 1, Sedang: 2, Sulit: 3 };

const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  Mudah: colors.success,
  Sedang: colors.gold,
  Sulit: colors.wine,
};

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const { t } = useI18n();
  const filled = DOTS[difficulty];
  const dotColor = DIFFICULTY_COLORS[difficulty];
  return (
    <View style={styles.container}>
      <View style={styles.dots}>
        {[0, 1, 2].map((i) => (
          <View
            key={i}
            style={[styles.dot, i < filled ? { backgroundColor: dotColor } : styles.dotEmpty]}
          />
        ))}
      </View>
      <Text style={styles.label}>{t(DIFFICULTY_LABELS[difficulty])}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs + 1 },
  dots: { flexDirection: 'row', gap: 3 },
  dot: { width: 5, height: 5, borderRadius: 2.5 },
  dotEmpty: { backgroundColor: colors.border, opacity: 0.6 },
  label: { color: colors.textSecondary, fontSize: 11, fontWeight: '600' },
});
