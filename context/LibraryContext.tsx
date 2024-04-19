import React, { createContext, useContext, useEffect, useReducer } from 'react';
import {
  LIBRARY_AUTO_ASSIGN_ID,
  Library,
  LibraryCurrentSelection,
} from '../helpers/LibraryHelpers';

type LibraryState = {
  library: Library;
  useCache: boolean;
  currentSelection: LibraryCurrentSelection;
  cache: { [issueId: string]: string[] };
};

type LibrarySetStringAction = {
  type: LibrarySetStringActionType;
  payload: string;
};

type LibrarySetLibraryAction = {
  type: LibrarySetLibraryActionType;
  payload: { library: Library; useCache: boolean };
};

type LibraryAction = LibrarySetStringAction | LibrarySetLibraryAction;

export enum LibrarySetStringActionType {
  SetAreaId = 0,
  SetIssueId = 1,
}

export enum LibrarySetLibraryActionType {
  SetLibrary = 2,
}

const LibraryContext = createContext<{
  state: LibraryState;
  dispatch: React.Dispatch<LibraryAction>;
}>({
  state: {} as LibraryState,
  dispatch: {} as React.Dispatch<LibraryAction>,
}); // type gymnastics - fuck you.

export const LibraryProvider: React.FC<{
  children: React.ReactNode;
  library: { library: Library; useCache: boolean };
  defaultSelection: LibraryCurrentSelection;
  onSelectionChange: (currentSelection: LibraryCurrentSelection) => void;
}> = props => {
  const [state, dispatch] = useReducer(libraryReducer, {
    library: props.library.library,
    useCache: props.library.useCache,
    currentSelection: props.defaultSelection,
    cache: { '0': ['0'] },
  });

  // This code feels dogshit but it works.
  useEffect(() => {
    dispatch({
      type: LibrarySetLibraryActionType.SetLibrary,
      payload: props.library,
    });
  }, [props.library]);

  useEffect(() => {
    props.onSelectionChange(state.currentSelection);
  }, [state.currentSelection]);

  return (
    <LibraryContext.Provider value={{ state, dispatch }}>
      {props.children}
    </LibraryContext.Provider>
  );
};

export const useLibraryContext = () => {
  return useContext(LibraryContext);
};

export const libraryReducer = (state: LibraryState, action: LibraryAction) => {
  switch (action.type) {
    case LibrarySetStringActionType.SetAreaId:
      // Change issue to latest if issue doesn't exist on newly selected area.
      return {
        ...state,
        currentSelection: {
          ...state.currentSelection,
          areaId: action.payload,
          ...(!state.library.issue[state.currentSelection.issueId].pdfs[
            action.payload
          ] && { issueId: LIBRARY_AUTO_ASSIGN_ID }),
        },
      };
    case LibrarySetStringActionType.SetIssueId:
      return {
        ...state,
        currentSelection: {
          ...state.currentSelection,
          issueId: action.payload,
        },
      };
    case LibrarySetLibraryActionType.SetLibrary:
      return {
        ...state,
        library: action.payload.library,
        useCache: action.payload.useCache,
      };
    default:
      return state;
  }
};
