import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';
import { BANNER_AD_UNIT_ID } from './adUnits';
import { AdsModule } from './adsModule';
import { AdErrorBoundary } from './AdErrorBoundary';
import { useI18n } from '../i18n/useI18n';

// Expo Go can't load the AdMob native module, so we show a labeled
// placeholder pill there instead -- styled to match the real Lovable
// AdBanner exactly (rounded pill, border, label chip + megaphone + text),
// not the dashed debug box this used to be.
function UnsupportedPlaceholder() {
  const { strings } = useI18n();
  return (
    <View style={styles.placeholder}>
      <View style={styles.labelChip}>
        <Text style={styles.labelChipText}>{strings.common.adLabel}</Text>
      </View>
      <Ionicons name="megaphone-outline" size={14} color={colors.gold} style={{ opacity: 0.6 }} />
      <Text style={styles.placeholderText}>{strings.common.adPlaceholder}</Text>
    </View>
  );
}

// Rendered once, globally, in app/(tabs)/_layout.tsx -- floats above the
// tab bar on every screen. Don't render this inline inside individual
// screens anymore.
export function BannerSlot() {
  if (!AdsModule) return <UnsupportedPlaceholder />;

  const { BannerAd, BannerAdSize } = AdsModule;

  return (
    <AdErrorBoundary>
      <View style={styles.placeholder}>
        <BannerAd
          unitId={BANNER_AD_UNIT_ID}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{ requestNonPersonalizedAdsOnly: true }}
        />
      </View>
    </AdErrorBoundary>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    height: 56,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    backgroundColor: colors.bgElevated,
    paddingHorizontal: spacing.md,
  },
  labelChip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.xs + 2,
    paddingVertical: 2,
  },
  labelChipText: {
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 1,
    color: colors.gold,
    opacity: 0.7,
  },
  placeholderText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});
