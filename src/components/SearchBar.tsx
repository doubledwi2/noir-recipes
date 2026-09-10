import React, { useRef } from 'react';
import { Animated, StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { colors, shadows } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
}

export function SearchBar({ value, onChangeText, placeholder }: Props) {
  const focusAnim = useRef(new Animated.Value(0)).current;

  const onFocus = () => {
    Animated.timing(focusAnim, { toValue: 1, duration: 200, useNativeDriver: false }).start();
  };
  const onBlur = () => {
    Animated.timing(focusAnim, { toValue: 0, duration: 200, useNativeDriver: false }).start();
  };

  const borderColor = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.border, colors.gold],
  });

  const glowOpacity = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.3],
  });

  return (
    <Animated.View style={[styles.container, { borderColor }, { shadowColor: colors.gold, shadowOpacity: glowOpacity, shadowRadius: 12 }]}>
      <Text style={styles.icon}>🔎</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        style={styles.input}
        autoCorrect={false}
        returnKeyType="search"
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {value.length > 0 && (
        <Pressable
          onPress={() => onChangeText('')}
          hitSlop={8}
          style={({ pressed }) => [styles.clearBtn, pressed && styles.clearPressed]}
        >
          <Text style={styles.clear}>✕</Text>
        </Pressable>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    paddingHorizontal: spacing.lg,
    height: 48,
    gap: spacing.md,
    ...shadows.subtle,
  },
  icon: { fontSize: 15, opacity: 0.7 },
  input: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 15,
    height: '100%',
    fontWeight: '500',
  },
  clearBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearPressed: {
    backgroundColor: colors.goldDim,
  },
  clear: { color: colors.textMuted, fontSize: 13, fontWeight: '600' },
});
