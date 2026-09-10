import React, { useMemo, useRef, useEffect } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SectionList } from 'react-native';
import { INGREDIENTS, INGREDIENT_TYPES, INGREDIENT_TYPE_LABELS } from '../data/ingredients';
import type { Ingredient } from '../types';
import { colors, shadows } from '../theme/colors';
import { radius, spacing, typography } from '../theme/spacing';
import { IngredientToggleRow } from '../components/IngredientToggleRow';
import { useMyBar } from '../context/MyBarContext';
import { useI18n } from '../i18n/useI18n';

export function BarScreen() {
  const insets = useSafeAreaInsets();
  const { ownedIngredientIds, hasIngredient, toggleIngredient } = useMyBar();
  const { t, strings } = useI18n();

  const headerFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(headerFade, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

  const sections = useMemo(
    () =>
      INGREDIENT_TYPES.map((type) => ({
        title: t(INGREDIENT_TYPE_LABELS[type]),
        data: INGREDIENTS.filter((ingredient) => ingredient.type === type),
      })).filter((section) => section.data.length > 0),
    [t],
  );

  const progressWidth = ownedIngredientIds.size / INGREDIENTS.length;

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <Animated.View style={[styles.header, { opacity: headerFade }]}>
        <Text style={styles.title}>{strings.bar.title}</Text>
        <Text style={styles.tagline}>{strings.bar.tagline(ownedIngredientIds.size, INGREDIENTS.length)}</Text>

        {/* Progress bar */}
        <View style={styles.progressWrap}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progressWidth * 100}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {Math.round(progressWidth * 100)}%
          </Text>
        </View>
      </Animated.View>

      <SectionList
        sections={sections}
        keyExtractor={(item: Ingredient) => item.id}
        contentContainerStyle={styles.listContent}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeaderWrap}>
            <View style={styles.sectionLine} />
            <Text style={styles.sectionTitle}>{section.title}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <IngredientToggleRow
            name={t(item.name)}
            owned={hasIngredient(item.id)}
            onToggle={() => toggleIngredient(item.id)}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
        SectionSeparatorComponent={() => <View style={{ height: spacing.xl }} />}
        showsVerticalScrollIndicator={false}
      />
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
  progressWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  progressTrack: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: colors.gold,
  },
  progressText: {
    color: colors.gold,
    fontSize: 12,
    fontWeight: '800',
    minWidth: 32,
    textAlign: 'right',
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  sectionHeaderWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  sectionLine: {
    width: 16,
    height: 2,
    borderRadius: 1,
    backgroundColor: colors.gold,
  },
  sectionTitle: {
    ...typography.goldLabel,
    fontSize: 12,
  },
});
