import { getNetworkStateAsync } from 'expo-network';
import { getData, storeData } from './StorageHelpers';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LIBRARY_STORAGE_KEY = 'library';
export const LIBRARY_SELECTION_STORAGE_KEY = 'currentSelection';

export const LIBRARY_AUTO_ASSIGN_ID = '0';

export type Library = {
  area: { [areaId: string]: { name: string } };
  issue: {
    [issueId: string]: {
      name: string;
      pdfs: { [areaId: string]: string };
    };
  };
};

export type LibraryCurrentSelection = {
  areaId: string;
  issueId: string;
};

export enum LibrarySource {
  Online,
  Local,
}

// Downloads, stores and returns the latest library or if offline then the locally stored version will be fetched and returned.
// Will return undefined if neither are available.
export const getLibrary = async () => {
  const net = await getNetworkStateAsync();
  if (net.isInternetReachable) {
    const request = await fetch('http://192.168.4.10/library.json', {
      cache: 'no-store',
    });
    if (request.ok) {
      const requestText = await request.text();
      await storeData(LIBRARY_STORAGE_KEY, requestText);

      const requestJson: Library = JSON.parse(requestText);
      return { library: requestJson, source: LibrarySource.Online };
    }
  }

  const localLibrary = await getData(LIBRARY_STORAGE_KEY);
  if (localLibrary) {
    const localLibraryJson: Library = JSON.parse(localLibrary);
    return { library: localLibraryJson, source: LibrarySource.Local };
  }
};

// Handle library selection changes by writing them to the device.
export const selectionChangeHandler = async (
  currentSelection: LibraryCurrentSelection
) => {
  await storeData(
    LIBRARY_SELECTION_STORAGE_KEY,
    JSON.stringify(currentSelection)
  );
};

export const getCurrentSelection = async () => {
  const selectionRaw = await getData(LIBRARY_SELECTION_STORAGE_KEY);
  if (selectionRaw) {
    return JSON.parse(selectionRaw);
  } else {
    return { areaId: '0', issueId: '0' };
  }
};
