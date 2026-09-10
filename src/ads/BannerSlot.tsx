import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { BANNER_AD_UNIT_ID } from './adUnits';
import { AdsModule } from './adsModule';
import { AdErrorBoundary } from './AdErrorBoundary';

// Expo Go can't load the AdMob native module, so we show a small labeled
// placeholder there instead of leaving an unexplained gap during development.
function UnsupportedPlaceholder() {
  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderText}>Slot iklan (test) — tampil di dev client / build</Text>
    </View>
  );
}

export function BannerSlot() {
  if (!AdsModule) return <UnsupportedPlaceholder />;

  const { BannerAd, BannerAdSize } = AdsModule;

  return (
    <AdErrorBoundary>
      <View style={styles.container}>
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
  container: {
    alignItems: 'center',
    backgroundColor: colors.bg,
    paddingVertical: spacing.xs,
  },
  placeholder: {
    marginHorizontal: spacing.lg,
    marginVertical: spacing.sm,
    paddingVertical: spacing.md,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.border,
    alignItems: 'center',
  },
  placeholderText: {
    color: colors.textMuted,
    fontSize: 11,
  },
});
