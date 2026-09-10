import React, { useRef, useEffect } from 'react';
import { Animated, StyleSheet, Switch, Text, View } from 'react-native';
import { colors, shadows } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';

interface Props {
  name: string;
  owned: boolean;
  onToggle: () => void;
}

export function IngredientToggleRow({ name, owned, onToggle }: Props) {
  const glowAnim = useRef(new Animated.Value(owned ? 1 : 0)).current;
  const bgAnim = useRef(new Animated.Value(owned ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(glowAnim, {
        toValue: owned ? 1 : 0,
        friction: 8,
        tension: 60,
        useNativeDriver: false,
      }),
      Animated.timing(bgAnim, {
        toValue: owned ? 1 : 0,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start();
  }, [owned]);

  const borderColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.border, colors.goldMuted],
  });

  const glowColor = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.15],
  });

  return (
    <Animated.View
      style={[
        styles.row,
        {
          borderColor,
          shadowColor: colors.gold,
          shadowOpacity: glowColor,
          shadowRadius: 8,
        },
      ]}
    >
      <View style={styles.nameWrap}>
        <Text style={[styles.name, owned && styles.nameOwned]}>{name}</Text>
      </View>
      <Switch
        value={owned}
        onValueChange={onToggle}
        trackColor={{ false: colors.border, true: colors.goldMuted }}
        thumbColor={owned ? colors.gold : colors.textMuted}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1.5,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    ...shadows.subtle,
  },
  nameWrap: {
    flex: 1,
  },
  name: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  nameOwned: {
    color: colors.gold,
  },
});
