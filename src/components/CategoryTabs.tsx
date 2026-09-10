import React, { useRef } from 'react';
import { Animated, Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { colors, shadows } from '../theme/colors';
import { radius, spacing, typography } from '../theme/spacing';

interface Props<T extends string> {
  options: readonly T[];
  getLabel: (option: T) => string;
  allLabel: string;
  value: T | null;
  onChange: (value: T | null) => void;
}

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
  const scaleAnim = useRef(new Animated.Value(selected ? 1 : 0.95)).current;
  const glowAnim = useRef(new Animated.Value(selected ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: selected ? 1.05 : 0.95,
        friction: 6,
        tension: 80,
        useNativeDriver: true,
      }),
      Animated.timing(glowAnim, {
        toValue: selected ? 1 : 0,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start();
  }, [selected]);

  const glowColor = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.35],
  });

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.chip,
          selected && styles.chipSelected,
          pressed && { opacity: 0.85 },
        ]}
      >
        {selected && <Animated.View style={[StyleSheet.absoluteFill, styles.chipGlow, { opacity: glowColor }]} />}
        <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{label}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.sm, paddingHorizontal: spacing.lg, paddingVertical: spacing.xs },
  chip: {
    position: 'relative',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm + 2,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  chipSelected: {
    backgroundColor: colors.gold,
    borderColor: colors.goldLight,
    ...shadows.goldGlow,
  },
  chipGlow: {
    backgroundColor: colors.goldLight,
    borderRadius: radius.pill,
  },
  chipText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  chipTextSelected: {
    color: colors.bg,
  },
});
