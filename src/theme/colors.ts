// "Noir" home-bar palette: near-black base with warm brass/amber accent and a
// deep wine secondary, evoking a cocktail bar at night without feeling
// exclusive to bartenders.
export const colors = {
  bg: '#0F0D0B',
  bgElevated: '#1A1612',
  surface: '#1F1B17',
  surfaceAlt: '#282219',
  surfaceHover: '#30291F',
  border: '#3A2F26',
  borderSubtle: '#2A231B',

  textPrimary: '#F5EEE3',
  textSecondary: '#C4B8A5',
  textMuted: '#7E7264',

  gold: '#D4A84B',
  goldLight: '#E8C46A',
  goldMuted: '#8A6C3B',
  goldDim: '#5C4A2D',
  goldGlow: 'rgba(212, 168, 75, 0.25)',
  goldGlowStrong: 'rgba(212, 168, 75, 0.45)',

  wine: '#A23B4E',
  wineMuted: '#5C2530',
  wineLight: '#C75068',

  success: '#6FAE7A',
  successBg: '#1C2B1F',
  successGlow: 'rgba(111, 174, 122, 0.2)',
  warning: '#D3A24C',

  overlay: 'rgba(10, 8, 6, 0.72)',
  white: '#FFFFFF',

  // Gradient stops for premium backgrounds
  gradientDark: ['#0F0D0B', '#1A1612'],
  gradientGold: ['rgba(212, 168, 75, 0.08)', 'transparent'],
  gradientHero: ['rgba(212, 168, 75, 0.15)', 'rgba(15, 13, 11, 0.95)'],
} as const;

export const categoryColors: Record<string, string> = {
  Cocktail: '#D4A84B',
  Mocktail: '#6FAE7A',
  'Minuman Kekinian': '#C75068',
};

export const categoryGlows: Record<string, string> = {
  Cocktail: 'rgba(212, 168, 75, 0.2)',
  Mocktail: 'rgba(111, 174, 122, 0.15)',
  'Minuman Kekinian': 'rgba(199, 80, 104, 0.15)',
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
