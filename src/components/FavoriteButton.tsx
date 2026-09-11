import React, { useRef, useEffect } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, shadows } from '../theme/colors';
import { useI18n } from '../i18n/useI18n';

interface Props {
  isFavorite: boolean;
  onToggle: () => void;
  size?: number;
}

// Exact match to Lovable: a bordered circle button with a heart icon that
// fills GOLD (not red/wine) when active, with a soft gold glow.
export function FavoriteButton({ isFavorite, onToggle, size = 36 }: Props) {
  const { strings } = useI18n();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isFavorite) {
      Animated.sequence([
        Animated.spring(scaleAnim, { toValue: 1.2, friction: 4, tension: 120, useNativeDriver: true }),
        Animated.spring(scaleAnim, { toValue: 1, friction: 6, useNativeDriver: true }),
      ]).start();
    }
  }, [isFavorite]);

  const handlePress = () => {
    Animated.sequence([
      Animated.spring(scaleAnim, { toValue: 0.85, friction: 6, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, friction: 6, useNativeDriver: true }),
    ]).start();
    onToggle();
  };

  return (
    <Pressable
      onPress={handlePress}
      hitSlop={8}
      style={[
        styles.button,
        { width: size, height: size, borderRadius: size / 2 },
        isFavorite && styles.buttonActive,
      ]}
      accessibilityRole="button"
      accessibilityLabel={isFavorite ? strings.favoriteButton.remove : strings.favoriteButton.add}
    >
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Ionicons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={size * 0.5}
          color={isFavorite ? colors.gold : colors.textSecondary}
        />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  buttonActive: {
    borderColor: colors.gold,
    ...shadows.goldGlow,
  },
});
