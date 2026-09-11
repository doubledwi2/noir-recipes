import React, { useEffect, useState } from 'react';
import { Image, StyleSheet } from 'react-native';

const LOGO_SOURCE = require('../assets/noirdmix-logo.png');
const MAX_WIDTH = 220; // exact match to Lovable's `max-w-[220px]`

// Renders the logo at its real aspect ratio (like Lovable's `w-full
// max-w-[220px] h-auto`) instead of a hardcoded box that can squish or
// under-size it. Reads the source image's intrinsic size once and scales
// proportionally so it never looks "too small" regardless of the PNG's
// actual dimensions.
export function BrandLogo({ width = MAX_WIDTH }: { width?: number }) {
  const [ratio, setRatio] = useState<number | null>(null);

  useEffect(() => {
    const { width: w, height: h } = Image.resolveAssetSource(LOGO_SOURCE);
    if (w && h) setRatio(w / h);
  }, []);

  return (
    <Image
      source={LOGO_SOURCE}
      resizeMode="contain"
      style={[styles.logo, { width, height: ratio ? width / ratio : width * 0.3 }]}
    />
  );
}

const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
  },
});
