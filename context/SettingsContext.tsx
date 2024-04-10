import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { defaultSettings } from '../helpers/SettingsHelpers';
import { Settings } from '../helpers/SettingsHelpers';

type SettingsToggleAction = {
  type: SettingsToggle;
};

export enum SettingsToggle {
  Swipe = 2,
  LeftHand = 3,
  Notification = 4,
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
    case SettingsToggle.Swipe:
      return { ...state, swipe: !state.swipe };
    case SettingsToggle.LeftHand:
      return { ...state, leftHand: !state.leftHand };
    case SettingsToggle.Notification:
      return { ...state, notification: !state.notification };
    case SettingsToggle.Vibrate:
      return { ...state, vibrate: !state.vibrate };
    case SettingsSet.AreaId:
      return { ...state, areaId: action.payload };
    case SettingsSet.IssueId:
      return { ...state, issueId: action.payload };
    default:
      return state;
  }
};
