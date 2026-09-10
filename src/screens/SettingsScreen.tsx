import React, { useRef, useEffect } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { Locale } from '../types';
import { colors, shadows } from '../theme/colors';
import { radius, spacing, typography } from '../theme/spacing';
import { useI18n } from '../i18n/useI18n';

const LOCALE_OPTIONS: { value: Locale; flag: string; label: string }[] = [
  { value: 'id', flag: '🇮🇩', label: 'Bahasa Indonesia' },
  { value: 'en', flag: '🇬🇧', label: 'English' },
];

export function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const { locale, setLocale, strings } = useI18n();
  const headerFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(headerFade, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <Animated.View style={[styles.header, { opacity: headerFade }]}>
        <Text style={styles.title}>{strings.settings.title}</Text>
        <Text style={styles.tagline}>{strings.settings.tagline}</Text>
      </Animated.View>

      <View style={styles.section}>
        <View style={styles.sectionLabelWrap}>
          <View style={styles.sectionLine} />
          <Text style={styles.sectionLabel}>{strings.settings.languageSectionTitle}</Text>
        </View>

        <View style={styles.optionsWrap}>
          {LOCALE_OPTIONS.map((option) => {
            const label = option.value === 'id' ? strings.settings.idOptionLabel : strings.settings.enOptionLabel;
            const selected = locale === option.value;
            return (
              <TouchableOpacity
                key={option.value}
                style={[styles.optionRow, selected && styles.optionRowSelected]}
                onPress={() => setLocale(option.value)}
                activeOpacity={0.8}
                accessibilityRole="radio"
                accessibilityState={{ selected }}
              >
                <Text style={styles.optionFlag}>{option.flag}</Text>
                <Text style={[styles.optionLabel, selected && styles.optionLabelSelected]}>{label}</Text>
                <View style={[styles.radio, selected && styles.radioSelected]}>
                  {selected && <View style={styles.radioDot} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Noir branding footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Noir D Mix</Text>
        <Text style={styles.footerSubtext}>Cocktail Recipe Catalog</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  title: { ...typography.h1, color: colors.textPrimary },
  tagline: { color: colors.textSecondary, marginTop: spacing.xs, fontSize: 13 },
  section: { paddingHorizontal: spacing.lg, gap: spacing.sm },
  sectionLabelWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  sectionLine: {
    width: 16,
    height: 2,
    borderRadius: 1,
    backgroundColor: colors.gold,
  },
  sectionLabel: {
    ...typography.goldLabel,
    fontSize: 12,
  },
  optionsWrap: { gap: spacing.md },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    ...shadows.subtle,
  },
  optionRowSelected: {
    borderColor: colors.gold,
    backgroundColor: `${colors.gold}0A`,
    ...shadows.goldGlow,
  },
  optionFlag: { fontSize: 22 },
  optionLabel: {
    flex: 1,
    color: colors.textSecondary,
    fontSize: 15,
    fontWeight: '600',
  },
  optionLabelSelected: {
    color: colors.textPrimary,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: { borderColor: colors.gold },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.gold,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: spacing.xxl,
    gap: spacing.xs,
  },
  footerText: {
    ...typography.h2,
    color: colors.gold,
    letterSpacing: 1,
  },
  footerSubtext: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
});
