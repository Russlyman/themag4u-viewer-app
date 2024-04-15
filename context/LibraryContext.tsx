import React, { createContext, useContext, useEffect, useReducer } from 'react';
import {
  LIBRARY_AUTO_ASSIGN_ID,
  Library,
  LibraryCurrentSelection,
} from '../helpers/LibraryHelpers';

type LibraryState = {
  library: Library;
  currentSelection: LibraryCurrentSelection;
};

type LibraryAction = {
  type: LibraryActionType;
  payload: string;
};

export enum LibraryActionType {
  SetAreaId,
  SetIssueId,
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
  library: Library;
  defaultSelection: LibraryCurrentSelection;
  onSelectionChange: (currentSelection: LibraryCurrentSelection) => void;
}> = props => {
  const [state, dispatch] = useReducer(libraryReducer, {
    library: props.library,
    currentSelection: props.defaultSelection,
  });

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
    case LibraryActionType.SetAreaId:
      // Change issue to latest if issue doesn't exist on newly selected area.
      if (
        !state.library.issue[state.currentSelection.issueId].pdfs[
          action.payload
        ]
      ) {
        return {
          ...state,
          currentSelection: {
            ...state.currentSelection,
            areaId: action.payload,
            issueId: LIBRARY_AUTO_ASSIGN_ID,
          },
        };
      } else {
        return {
          ...state,
          currentSelection: {
            ...state.currentSelection,
            areaId: action.payload,
          },
        };
      }
    case LibraryActionType.SetIssueId:
      return {
        ...state,
        currentSelection: {
          ...state.currentSelection,
          issueId: action.payload,
        },
      };
    default:
      return state;
  }
};
