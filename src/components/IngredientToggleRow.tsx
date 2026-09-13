import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, shadows } from '../theme/colors';
import { radius, spacing, typography } from '../theme/spacing';

interface Props {
  name: string;
  owned: boolean;
  onToggle: () => void;
}

// Exact match to Lovable's Bar Saya chip: a tappable rounded rectangle
// (not a native Switch) with the ingredient name on the left and a small
// checkmark circle on the right that fills gold when owned. Sits in a
// 2-column grid (see BarScreen.tsx).
export function IngredientToggleRow({ name, owned, onToggle }: Props) {
  const pressScale = useRef(new Animated.Value(1)).current;
  const checkProgress = useRef(new Animated.Value(owned ? 1 : 0)).current;
  const initial = name.trim().charAt(0).toUpperCase() || '•';

  useEffect(() => {
    Animated.spring(checkProgress, {
      toValue: owned ? 1 : 0,
      friction: 6,
      tension: 140,
      useNativeDriver: true,
    }).start();
  }, [checkProgress, owned]);

  return (
    <Animated.View style={[styles.cell, { transform: [{ scale: pressScale }] }]}>
      <Pressable
        onPress={onToggle}
        onPressIn={() => {
          Animated.spring(pressScale, { toValue: 0.98, friction: 8, useNativeDriver: true }).start();
        }}
        onPressOut={() => {
          Animated.spring(pressScale, { toValue: 1, friction: 8, useNativeDriver: true }).start();
        }}
        accessibilityRole="button"
        accessibilityState={{ selected: owned }}
        style={({ pressed }) => [styles.chip, owned && styles.chipActive, pressed && styles.chipPressed]}
      >
        <View style={styles.identity}>
          <View style={[styles.initialWrap, owned && styles.initialWrapActive]}>
            <Text style={[styles.initial, owned && styles.initialActive]}>{initial}</Text>
          </View>
          <Text style={[styles.name, owned && styles.nameOwned]} numberOfLines={1}>
            {name}
          </Text>
        </View>
        <View style={[styles.check, owned && styles.checkActive]}>
          <Animated.View style={{ opacity: checkProgress, transform: [{ scale: checkProgress }] }}>
            <Ionicons name="checkmark" size={12} color={colors.primaryForeground} />
          </Animated.View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cell: { flex: 1 },
  chip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.xs,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  chipActive: {
    borderColor: colors.gold,
    backgroundColor: colors.goldOverlay12,
    ...shadows.goldGlow,
  },
  chipPressed: { opacity: 0.9 },
  identity: { flex: 1, minWidth: 0, flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  initialWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initialWrapActive: { borderColor: colors.gold, backgroundColor: colors.goldOverlay15 },
  initial: { ...typography.small, color: colors.textSecondary, letterSpacing: 0 },
  initialActive: { color: colors.gold },
  name: { ...typography.caption, color: colors.textSecondary, flexShrink: 1 },
  nameOwned: { color: colors.textPrimary },
  check: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkActive: {
    borderColor: colors.gold,
    backgroundColor: colors.gold,
  },
});
