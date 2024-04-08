import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { SplashScreen } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  useFonts,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { StatusBar } from 'expo-status-bar';
import Colours from '../styles/Colours';
import { getData, storeData } from '../helpers/StorageHelpers';
import { SettingsType } from '../helpers/SettingsHelpers';
import {
  SETTINGS_STORAGE_KEY,
  defaultSettings,
} from '../helpers/SettingsHelpers';
import { SettingsProvider } from '../context/SettingsContext';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_600SemiBold,
    Inter_700Bold,
  });

  // Grab settings from device or use defaults.
  const [settings, setSettings] = useState<SettingsType>();
  useEffect(() => {
    const prepareSettings = async () => {
      const settingsRaw = await getData(SETTINGS_STORAGE_KEY);
      if (settingsRaw) {
        setSettings(JSON.parse(settingsRaw));
      } else {
        await storeData(SETTINGS_STORAGE_KEY, JSON.stringify(defaultSettings));
        setSettings(defaultSettings);
      }
    };
    prepareSettings();
  }, []);

  // Only show app once everything has loaded.
  useEffect(() => {
    if ((fontsLoaded || fontError) && settings) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError, settings]);

  // Don't render until everything has loaded.
  if ((!fontsLoaded && !fontError) || !settings) {
    return null;
  }

  return (
    <SettingsProvider
      settings={settings}
      onStateChange={async state => {
        await storeData(SETTINGS_STORAGE_KEY, JSON.stringify(state));
      }}
    >
      <SafeAreaProvider>
        <StatusBar
          style="dark"
          animated={true}
        />
        <Stack
          screenOptions={{
            header: Header,
            contentStyle: { backgroundColor: Colours.background },
          }}
        />
      </SafeAreaProvider>
    </SettingsProvider>
  );
}
