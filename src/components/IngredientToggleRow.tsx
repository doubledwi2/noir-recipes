import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
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
  return (
    <Pressable
      onPress={onToggle}
      accessibilityRole="button"
      accessibilityState={{ selected: owned }}
      style={[styles.chip, owned && styles.chipActive]}
    >
      <Text style={[styles.name, owned && styles.nameOwned]} numberOfLines={1}>
        {name}
      </Text>
      <View style={[styles.check, owned && styles.checkActive]}>
        <Ionicons name="checkmark" size={12} color={owned ? colors.primaryForeground : 'transparent'} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
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
