export const SETTINGS_STORAGE_KEY = 'settings';

export type Settings = {
  areaId: string;
  issueId: string;
  swipe: boolean;
  leftHand: boolean;
  notification: boolean;
  vibrate: boolean;
};

export const defaultSettings: Settings = {
  areaId: '0',
  issueId: '0',
  swipe: true,
  leftHand: false,
  notification: true,
  vibrate: true,
};
