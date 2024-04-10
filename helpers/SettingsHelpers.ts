export const SETTINGS_STORAGE_KEY = 'settings';

export type Settings = {
  areaId: string;
  issueId: string;
  enableSwipe: boolean;
  enableLeftHand: boolean;
  enableNotifications: boolean;
  enableVibrate: boolean;
};

export const defaultSettings: Settings = {
  areaId: '0',
  issueId: '0',
  enableSwipe: true,
  enableLeftHand: false,
  enableNotifications: true,
  enableVibrate: true,
};
