import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, useWindowDimensions, View } from 'react-native';
import { Tabs } from 'expo-router';
import { BottomTabBar, type BottomTabBarProps } from 'expo-router/tabs';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../src/theme/colors';
import { radius, spacing } from '../../src/theme/spacing';
import { useI18n } from '../../src/i18n/useI18n';
import { BannerSlot } from '../../src/ads/BannerSlot';

const TAB_ICONS: Record<string, { active: keyof typeof Ionicons.glyphMap; inactive: keyof typeof Ionicons.glyphMap }> = {
  index: { active: 'home-outline', inactive: 'home-outline' },
  'can-make': { active: 'flask-outline', inactive: 'flask-outline' },
  bar: { active: 'wine-outline', inactive: 'wine-outline' },
  favorites: { active: 'heart', inactive: 'heart-outline' },
  settings: { active: 'settings', inactive: 'settings-outline' },
};

function PremiumBottomTabBar(props: BottomTabBarProps) {
  const { width } = useWindowDimensions();
  const indicatorX = useRef(new Animated.Value(0)).current;
  const itemWidth = width / props.state.routes.length;

  useEffect(() => {
    Animated.spring(indicatorX, {
      toValue: props.state.index * itemWidth + (itemWidth - 36) / 2,
      friction: 9,
      tension: 90,
      useNativeDriver: true,
    }).start();
  }, [indicatorX, itemWidth, props.state.index]);

  return (
    <View style={styles.tabBarWrap}>
      <Animated.View pointerEvents="none" style={[styles.activeLine, { transform: [{ translateX: indicatorX }] }]}>
        <LinearGradient
          colors={[...colors.gradientGold]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
      <BottomTabBar {...props} />
    </View>
  );
}

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const { strings } = useI18n();

  return (
    <View style={styles.tabsRoot}>
      <Tabs
        tabBar={(props) => (
          <View style={styles.navigation}>
            <View style={styles.adSlot}><BannerSlot /></View>
            <View style={styles.separator} />
            <PremiumBottomTabBar {...props} />
          </View>
        )}
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: colors.gold,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarStyle: [styles.tabBar, { height: 64 + insets.bottom, paddingBottom: Math.max(insets.bottom, spacing.sm) }],
          tabBarLabelStyle: styles.tabLabel,
          tabBarItemStyle: styles.tabItem,
          tabBarIcon: ({ focused, color }) => {
            const iconSet = TAB_ICONS[route.name] ?? TAB_ICONS.index;
            return (
              <View style={styles.iconWrap}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  tabsRoot: { flex: 1, backgroundColor: colors.bg },
  tabBar: {
    backgroundColor: colors.bgElevated,
    borderTopWidth: 0,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm + 2,
    height: 64,
  },
  tabLabel: {
    fontFamily: 'PlusJakartaSans_500Medium',
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 0.3,
    marginTop: 2,
  },
  tabItem: {
    gap: 2,
  },
  tabBarWrap: { position: 'relative' },
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 28,
    borderRadius: radius.sm,
    marginBottom: -2,
  },
  activeLine: { position: 'absolute', top: 0, left: 0, zIndex: 1, height: 1, width: 36 },
  navigation: { backgroundColor: 'transparent' },
  separator: {
    marginHorizontal: spacing.screen,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.borderSubtle,
  },
  adSlot: { paddingHorizontal: spacing.screen, paddingTop: spacing.sm, paddingBottom: spacing.sm },
});
