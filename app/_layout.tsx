import {
  useFonts,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import {
  LIBRARY_SELECTION_STORAGE_KEY,
  Library,
  LibraryCurrentSelection,
  getCurrentSelection,
  getLocalLibrary,
  getOnlineLibrary,
  selectionChangeHandler,
} from '../helpers/LibraryHelpers';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { SplashScreen } from 'expo-router';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import Colours from '../styles/Colours';
import { getData } from '../helpers/StorageHelpers';
import {
  Settings,
  getSettings,
  stateChangeHandler,
} from '../helpers/SettingsHelpers';
import { SettingsProvider } from '../context/SettingsContext';
import { LibraryProvider } from '../context/LibraryContext';
import { useNetInfo } from '@react-native-community/netinfo';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const { isInternetReachable } = useNetInfo();
  const [libraryState, setLibraryState] = useState<{
    library: Library;
    useCache: boolean;
  }>();

  useEffect(() => {
    const prepareLibrary = async () => {
      if (isInternetReachable === null) {
        return;
      }

      // For Online
      if (isInternetReachable) {
        // State: Online
        const onlineLibrary = await getOnlineLibrary();
        if (onlineLibrary) {
          setLibraryState({
            library: onlineLibrary,
            useCache: false,
          });
          return;
        }
      }

      // For Local
      if (libraryState) {
        // State: Online -> Offline
        setLibraryState(prev => {
          if (prev) {
            return { ...prev, useCache: true };
          }
        });
      } else {
        // State: Offline
        const localLibrary = await getLocalLibrary();
        if (!localLibrary) {
          return;
        }

        setLibraryState({
          library: localLibrary,
          useCache: true,
        });
      }
    };
    prepareLibrary();
  }, [isInternetReachable]);

  const [settingsState, setSettingsState] = useState<Settings>();
  const [selectionState, setSelectionState] =
    useState<LibraryCurrentSelection>();

  useEffect(() => {
    const prepareApp = async () => {
      setSettingsState(await getSettings());
      setSelectionState(await getCurrentSelection());
    };
    prepareApp();
  }, []);

  // Only show app once everything has loaded.
  useEffect(() => {
    if (
      (fontsLoaded || fontError) &&
      settingsState &&
      libraryState &&
      selectionState
    ) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError, settingsState, libraryState, selectionState]);

  // Don't render until everything has loaded.
  if (
    (!fontsLoaded && !fontError) ||
    !settingsState ||
    !libraryState ||
    !selectionState
  ) {
    return null;
  }

  return (
    <LibraryProvider
      library={libraryState}
      defaultSelection={selectionState}
      onSelectionChange={selectionChangeHandler}
    >
      <SettingsProvider
        settings={settingsState}
        onStateChange={stateChangeHandler}
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
