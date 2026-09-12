import React, { useCallback, useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts as useCormorantFonts,
  CormorantGaramond_600SemiBold,
  CormorantGaramond_700Bold,
} from '@expo-google-fonts/cormorant-garamond';
import {
  useFonts as useJakartaFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
} from '@expo-google-fonts/plus-jakarta-sans';
import { FavoritesProvider } from '../src/context/FavoritesContext';
import { MyBarProvider } from '../src/context/MyBarContext';
import { InterstitialProvider } from '../src/ads/InterstitialProvider';
import { AdsModule } from '../src/ads/adsModule';
import { LocaleProvider } from '../src/i18n/LocaleContext';
import { colors } from '../src/theme/colors';

// Keep the native splash screen up until both font families finish loading,
// so there's no flash of the wrong font (serif titles briefly in system
// font) on cold start.
SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  useEffect(() => {
    if (!AdsModule) return;
    AdsModule.default()
      .initialize()
      .catch(() => {});
  }, []);

  const [serifLoaded] = useCormorantFonts({
    CormorantGaramond_600SemiBold,
    CormorantGaramond_700Bold,
  });
  const [sansLoaded] = useJakartaFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
  });
  const fontsReady = serifLoaded && sansLoaded;

  const onLayoutRootView = useCallback(() => {
    if (fontsReady) SplashScreen.hideAsync().catch(() => {});
  }, [fontsReady]);

  if (!fontsReady) return null;

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
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
                    headerShown: false,
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
