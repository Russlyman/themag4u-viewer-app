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
import { Settings } from '../helpers/SettingsHelpers';
import {
  SETTINGS_STORAGE_KEY,
  defaultSettings,
} from '../helpers/SettingsHelpers';
import { SettingsProvider } from '../context/SettingsContext';
import { LibraryProvider } from '../context/LibraryContext';
import { getNetworkStateAsync } from 'expo-network';
import { LIBRARY_STORAGE_KEY, Library } from '../helpers/LibraryHelpers';
import AsyncStorage from '@react-native-async-storage/async-storage';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const [library, setLibrary] = useState<Library>();
  useEffect(() => {
    const prepareLibrary = async () => {
      const net = await getNetworkStateAsync();
      if (net.isInternetReachable) {
        const request = await fetch('http://192.168.4.10/library.json');
        if (request.ok) {
          const requestText = await request.text();
          await storeData(LIBRARY_STORAGE_KEY, requestText);

          const requestJson: Library = JSON.parse(requestText);
          setLibrary(requestJson);
          return;
        }
      }

      const localLibrary = await getData(LIBRARY_STORAGE_KEY);
      if (localLibrary) {
        const localLibraryJson: Library = JSON.parse(localLibrary);
        setLibrary(localLibraryJson);
      }
    };
    prepareLibrary();
  }, []);

  // Grab settings from device or use defaults.
  const [settings, setSettings] = useState<Settings>();
  useEffect(() => {
    const prepareSettings = async () => {
      // await AsyncStorage.clear();
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
    if ((fontsLoaded || fontError) && settings && library) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError, settings, library]);

  // Don't render until everything has loaded.
  if ((!fontsLoaded && !fontError) || !settings || !library) {
    return null;
  }

  return (
    <LibraryProvider library={library}>
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
    </LibraryProvider>
  );
}
