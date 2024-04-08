export const SETTINGS_STORAGE_KEY = 'settings';

export type SettingsType = {
  swipe: boolean;
  leftHand: boolean;
  notification: boolean;
  vibrate: boolean;
};

export const defaultSettings: SettingsType = {
  swipe: true,
  leftHand: false,
  notification: true,
  vibrate: true,
};
