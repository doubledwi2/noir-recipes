import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, ScrollView, StyleSheet } from 'react-native';
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
      style={{ flexGrow: 0, flexShrink: 0 }}
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
  const selection = useRef(new Animated.Value(selected ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(selection, {
      toValue: selected ? 1 : 0,
      duration: 180,
      useNativeDriver: false,
    }).start();
  }, [selected, selection]);

  const backgroundColor = selection.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(233, 190, 87, 0)', colors.goldOverlay15],
  });
  const borderColor = selection.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.border, colors.gold],
  });
  const textColor = selection.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.textSecondary, colors.gold],
  });

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      style={({ pressed }) => [styles.chipPressable, pressed && styles.chipPressed]}
    >
      <Animated.View style={[styles.chip, { backgroundColor, borderColor }]}>
        <Animated.View pointerEvents="none" style={[styles.chipGlow, { opacity: selection }]} />
        <Animated.Text style={[styles.chipText, { color: textColor }]}>{label}</Animated.Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.sm, paddingHorizontal: spacing.screen, paddingVertical: spacing.xs },
  chipPressable: { borderRadius: radius.pill },
  chipPressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  chip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1,
    overflow: 'visible',
  },
  chipGlow: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.gold,
    ...shadows.goldGlow,
  },
  chipText: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 12,
    fontWeight: '500',
  },
});
