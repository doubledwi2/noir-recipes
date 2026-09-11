import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, shadows } from '../../src/theme/colors';
import { radius, spacing } from '../../src/theme/spacing';
import { useI18n } from '../../src/i18n/useI18n';
import { BannerSlot } from '../../src/ads/BannerSlot';

const TAB_ICONS: Record<string, { active: keyof typeof Ionicons.glyphMap; inactive: keyof typeof Ionicons.glyphMap }> = {
  index: { active: 'wine', inactive: 'wine-outline' },
  'can-make': { active: 'sparkles', inactive: 'sparkles-outline' },
  bar: { active: 'cube', inactive: 'cube-outline' },
  favorites: { active: 'heart', inactive: 'heart-outline' },
  settings: { active: 'settings', inactive: 'settings-outline' },
};

export default function TabsLayout() {
  const { strings } = useI18n();

  return (
    <>
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: colors.gold,
          tabBarInactiveTintColor: colors.textMuted,
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabLabel,
          tabBarItemStyle: styles.tabItem,
          tabBarIcon: ({ focused, color }) => {
            const iconSet = TAB_ICONS[route.name] ?? TAB_ICONS.index;
            return (
              <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
                <Ionicons name={focused ? iconSet.active : iconSet.inactive} size={20} color={color} />
              </View>
            );
          },
        })}
      >
        <Tabs.Screen name="index" options={{ title: strings.tabs.home }} />
        <Tabs.Screen name="can-make" options={{ title: strings.tabs.canMake }} />
        <Tabs.Screen name="bar" options={{ title: strings.tabs.bar }} />
        <Tabs.Screen name="favorites" options={{ title: strings.tabs.favorites }} />
        <Tabs.Screen name="settings" options={{ title: strings.tabs.settings }} />
      </Tabs>

      {/* Global floating ad banner -- exact match to Lovable's AdBanner:
          fixed above the tab bar, present on every screen, not embedded
          inline in each screen's own scroll content. */}
      <View pointerEvents="box-none" style={styles.adOverlay}>
        <BannerSlot />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.bgElevated,
    borderTopColor: colors.borderSubtle,
    borderTopWidth: 0.5,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm + 2,
    height: 64,
    ...shadows.elevated,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.3,
    marginTop: 2,
  },
  tabItem: {
    gap: 2,
  },
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 28,
    borderRadius: radius.sm,
    marginBottom: -2,
  },
  iconWrapActive: {
    backgroundColor: colors.goldGlow,
  },
  adOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 64 + spacing.sm, // sits just above the 64px-tall tab bar
    paddingHorizontal: spacing.screen,
  },
});
