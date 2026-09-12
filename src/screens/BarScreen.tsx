import React, { useMemo } from 'react';
import { Pressable, SectionList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { INGREDIENTS, INGREDIENT_TYPES, INGREDIENT_TYPE_LABELS } from '../data/ingredients';
import type { Ingredient } from '../types';
import { colors, shadows } from '../theme/colors';
import { radius, spacing, typography } from '../theme/spacing';
import { IngredientToggleRow } from '../components/IngredientToggleRow';
import { ScreenHeader } from '../components/ScreenHeader';
import { useMyBar } from '../context/MyBarContext';
import { useI18n } from '../i18n/useI18n';

function chunkPairs<T>(items: T[]): T[][] {
  const pairs: T[][] = [];
  for (let i = 0; i < items.length; i += 2) pairs.push(items.slice(i, i + 2));
  return pairs;
}

export function BarScreen() {
  const insets = useSafeAreaInsets();
  const { ownedIngredientIds, hasIngredient, toggleIngredient } = useMyBar();
  const { t, strings } = useI18n();
  const router = useRouter();

  const sections = useMemo(
    () =>
      INGREDIENT_TYPES.map((type) => ({
        title: t(INGREDIENT_TYPE_LABELS[type]),
        data: chunkPairs(INGREDIENTS.filter((ingredient) => ingredient.type === type && !ingredient.alwaysAvailable)),
      })).filter((section) => section.data.length > 0),
    [t],
  );

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <SectionList
        sections={sections}
        keyExtractor={(pair: Ingredient[]) => pair.map((i) => i.id).join('-')}
        contentContainerStyle={styles.listContent}
        stickySectionHeadersEnabled={false}
        ListHeaderComponent={
          <View>
            <ScreenHeader
              eyebrow={strings.bar.eyebrow}
              title={strings.bar.title}
              subtitle={strings.bar.tagline(ownedIngredientIds.size)}
            />
            <Pressable
              onPress={() => router.push('/can-make')}
              style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
            >
              <Text style={styles.ctaText}>{strings.bar.cta}</Text>
              <Ionicons name="arrow-forward" size={16} color={colors.gold} />
            </Pressable>
          </View>
        }
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionTitle}>{section.title}</Text>
        )}
        renderItem={({ item: pair }) => (
          <View style={styles.gridRow}>
            {pair.map((ingredient) => (
              <IngredientToggleRow
                key={ingredient.id}
                name={t(ingredient.name)}
                owned={hasIngredient(ingredient.id)}
                onToggle={() => toggleIngredient(ingredient.id)}
              />
            ))}
            {pair.length === 1 && <View style={{ flex: 1 }} />}
          </View>
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
  listContent: {
    paddingHorizontal: spacing.screen,
    paddingBottom: spacing.xxxl,
  },
  cta: {
    marginTop: spacing.lg,
    marginBottom: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.goldOverlay15,
    paddingHorizontal: spacing.screen,
    paddingVertical: spacing.md,
  },
  ctaText: { ...typography.bodyStrong, color: colors.gold },
  ctaPressed: { opacity: 0.86, transform: [{ scale: 0.99 }] },
  sectionTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  gridRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
});
