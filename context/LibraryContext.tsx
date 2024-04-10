import React, { createContext, useContext, useReducer } from 'react';
import { Library } from '../helpers/LibraryHelpers';

type LibraryAction = {
  type: LibraryActionType;
  payload: Library;
};

export enum LibraryActionType {
  Set,
}

const LibraryContext = createContext<{
  state: Library;
  dispatch: React.Dispatch<LibraryAction>;
}>({ state: {} as Library, dispatch: {} as React.Dispatch<LibraryAction> }); // type gymnastics - fuck you.

export const LibraryProvider: React.FC<{
  children: React.ReactNode;
  library: Library;
}> = props => {
  const [state, dispatch] = useReducer(libraryReducer, props.library);

  return (
    <LibraryContext.Provider value={{ state, dispatch }}>
      {props.children}
    </LibraryContext.Provider>
  );
};

export const useLibraryContext = () => {
  return useContext(LibraryContext);
};

export const libraryReducer = (state: Library, action: LibraryAction) => {
  switch (action.type) {
    case LibraryActionType.Set:
      return action.payload;
    default:
      return state;
  }
};
