import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { defaultSettings } from '../helpers/SettingsHelpers';
import { Settings } from '../helpers/SettingsHelpers';

type SettingsToggleAction = {
  type: SettingsToggle;
};

export enum SettingsToggle {
  Swipe = 2,
  LeftHand = 3,
  Notifications = 4,
  Vibrate = 5,
}

type SettingsSetAction = {
  type: SettingsSet;
  payload: string;
};

export enum SettingsSet {
  AreaId = 0,
  IssueId = 1,
}

type SettingsAction = SettingsToggleAction | SettingsSetAction;

const SettingsContext = createContext<{
  state: Settings;
  dispatch: React.Dispatch<SettingsAction>;
}>({ state: defaultSettings, dispatch: {} as React.Dispatch<SettingsAction> }); // type gymnastics - fuck you.

export const SettingsProvider: React.FC<{
  children: React.ReactNode;
  settings: Settings;
  onStateChange: (state: Settings) => void;
}> = props => {
  const [state, dispatch] = useReducer(settingsReducer, props.settings);

  useEffect(() => {
    props.onStateChange(state);
  }, [state]);

  return (
    <SettingsContext.Provider value={{ state, dispatch }}>
      {props.children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => {
  return useContext(SettingsContext);
};

export const settingsReducer = (state: Settings, action: SettingsAction) => {
  switch (action.type) {
    case SettingsSet.AreaId:
      return { ...state, areaId: action.payload };
    case SettingsSet.IssueId:
      return { ...state, issueId: action.payload };
    case SettingsToggle.Swipe:
      return { ...state, swipe: !state.enableSwipe };
    case SettingsToggle.LeftHand:
      return { ...state, leftHand: !state.enableLeftHand };
    case SettingsToggle.Notifications:
      return { ...state, notification: !state.enableNotifications };
    case SettingsToggle.Vibrate:
      return { ...state, vibrate: !state.enableVibrate };
    default:
      return state;
  }
};
