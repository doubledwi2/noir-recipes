import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { colors, shadows } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';

interface Props<T extends string> {
  options: readonly T[];
  getLabel: (option: T) => string;
  allLabel: string;
  value: T | null;
  onChange: (value: T | null) => void;
}

// Simplified on purpose: no per-chip mount animation (that was likely
// causing the "chips render empty until you tap one" layout glitch on
// Android -- native+JS driven Animated values fighting the ScrollView's
// first measure pass). Selection state alone drives style, matching
// Lovable exactly: unselected = plain outline, selected = gold border +
// 15%-gold fill + glow, no scale/opacity animation.
export function CategoryTabs<T extends string>({ options, getLabel, allLabel, value, onChange }: Props<T>) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <Chip label={allLabel} selected={value === null} onPress={() => onChange(null)} />
      {options.map((option) => (
        <Chip key={option} label={getLabel(option)} selected={value === option} onPress={() => onChange(option)} />
      ))}
    </ScrollView>
  );
}

function Chip({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        selected && styles.chipSelected,
        pressed && { opacity: 0.85 },
      ]}
    >
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.sm, paddingHorizontal: spacing.screen, paddingVertical: spacing.xs },
  chip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipSelected: {
    backgroundColor: colors.goldOverlay15,
    borderColor: colors.gold,
    ...shadows.goldGlow,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  chipTextSelected: {
    color: colors.gold,
  },
});
