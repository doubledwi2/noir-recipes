export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
  // Screen-edge horizontal padding -- exact match to Lovable's `px-5` (20px),
  // distinct from `lg` (16px) which is used for internal card padding.
  screen: 20,
} as const;

// Radius scale -- exact match to the design's --radius: 0.875rem (14px) base
// and its Tailwind-generated steps (radius-sm = base-4, xl = base+4, etc).
export const radius = {
  sm: 10, // --radius-sm
  md: 12, // --radius-md
  lg: 14, // --radius-lg (base)
  xl: 18, // --radius-xl -- stat boxes on recipe detail
  card: 22, // --radius-2xl -- the radius actually used on every card (RecipeCard, ingredient list, step items, Bar Saya CTA)
  xxl: 26, // --radius-3xl
  pill: 999, // rounded-full
} as const;

// Typography -- fonts are the EXACT pair from the Lovable design:
// "Cormorant Garamond" (serif, headings) + "Plus Jakarta Sans" (sans, body).
// These are loaded via @expo-google-fonts in app/_layout.tsx as
// 'CormorantGaramond_600SemiBold' / 'CormorantGaramond_700Bold' and
// 'PlusJakartaSans_400Regular' / '..._500Medium' / '..._600SemiBold' /
// '..._700Bold'. Do NOT fall back to Platform.select serif -- the design
// intentionally uses this specific serif, not the OS default.
const SERIF_FAMILY = 'CormorantGaramond_600SemiBold';
const SANS_FAMILY = 'PlusJakartaSans_400Regular';
const SANS_MEDIUM = 'PlusJakartaSans_500Medium';
const SANS_SEMIBOLD = 'PlusJakartaSans_600SemiBold';

export const typography = {
  // Serif display — main brand title
  display: {
    fontFamily: SERIF_FAMILY,
    fontSize: 32,
    fontWeight: '600' as const,
    letterSpacing: -0.3,
    lineHeight: 38,
  },
  // Serif h1 — screen titles (ScreenHeader title)
  h1: {
    fontFamily: SERIF_FAMILY,
    fontSize: 30,
    fontWeight: '600' as const,
    letterSpacing: -0.3,
    lineHeight: 36,
  },
  // Serif h2 — section titles / recipe card title
  h2: {
    fontFamily: SERIF_FAMILY,
    fontSize: 20,
    fontWeight: '600' as const,
    letterSpacing: -0.2,
    lineHeight: 26,
  },
  // Sans-serif body
  body: {
    fontFamily: SANS_FAMILY,
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 21,
  },
  bodyStrong: {
    fontFamily: SANS_SEMIBOLD,
    fontSize: 14,
    fontWeight: '600' as const,
    lineHeight: 21,
  },
  caption: {
    fontFamily: SANS_MEDIUM,
    fontSize: 13,
    fontWeight: '500' as const,
    lineHeight: 18,
  },
  small: {
    fontFamily: SANS_MEDIUM,
    fontSize: 11,
    fontWeight: '500' as const,
    letterSpacing: 0.5,
    lineHeight: 15,
  },
  // Premium gold eyebrow label (category tag on cards, ScreenHeader eyebrow)
  // -- exact match to `text-[11px] uppercase tracking-[0.32em]` on ScreenHeader
  // and `tracking-[0.18em]` on RecipeCard.
  goldLabel: {
    fontFamily: SANS_SEMIBOLD,
    fontSize: 11,
    fontWeight: '600' as const,
    letterSpacing: 1.6,
    lineHeight: 15,
  },
} as const;
