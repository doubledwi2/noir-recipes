import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { spacing, typography } from '../theme/spacing';

interface Props {
  name: string;
  amount: string;
  owned: boolean;
}

// Exact match to Lovable: a small filled dot (gold when owned, muted grey
// when not) -- not a checkmark-in-circle. Row has no background tint,
// separated by hairline dividers (handled by the parent list).
export function IngredientRow({ name, amount, owned }: Props) {
  return (
    <View style={styles.row}>
      <View style={[styles.dot, owned && styles.dotOwned]} />
      <Text style={[styles.name, owned && styles.nameOwned]} numberOfLines={1}>
        {name}
      </Text>
      <Text style={styles.amount}>{amount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    gap: spacing.sm + 2,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.textMuted,
  },
  dotOwned: {
    backgroundColor: colors.gold,
  },
  name: { flex: 1, ...typography.body, color: colors.textSecondary, fontWeight: '600' },
  nameOwned: { color: colors.textPrimary },
  amount: { ...typography.caption, color: colors.gold, letterSpacing: 0 },
});
