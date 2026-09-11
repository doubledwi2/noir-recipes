import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';
import { spacing, typography } from '../theme/spacing';

interface Props {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

// Exact match to Lovable's <ScreenHeader>: small-caps gold eyebrow, serif
// title, optional muted subtitle, full-width gold gradient divider below.
export function ScreenHeader({ eyebrow, title, subtitle }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>{eyebrow}</Text>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      <LinearGradient
        colors={[colors.goldMuted, colors.goldLight, colors.goldMuted]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.divider}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: spacing.xl },
  eyebrow: { ...typography.goldLabel, color: colors.gold, opacity: 0.8 },
  title: { ...typography.h1, color: colors.textPrimary, marginTop: spacing.xs + 2 },
  subtitle: { ...typography.body, color: colors.textSecondary, marginTop: spacing.xs + 2 },
  divider: { height: 1, width: '100%', marginTop: spacing.md, opacity: 0.5 },
});
