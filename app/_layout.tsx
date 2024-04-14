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
import { Library, getLibrary } from '../helpers/LibraryHelpers';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const [libraryState, setLibraryState] = useState<Library>();
  useEffect(() => {
    const prepareLibrary = async () => {
      const libraryObject = await getLibrary();
      if (!libraryObject) {
        return;
      }

      const { library, location } = libraryObject;
      setLibraryState(library);
    };
    prepareLibrary();
  }, []);

  // Grab settings from device or use defaults.
  const [settingsState, setSettingsState] = useState<Settings>();
  useEffect(() => {
    const prepareSettings = async () => {
      const settingsRaw = await getData(SETTINGS_STORAGE_KEY);
      if (settingsRaw) {
        setSettingsState(JSON.parse(settingsRaw));
      } else {
        await storeData(SETTINGS_STORAGE_KEY, JSON.stringify(defaultSettings));
        setSettingsState(defaultSettings);
      }
    };
    prepareSettings();
  }, []);

  // Only show app once everything has loaded.
  useEffect(() => {
    if ((fontsLoaded || fontError) && settingsState && libraryState) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError, settingsState, libraryState]);

  // Don't render until everything has loaded.
  if ((!fontsLoaded && !fontError) || !settingsState || !libraryState) {
    return null;
  }

  return (
    <LibraryProvider
      library={libraryState}
      areaId={'0'}
      issueId={'0'}
    >
      <SettingsProvider
        settings={settingsState}
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
