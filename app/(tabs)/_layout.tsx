import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Tabs } from 'expo-router';
import { colors, shadows } from '../../src/theme/colors';
import { radius, spacing } from '../../src/theme/spacing';
import { useI18n } from '../../src/i18n/useI18n';

const TAB_ICONS: Record<string, { active: string; inactive: string }> = {
  index: { active: '🍸', inactive: '🍸' },
  'can-make': { active: '✨', inactive: '✨' },
  bar: { active: '🧊', inactive: '🧊' },
  favorites: { active: '❤️', inactive: '🤍' },
  settings: { active: '⚙️', inactive: '⚙️' },
};

export default function TabsLayout() {
  const { strings } = useI18n();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.gold,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        tabBarItemStyle: styles.tabItem,
        tabBarIcon: ({ focused }) => {
          const iconSet = TAB_ICONS[route.name] ?? TAB_ICONS.index;
          return (
            <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
              <Text style={styles.tabIcon}>{focused ? iconSet.active : iconSet.inactive}</Text>
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
  tabIcon: {
    fontSize: 18,
  },
});
