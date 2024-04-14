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
