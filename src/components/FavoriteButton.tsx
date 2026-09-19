import React, { useEffect, useRef } from 'react';
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
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isFavorite) {
      pulseAnim.setValue(0);
      Animated.parallel([
        Animated.sequence([
          Animated.spring(scaleAnim, { toValue: 1.2, friction: 4, tension: 120, useNativeDriver: true }),
          Animated.spring(scaleAnim, { toValue: 1, friction: 6, useNativeDriver: true }),
        ]),
        Animated.timing(pulseAnim, { toValue: 1, duration: 420, useNativeDriver: true }),
      ]).start();
    }
  }, [isFavorite, pulseAnim, scaleAnim]);

  const onPressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.88, friction: 7, useNativeDriver: true }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, friction: 7, useNativeDriver: true }).start();
  };

  const pulseScale = pulseAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.55] });
  const pulseOpacity = pulseAnim.interpolate({ inputRange: [0, 0.35, 1], outputRange: [0, 0.5, 0] });

  return (
    <Pressable
      onPress={(event) => {
        event.stopPropagation();
        onToggle();
      }}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      hitSlop={8}
      style={({ pressed }) => [
        styles.button,
        { width: size, height: size, borderRadius: size / 2 },
        isFavorite && styles.buttonActive,
        pressed && styles.buttonPressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={isFavorite ? strings.favoriteButton.remove : strings.favoriteButton.add}
    >
      <Animated.View
        pointerEvents="none"
        style={[
          styles.pulse,
          { borderRadius: size / 2, opacity: pulseOpacity, transform: [{ scale: pulseScale }] },
        ]}
      />
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
  buttonPressed: { backgroundColor: colors.goldOverlay12 },
  pulse: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderWidth: 1,
    borderColor: colors.gold,
    ...shadows.goldGlow,
  },
});
