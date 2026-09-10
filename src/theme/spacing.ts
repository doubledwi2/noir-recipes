export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const radius = {
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
  pill: 999,
} as const;

// Premium typography: serif for display/headings (elegant feel),
// system sans-serif for body text (readability on dark backgrounds).
// Using Platform.select for best native serif font per OS.
import { Platform } from 'react-native';

const SERIF_FAMILY = Platform.select({
  ios: 'Georgia, "Times New Roman", serif',
  android: '"serif"',
  default: 'Georgia, serif',
});

export const typography = {
  // Serif display — main brand title
  display: {
    fontFamily: SERIF_FAMILY,
    fontSize: 30,
    fontWeight: '700' as const,
    letterSpacing: 0.3,
    lineHeight: 36,
  },
  // Serif h1 — screen titles
  h1: {
    fontFamily: SERIF_FAMILY,
    fontSize: 24,
    fontWeight: '700' as const,
    letterSpacing: 0.2,
    lineHeight: 30,
  },
  // Serif h2 — section titles
  h2: {
    fontFamily: SERIF_FAMILY,
    fontSize: 19,
    fontWeight: '700' as const,
    letterSpacing: 0.1,
    lineHeight: 25,
  },
  // Sans-serif body
  body: {
    fontSize: 15,
    fontWeight: '400' as const,
    lineHeight: 22,
  },
  bodyStrong: {
    fontSize: 15,
    fontWeight: '600' as const,
    lineHeight: 22,
  },
  caption: {
    fontSize: 13,
    fontWeight: '500' as const,
    lineHeight: 18,
  },
  small: {
    fontSize: 11,
    fontWeight: '600' as const,
    letterSpacing: 0.5,
    lineHeight: 15,
  },
  // Premium gold label (for category tags, badges)
  goldLabel: {
    fontSize: 11,
    fontWeight: '800' as const,
    letterSpacing: 1.0,
    lineHeight: 15,
  },
} as const;
