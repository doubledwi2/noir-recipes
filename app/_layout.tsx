import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FavoritesProvider } from '../src/context/FavoritesContext';
import { MyBarProvider } from '../src/context/MyBarContext';
import { InterstitialProvider } from '../src/ads/InterstitialProvider';
import { AdsModule } from '../src/ads/adsModule';
import { LocaleProvider } from '../src/i18n/LocaleContext';
import { colors } from '../src/theme/colors';

export default function RootLayout() {
  useEffect(() => {
    if (!AdsModule) return;
    AdsModule.default()
      .initialize()
      .catch(() => {});
  }, []);

  return (
    <SafeAreaProvider>
      <LocaleProvider>
        <FavoritesProvider>
          <MyBarProvider>
            <InterstitialProvider>
              <StatusBar style="light" />
              <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
                <Stack.Screen name="(tabs)" />
                <Stack.Screen
                  name="recipe/[id]"
                  options={{
                    headerShown: true,
                    headerTitle: '',
                    headerTransparent: true,
                    headerTintColor: colors.textPrimary,
                    animation: 'slide_from_bottom',
                  }}
                />
              </Stack>
            </InterstitialProvider>
          </MyBarProvider>
        </FavoritesProvider>
      </LocaleProvider>
    </SafeAreaProvider>
  );
}
