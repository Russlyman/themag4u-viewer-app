import { getData, storeData } from './StorageHelpers';

export const SETTINGS_STORAGE_KEY = 'settings';

export type Settings = {
  enableSwipe: boolean;
  enableLeftHand: boolean;
  enableNotifications: boolean;
  enableVibrate: boolean;
};

export const defaultSettings: Settings = {
  enableSwipe: true,
  enableLeftHand: false,
  enableNotifications: true,
  enableVibrate: true,
};

// Get settings object stored on device or returns the default settings.
export const getSettings = async () => {
  const settingsRaw = await getData(SETTINGS_STORAGE_KEY);
  if (settingsRaw) {
    return JSON.parse(settingsRaw);
  } else {
    await storeData(SETTINGS_STORAGE_KEY, JSON.stringify(defaultSettings));
    return defaultSettings;
  }
};

// Handle setting changes by writing them to the device.
export const stateChangeHandler = async (state: Settings) => {
  await storeData(SETTINGS_STORAGE_KEY, JSON.stringify(state));
};
