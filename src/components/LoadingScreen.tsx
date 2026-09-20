import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet } from 'react-native';

const LOADING_IMAGE = require('../assets/loading-screen.jpg');

// Matches the loading artwork's own background tone, so if a device's aspect
// ratio ever leaves a sliver uncovered by "cover" resize, it's invisible.
const SPLASH_BG = '#0B0705';

// How long the loading screen stays on screen before handing off to Home.
const HOLD_DURATION_MS = 1200;
// Quick fade so the handoff isn't a hard, jarring cut -- not an "intro
// animation" on the artwork itself, just a smooth transition out.
const FADE_OUT_MS = 300;

type Props = {
  onFinish: () => void;
};

export function LoadingScreen({ onFinish }: Props) {
  const overlayOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: FADE_OUT_MS,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) onFinish();
      });
    }, HOLD_DURATION_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Animated.View pointerEvents="none" style={[styles.overlay, { opacity: overlayOpacity }]}>
      <Image source={LOADING_IMAGE} resizeMode="cover" style={styles.image} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: SPLASH_BG,
    zIndex: 999,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
