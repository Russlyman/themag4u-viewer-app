import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { defaultSettings } from '../helpers/SettingsHelpers';
import { SettingsType } from '../helpers/SettingsHelpers';

type ActionType = {
  type: Action;
};

export enum Action {
  ToggleSwipe,
  ToggleLeftHand,
  ToggleNotification,
  ToggleVibrate,
}

const SettingsContext = createContext<{
  state: SettingsType;
  dispatch: React.Dispatch<ActionType>;
}>({ state: defaultSettings, dispatch: {} as React.Dispatch<ActionType> }); // type gymnastics - fuck you.

export const SettingsProvider: React.FC<{
  children: React.ReactNode;
  settings: SettingsType;
  onStateChange: (state: SettingsType) => void;
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

export const settingsReducer = (state: SettingsType, action: ActionType) => {
  switch (action.type) {
    case Action.ToggleSwipe:
      return { ...state, swipe: !state.swipe };
    case Action.ToggleLeftHand:
      return { ...state, leftHand: !state.leftHand };
    case Action.ToggleNotification:
      return { ...state, notification: !state.notification };
    case Action.ToggleVibrate:
      return { ...state, vibrate: !state.vibrate };
    default:
      return state;
  }
};
