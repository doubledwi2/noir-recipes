// "Noir Mixology" home-bar palette -- values copied EXACTLY (converted
// oklch -> hex) from the approved Lovable design (project noir-mix-alchemy).
// Do not eyeball-adjust these; if the design changes, re-derive from the
// source oklch tokens in Lovable's src/styles.css.
export const colors = {
  bg: '#100C0A',
  bgElevated: '#1C1714', // same surface as `card` -- design has one elevation level
  surface: '#1C1714',
  surfaceAlt: '#2B2520', // --secondary / --muted
  surfaceHover: '#362C1C', // --accent
  border: '#393227',
  borderSubtle: 'rgba(57, 50, 39, 0.7)', // border/70, used on nav + ad banner

  textPrimary: '#F4F1EC',
  textSecondary: '#B6B0A7', // --muted-foreground (the only secondary text tone the design uses)
  textMuted: 'rgba(182, 176, 167, 0.7)',

  gold: '#E9BE57', // --primary
  goldLight: '#FFDB68', // brightest stop in --gradient-gold
  goldMuted: '#CA9C4E', // darkest stop in --gradient-gold
  goldDim: '#6B5730',
  goldGlow: 'rgba(233, 190, 87, 0.45)', // --glow-gold, exact
  goldGlowStrong: 'rgba(233, 190, 87, 0.6)',
  goldOverlay12: 'rgba(233, 190, 87, 0.12)', // bg-primary/12 (active ingredient chip)
  goldOverlay15: 'rgba(233, 190, 87, 0.15)', // bg-primary/15 (active category chip, "Complete" badge)
  primaryForeground: '#130E0B', // text color ON solid gold buttons

  // The Lovable design has no separate wine/burgundy accent -- gold plays
  // every accent role (favorite heart, ownership dot, category label, CTA).
  // Kept as aliases so existing imports don't break; do not introduce a
  // second accent hue anywhere new.
  wine: '#E9BE57',
  wineMuted: '#CA9C4E',
  wineLight: '#FFDB68',

  // Design has no distinct "success" hue either -- gold = owned/complete.
  success: '#E9BE57',
  successBg: 'rgba(233, 190, 87, 0.15)',
  successGlow: 'rgba(233, 190, 87, 0.45)',
  destructive: '#E64343', // --destructive, for error states only
  warning: '#E9BE57',

  overlay: 'rgba(16, 12, 10, 0.72)',
  white: '#FFFFFF',

  // Gradient stops -- exact match to --gradient-gold / --gradient-noir.
  gradientDark: ['#100C0A', '#1C1714'],
  gradientGold: ['#CA9C4E', '#FFDB68', '#CA9C4E'],
  gradientHero: ['#2A221A', '#0E0A08'],
} as const;

// The design does NOT color-code categories -- every category label renders
// in the same gold eyebrow style (text-primary/80). Kept as a lookup so call
// sites don't need conditionals, but every value is intentionally identical.
export const categoryColors: Record<string, string> = {
  Cocktail: colors.gold,
  Mocktail: colors.gold,
  'Minuman Kekinian': colors.gold,
};

export const categoryGlows: Record<string, string> = {
  Cocktail: colors.goldGlow,
  Mocktail: colors.goldGlow,
  'Minuman Kekinian': colors.goldGlow,
};

// Premium shadow presets for elevated surfaces
export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  goldGlow: {
    shadowColor: colors.gold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  subtle: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
} as const;
