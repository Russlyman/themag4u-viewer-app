import { getNetworkStateAsync } from 'expo-network';
import { getData, storeData } from './StorageHelpers';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LIBRARY_STORAGE_KEY = 'library';

export type Library = {
  area: { [areaId: string]: { name: string } };
  issue: {
    [issueId: string]: {
      name: string;
      pdfs: { [areaId: string]: string };
    };
  };
};

export enum LibraryLocation {
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
      return { library: requestJson, location: LibraryLocation.Online };
    }
  }

  const localLibrary = await getData(LIBRARY_STORAGE_KEY);
  if (localLibrary) {
    const localLibraryJson: Library = JSON.parse(localLibrary);
    return { library: localLibraryJson, location: LibraryLocation.Local };
  }
};
