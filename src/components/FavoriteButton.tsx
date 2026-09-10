import React, { useRef, useEffect } from 'react';
import { Animated, Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../theme/colors';
import { useI18n } from '../i18n/useI18n';

interface Props {
  isFavorite: boolean;
  onToggle: () => void;
  size?: number;
}

export function FavoriteButton({ isFavorite, onToggle, size = 36 }: Props) {
  const { strings } = useI18n();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const bgAnim = useRef(new Animated.Value(isFavorite ? 1 : 0)).current;

  useEffect(() => {
    if (isFavorite) {
      // Pulse animation on favoriting
      Animated.sequence([
        Animated.spring(scaleAnim, { toValue: 1.35, friction: 4, tension: 120, useNativeDriver: true }),
        Animated.spring(scaleAnim, { toValue: 1, friction: 6, useNativeDriver: true }),
      ]).start();
    }
    Animated.timing(bgAnim, {
      toValue: isFavorite ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isFavorite]);

  const bgColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.overlay, colors.wineMuted],
  });

  const handlePress = () => {
    Animated.sequence([
      Animated.spring(scaleAnim, { toValue: 0.8, friction: 6, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, friction: 6, useNativeDriver: true }),
    ]).start();
    onToggle();
  };

  return (
    <Animated.View style={[styles.container, { width: size, height: size, borderRadius: size / 2, backgroundColor: bgColor }]}>
      <Pressable
        onPress={handlePress}
        hitSlop={8}
        style={styles.pressable}
        accessibilityRole="button"
        accessibilityLabel={isFavorite ? strings.favoriteButton.remove : strings.favoriteButton.add}
      >
        <Animated.Text style={{ fontSize: size * 0.48, transform: [{ scale: scaleAnim }] }}>
          {isFavorite ? '❤️' : '🤍'}
        </Animated.Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressable: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
