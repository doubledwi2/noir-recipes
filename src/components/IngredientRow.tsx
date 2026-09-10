import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, shadows } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';

interface Props {
  name: string;
  amount: string;
  owned: boolean;
}

export function IngredientRow({ name, amount, owned }: Props) {
  return (
    <View style={[styles.row, owned && styles.rowOwned]}>
      <View style={[styles.check, owned && styles.checkOwned]}>
        {owned ? (
          <Text style={styles.checkText}>✓</Text>
        ) : (
          <View style={styles.checkEmpty} />
        )}
      </View>
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
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.sm,
    gap: spacing.md,
    borderRadius: radius.sm,
    marginHorizontal: -spacing.sm,
  },
  rowOwned: {
    backgroundColor: `${colors.gold}08`,
  },
  check: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkOwned: {
    borderColor: colors.gold,
    backgroundColor: `${colors.gold}20`,
  },
  checkText: {
    color: colors.gold,
    fontSize: 11,
    fontWeight: '800',
  },
  checkEmpty: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.border,
  },
  name: { flex: 1, color: colors.textPrimary, fontSize: 14, fontWeight: '600' },
  nameOwned: { color: colors.goldLight },
  amount: { color: colors.textSecondary, fontSize: 12, fontWeight: '500' },
});
