import {
  useFonts,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import {
  LIBRARY_SELECTION_STORAGE_KEY,
  Library,
  LibraryCurrentSelection,
  getLibrary,
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

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const [selectionState, setSelectionState] =
    useState<LibraryCurrentSelection>();
  useEffect(() => {
    const prepareCurrentSelection = async () => {
      const selectionRaw = await getData(LIBRARY_SELECTION_STORAGE_KEY);
      if (selectionRaw) {
        setSelectionState(JSON.parse(selectionRaw));
      } else {
        setSelectionState({ areaId: '0', issueId: '0' });
      }
    };
    prepareCurrentSelection();
  }, []);

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
      setSettingsState(await getSettings());
    };
    prepareSettings();
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
