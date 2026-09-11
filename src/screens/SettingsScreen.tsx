import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import type { Locale } from '../types';
import { colors, shadows } from '../theme/colors';
import { radius, spacing, typography } from '../theme/spacing';
import { ScreenHeader } from '../components/ScreenHeader';
import { useI18n } from '../i18n/useI18n';

const LOCALE_OPTIONS: { value: Locale; flag: string; label: string }[] = [
  { value: 'id', flag: '🇮🇩', label: 'Bahasa Indonesia' },
  { value: 'en', flag: '🇬🇧', label: 'English' },
];

export function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const { locale, setLocale, strings } = useI18n();
  const [showUpgradeNotice, setShowUpgradeNotice] = useState(false);

  return (
    <ScrollView
      style={[styles.screen, { paddingTop: insets.top }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <ScreenHeader
        eyebrow={strings.settings.eyebrow}
        title={strings.settings.title}
        subtitle={strings.settings.tagline}
      />

      <View style={styles.section}>
        <View style={styles.sectionHeadRow}>
          <Ionicons name="language-outline" size={16} color={colors.gold} />
          <View>
            <Text style={styles.sectionLabel}>{strings.settings.languageSectionTitle}</Text>
            <Text style={styles.sectionHint}>{strings.settings.languageHint}</Text>
          </View>
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

      {/* Upgrade to Pro -- display-ready, payment not wired up yet */}
      <View style={styles.proSection}>
        <View style={styles.proHeadRow}>
          <View style={styles.proIconWrap}>
            <Ionicons name="ribbon-outline" size={20} color={colors.gold} />
          </View>
          <View style={styles.proTextWrap}>
            <Text style={styles.proTitle}>{strings.settings.proTitle}</Text>
            <Text style={styles.proBody}>{strings.settings.proBody}</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => setShowUpgradeNotice(true)}
          activeOpacity={0.85}
          style={styles.proButtonWrap}
        >
          <LinearGradient
            colors={[colors.goldMuted, colors.goldLight, colors.goldMuted]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.proButton}
          >
            <Ionicons name="sparkles" size={16} color={colors.primaryForeground} />
            <Text style={styles.proButtonText}>{strings.settings.proCta}</Text>
          </LinearGradient>
        </TouchableOpacity>

        {showUpgradeNotice ? <Text style={styles.proNotice}>{strings.settings.proNotice}</Text> : null}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Noir D Mix</Text>
        <Text style={styles.footerSubtext}>Cocktail Recipe Catalog</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxxl },
  section: { marginTop: spacing.xl },
  sectionHeadRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  sectionLabel: { ...typography.h2, color: colors.textPrimary },
  sectionHint: { ...typography.small, color: colors.textMuted, letterSpacing: 0, marginTop: 2 },
  optionsWrap: { gap: spacing.sm, marginTop: spacing.md },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md + 2,
  },
  optionRowSelected: {
    borderColor: colors.gold,
    backgroundColor: colors.goldOverlay12,
    ...shadows.goldGlow,
  },
  optionFlag: { fontSize: 20 },
  optionLabel: { flex: 1, ...typography.bodyStrong, color: colors.textSecondary },
  optionLabelSelected: { color: colors.textPrimary },
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
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.gold },
  proSection: {
    marginTop: spacing.xxl,
    paddingTop: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  proHeadRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md },
  proIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.goldOverlay15,
    backgroundColor: colors.goldOverlay12,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.goldGlow,
  },
  proTextWrap: { flex: 1 },
  proTitle: { ...typography.h2, color: colors.textPrimary },
  proBody: { ...typography.caption, color: colors.textMuted, marginTop: 2, letterSpacing: 0, lineHeight: 18 },
  proButtonWrap: { marginTop: spacing.md },
  proButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs + 2,
    height: 48,
    borderRadius: radius.pill,
    ...shadows.goldGlow,
  },
  proButtonText: { ...typography.bodyStrong, color: colors.primaryForeground },
  proNotice: {
    ...typography.small,
    color: colors.gold,
    letterSpacing: 0,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  footer: {
    alignItems: 'center',
    marginTop: spacing.xxxl,
    gap: spacing.xs,
  },
  footerText: { ...typography.h2, color: colors.gold, letterSpacing: 1 },
  footerSubtext: { ...typography.small, color: colors.textMuted, letterSpacing: 0.5 },
});
