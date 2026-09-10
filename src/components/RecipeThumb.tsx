import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import type { RecipeCategory } from '../types';
import { categoryColors, colors } from '../theme/colors';
import { radius } from '../theme/spacing';

const CATEGORY_GLYPH: Record<RecipeCategory, string> = {
  Cocktail: '🍸',
  Mocktail: '🥂',
  'Minuman Kekinian': '🧋',
};

interface Props {
  category: RecipeCategory;
  size?: number;
}

export function RecipeThumb({ category, size = 64 }: Props) {
  const tint = categoryColors[category] ?? colors.gold;
  return (
    <LinearGradient
      colors={[`${tint}30`, `${tint}10`]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, { width: size, height: size, borderRadius: radius.md }]}
    >
      <Text style={{ fontSize: size * 0.42 }}>{CATEGORY_GLYPH[category] ?? '🍹'}</Text>
      {/* Subtle gold border overlay */}
      <View style={[styles.borderOverlay, { borderColor: `${tint}20` }]} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  borderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 1,
    borderRadius: radius.md,
  },
});
