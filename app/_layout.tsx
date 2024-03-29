import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { useColorScheme, StatusBar as StatusBars } from 'react-native';
import { ClerkProvider } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
import Toast from 'react-native-toast-message';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { EventRegister } from 'react-native-event-listeners';
import { useDarkMode } from '../hooks/useDarkMode';
import { config } from '@gluestack-ui/config';
import { Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GluestackUIProvider } from '@gluestack-ui/themed';
const ClerkKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const queryClient = new QueryClient();
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    PoppinsLight: require('../assets/fonts/Poppins-Light.ttf'),
    PoppinsBold: require('../assets/fonts/Poppins-Bold.ttf'),
    PoppinsMedium: require('../assets/fonts/Poppins-Medium.ttf'),
    PoppinsBoldItalic: require('../assets/fonts/Poppins-BoldItalic.ttf'),
    PoppinsLightItalic: require('../assets/fonts/Poppins-BoldItalic.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={ClerkKey} tokenCache={tokenCache}>
      <GluestackUIProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <PaperProvider>
            <RootLayoutNav />
            <Toast />
          </PaperProvider>
        </QueryClientProvider>
      </GluestackUIProvider>
    </ClerkProvider>
  );
}

function RootLayoutNav() {
  const { darkMode } = useDarkMode();

  return (
    <ThemeProvider value={darkMode ? DarkTheme : DefaultTheme}>
      <StatusBars
        barStyle={darkMode ? 'light-content' : 'dark-content'}
        backgroundColor={darkMode ? 'black' : 'white'}
      />
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <Stack
          initialRouteName="(tabs)"
          screenOptions={{ headerShown: false }}
        />
      </SafeAreaView>
    </ThemeProvider>
  );
}
